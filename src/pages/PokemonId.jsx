import React, { useEffect, useState } from 'react';
import Header from '../components/pokedex/Header';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { backgroundByType, colorTextByType } from '../constants.js';

/**
 * PokemonId component displays detailed information about a specific Pokemon.
 * It includes the Pokemon's image, stats, types, abilities, and general information.
 */
const PokemonId = () => {
    // State to hold the Pokemon data
    const [pokemon, setPokemon] = useState();
    // Get the 'id' parameter from the URL using React Router's 'useParams' hook
    const { id } = useParams();

    // Fetch Pokemon data from the PokeAPI when the component mounts
    useEffect(() => {
        // Construct the URL for the specific Pokemon using its ID
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

        // Fetch data using Axios
        axios.get(URL)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    /**
     * Calculates the percentage for the stat bar based on the base stat value.
     * @param {number} stat_base - The base stat value of the Pokemon.
     * @returns {string} - The percentage string for the stat bar.
     */
    const getPercentStatBar = (stat_base) => {
        const percentBarProgress = Math.floor((stat_base * 100) / 255);
        return `${percentBarProgress}%`;
    };

    /**
     * Determines the color of the stat text based on the stat value.
     * @param {number} stat - The stat value of the Pokemon.
     * @returns {string} - The color name for the stat text.
     */
    const getColorByStat = (stat) => {
        if (stat < 50) {
            return 'green';
        } else if (stat >= 50 && stat < 80) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    // Render the Pokemon details
    return (
        <section>
            {/* Header component */}
            <Header />
            {/* Main content */}
            <section className='px-6 py-10 mt-12 group'>
                <article className='max-w-[900px] mx-auto shadow-lg flex'>
                    {/* Image section */}
                    <section className='w-1/2 flex items-center'>
                        <div className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} rounded-tl-lg rounded-bl-lg relative flex-1 h-[140px]`}>
                            <div className='absolute bottom-3 left-1/2 -translate-x-1/2' style={{ animation: 'bounceOnce 1s forwards' }}>
                                <img className='animate-bounce' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                            </div>
                        </div>
                    </section>

                    {/* Stats section */}
                    <section className='w-1/2 bg-slate-800 p-6 rounded-tr-lg rounded-br-lg'>
                        {/* General information */}
                        <section className=''>
                            <div className='mx-auto border-2 max-w-max px-6 mb-4 text-white'>
                                <h3># {pokemon?.id}</h3>
                            </div>
                            <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 capitalize font-bold text-shadow-md ${colorTextByType[pokemon?.types[0].type.name]}`}>
                                <hr />
                                <h1 className='text-2xl md:text-3xl'>{pokemon?.name}</h1>
                                <hr />
                            </div>
                            <div className='flex justify-center gap-6 text-center text-xs p-6 '>
                                <div className='grid gap-2 text-white'>
                                    <h5>Weight</h5>
                                    <span className='font-bold text-sm'>{pokemon?.weight}</span>
                                </div>
                                <div className='grid gap-2 text-white'>
                                    <h5>Height</h5>
                                    <span className='font-bold text-sm'>{pokemon?.height}</span>
                                </div>
                            </div>

                            {/* Types and abilities */}
                            <section className='flex flex-col md:flex-row md:justify-center md:gap-16'>
                                {/* Types section */}
                                <section className='flex flex-col justify-center items-center gap-4 flex-wrap my-4 text-center text-white'>
                                    <h3>Types</h3>
                                    <section className='flex justify-center gap-4 flex-wrap'>
                                        {pokemon?.types.map((type, i) => (
                                            <article key={type.type.name} className={`rounded-md text-white font-semibold capitalize max-w-max py-1 px-8 border-[1px] border-gray-300 shadow-md hover:border-gray-600 ${backgroundByType[pokemon?.types[i].type.name]}`}>{type.type.name}</article>
                                        ))}
                                    </section>
                                </section>
                                {/* Abilities section */}
                                <section className='flex flex-col justify-center items-center gap-4 flex-wrap my-4 text-center text-white'>
                                    <h3>Abilities</h3>
                                    <section className='flex justify-center gap-4 flex-wrap'>
                                        {pokemon?.abilities.map((ability) => (
                                            <article key={ability.ability.name} className={` rounded-md text-white font-semibold capitalize max-w-max py-1 px-8 hover:border-gray-600 border-[1px] border-gray-300 shadow-md ${backgroundByType[pokemon?.types[0].type.name]}`}>{ability.ability.name}</article>
                                        ))}
                                    </section>
                                </section>
                            </section>
                        </section>

                        {/* Stats section */}
                        <section className='px-2 md:px-10 text-white'>
                            <div className='grid grid-cols-[auto_1fr] items-center gap-2 font-bold mt-8 mb-2 text-lg'>
                                <h3 className='text-2xl '>Stats</h3>
                                <hr />
                            </div>
                            <section className='flex flex-col gap-4'>
                                {pokemon?.stats.map((stat) => (
                                    <article key={stat.stat.name}>
                                        <section className='flex justify-between text-xs'>
                                            <h5 className={`font-semibold capitalize text-${getColorByStat(stat.base_stat)}-500`}>{stat.stat.name}</h5>
                                            <span>{stat.base_stat}/255</span>
                                        </section>
                                        <div className={`bg-gray-100 h-4 rounded-sm`}>
                                            <div style={{ "width": getPercentStatBar(stat.base_stat), background: `linear-gradient(to right, ${getColorByStat(stat.base_stat)}, transparent)` }} className={`h-full`}></div>
                                        </div>
                                    </article>
                                ))}
                            </section>
                        </section>
                    </section>
                </article>
            </section>

            {/* Button to return */}
            <section className='w-full mb-12'>
                <Link to="/pokedex" className='flex gap-2 items-center justify-center bg-red-500 text-white text-lg rounded-md max-w-max px-6 py-2 shadow-md shadow-gray-500 mx-auto hover:bg-red-600 hover:scale-105'>
                    Go back
                </Link>
            </section>
        </section>
    );
};

export default PokemonId;

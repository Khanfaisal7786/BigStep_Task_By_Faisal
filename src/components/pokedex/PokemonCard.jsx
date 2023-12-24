import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bordersByType, backgroundGradientByType, colorTextByType } from '../../constants.js';

/**
 * PokemonCard component represents a card displaying information about a Pokemon.
 *
 * @component
 * @param {Object} props - The React props for this component.
 * @param {string} props.pokemonUrl - The URL to fetch Pokemon data.
 * @returns {JSX.Element} The rendered PokemonCard component.
 */
const PokemonCard = ({ pokemonUrl }) => {
    // State to hold Pokemon data
    const [pokemon, setPokemon] = useState();

    // Concatenated string of Pokemon types
    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ");

    // Fetch Pokemon data from the API
    useEffect(() => {
        axios.get(pokemonUrl)
            .then((res) => setPokemon(res.data))
            .catch((err) => console.log);
    }, []);

    // Render the PokemonCard component
    return (
        <Link to={`/pokedex/${pokemon?.id}/`} className={`text-center border-8 rounded-3xl shadow-lg group shadow-black/40 ${bordersByType[pokemon?.types[0].type.name]}`}>
            {/* Top Section */}
            <section className={`relative h-[160px] rounded-full`}>
                <div className='absolute -bottom-4 w-[150px] left-1/2 -translate-x-1/2 group-hover:scale-110 duration-500'>
                    <img className='w-full h-full object-cover rounded-full border-4 border-white' src={pokemon?.sprites.other["official-artwork"].front_default} alt={pokemon?.name} />
                </div>
            </section>

            {/* Bottom Section */}
            <section className='p-4'>
                <h3 className={`capitalize text-3xl mb-2 font-semibold ${colorTextByType[pokemon?.types[0].type.name]} tracking-wide`}>{pokemon?.name}</h3>
                <h4 className={`bg-gradient-to-br ${backgroundGradientByType[pokemon?.types[0].type.name]} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-8 ml-8 mb-2`}>{`ID: ${pokemon?.id}`}</h4>
                <h4 className={`bg-gradient-to-br ${backgroundGradientByType[pokemon?.types[0].type.name]} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-16 ml-16 mb-2`}>{`Type: ${types}`}</h4>
            </section>
        </Link>
    );
};

export default PokemonCard;

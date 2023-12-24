import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import { paginationLogic } from "../utils/pagination";

/**
 * Pokedex component represents the main page for displaying Pokemon information.
 * It includes search functionality, type filtering, and pagination.
 */
const Pokedex = () => {
    // State for storing Pokemon data
    const [pokemons, setPokemons] = useState([]);

    // State for handling search by Pokemon name
    const [pokemonName, setPokemonName] = useState("");

    // State for storing Pokemon types
    const [types, setTypes] = useState([]);

    // State for the selected Pokemon type
    const [currentType, setCurrentType] = useState("");
    
    // State for managing current page in pagination
    const [currentPage, setCurrentPage] = useState(1);

    // State for the number of Pokemon cards per page
    const [pokesPerPage, setPokesPerPage] = useState(12);

    // Ref for the search input field
    const input = useRef(null);

    // Redux state for retrieving the trainer's name
    const nameTrainer = useSelector((store) => store.nameTrainer);

    /**
     * Handler for the form submission to search Pokemon by name.
     * @param {Event} e - The event object.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setPokemonName(e.target.pokemonName.value);
    };

    // Filter Pokemon by name based on the search input
    const pokemonsByName = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );

    // Memoized pagination logic
    const { pokemonInPage, lastPage, pagesInBlock, PAGES_PER_BLOCK } = useMemo(() => paginationLogic(currentPage, pokemonsByName, pokesPerPage), [currentPage, pokemons, pokemonName, currentType, pokesPerPage]);

    /**
     * Handler for navigating to the previous page in pagination.
     */
    const handleClickPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        if (newCurrentPage >= 1) {
            setCurrentPage(newCurrentPage);
        }
    };

    /**
     * Handler for navigating to the next page in pagination.
     */
    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1;
        if (newCurrentPage <= lastPage) {
            setCurrentPage(newCurrentPage);
        }
    };

    // Fetch all Pokemon types from the PokeAPI on component mount
    useEffect(() => {
        if (!currentType) {
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

            axios
                .get(URL)
                .then((res) => setPokemons(res.data.results))
                .catch((err) => console.log(err));
        }
    }, [currentType]);

    // Fetch all available Pokemon types from the PokeAPI on component mount
    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type";

        axios
            .get(URL)
            .then((res) => {
                const newTypes = res.data.results.map((type) => type.name);
                setTypes(newTypes);
            })
            .catch((err) => console.log(err));
    }, []);

    // Fetch Pokemon based on the selected type
    useEffect(() => {
        if (currentType) {
            const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

            axios
                .get(URL)
                .then((res) => {
                    const pokemonsByType = res.data.pokemon.map(
                        (pokemon) => pokemon.pokemon
                    );
                    setPokemons(pokemonsByType);
                })
                .catch((err) => console.log(err));
        }
    }, [currentType]);

    // Reset page number when the search criteria change
    useEffect(() => {
        setCurrentPage(1);
    }, [pokemonName, currentType]);

    // Clear the search input and reset Pokemon name search on type change
    useEffect(() => {
        setPokemonName("");
        input.current.value = "";
    }, [currentType]);

    // JSX structure for the Pokedex component
    return (
        <section className="min-h-screen bg-black">
            <Header />

            {/* Search and Filter Section */}
            <section className="pt-6 px-2 flex flex-col justify-center items-center mt-8 md:mt-0 h-[240px] lg:h-[170px]">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center gap-2 mb-6 w-full md:mb-0 md:gap-6 h-[900px] md:h-24 md:max-w-[80%] lg:w-[1000px] lg:flex-row xl:max-w-[1400px] mx-auto"
                >
                    <div className="flex items-center w-full justify-center mb-4 md:mb-0 lg:h-10">
                        <input
                            ref={input}
                            className="shadow-md shadow-black/30 h-full md:mb-0 w-[85%] md:w-full lg:w-80 outline-0 px-4 max-w-[24rem] rounded-tl-md rounded-bl-md"
                            id="pokemonName"
                            type="text"
                            placeholder="Search your Pokemon"
                        />
                        <button className="bg-red-500 shadow-md shadow-black/30 hover:bg-red-600 h-full text-white max-w-max px-4 py-2  rounded-tr-md rounded-br-md">
                            <i className="bx bx-search text-white font-bold"></i>
                        </button>
                    </div>

                    <div className="w-full flex flex-col gap-8 items-center sm:flex-row sm:justify-center sm:items-center mb-8 md:mb-0">
                        <select
                            className="shadow-md shadow-black/30 rounded-md outline-0 w-[85%] max-w-[12rem] md:max-w-[15rem] h-10 pl-4 text-slate-700"
                            onChange={(e) => setCurrentType(e.target.value)}
                        >
                            <option value="">All types</option>
                            {types.map((type) => (
                                <option
                                    className="option capitalize py-6 text-blue-500"
                                    value={type}
                                    key={type}
                                >
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </section>

            {/* Pokemon list */}
            <section className="px-6 md:px-12 py-4 md:py-12 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_320px))] justify-center max-w-[1500px] mx-auto">
                {pokemonInPage.map((pokemon) => (
                    <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
                ))}
            </section>

            {/* Pagination */}
            <section className="h-[6rem] grid place-items-center">
                <ul className="flex gap-24 justify-center mb-4 mx-2 flex-wrap">
                    <li
                        onClick={handleClickPreviousPage}
                        className={`${
                            currentPage < 2 && "hidden"
                        } p-3 font-bold text-red-500 text-lg hover:scale-125 border rounded-full px-3 py-3 cursor-pointer mr-2`}
                    >
                        {"< Previous"}
                    </li>

                    <li
                        onClick={handleClickNextPage}
                        className={`${
                            currentPage === lastPage && "hidden"
                        } p-3 font-bold text-red-500 text-lg border rounded-full px-3 py-3 hover:scale-125 cursor-pointer`}
                    >
                        {"Next >"}
                    </li>
                </ul>
            </section>
        </section>
    );
};

export default Pokedex;

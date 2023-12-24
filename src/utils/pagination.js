/**
 * Handles pagination logic for displaying a subset of pokemons on a given page.
 *
 * @param {number} currentPage - The current page number.
 * @param {Array} pokemonsByName - Array of pokemons sorted by name.
 * @param {number} pokesPerPage - Number of pokemons to display per page.
 * @returns {Object} - Object containing paginated pokemon data.
 */
export const paginationLogic = (currentPage, pokemonsByName, pokesPerPage) => {
    // Number of pokemons per page
    const POKEMONS_PER_PAGE = +pokesPerPage;

    // Calculate the range of pokemons to display on the current page
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    // Calculate the total number of pages
    const lastPage = pokemonsByName.length
        ? Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE)
        : 1;

    // Pagination block settings
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    // Generate an array of page numbers in the current block
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
        if (i <= lastPage) {
            pagesInBlock.push(i);
        }
    }

    // Return paginated data
    return { pokemonInPage, lastPage, pagesInBlock, PAGES_PER_BLOCK, POKEMONS_PER_PAGE };
};

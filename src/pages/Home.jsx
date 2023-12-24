import React from 'react';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { setNameTrainer } from '../store/slices/nameTrainer.slice';
import { useNavigate } from 'react-router-dom';

/**
 * Home component representing the landing page of the application.
 * Allows the user to enter their name and start exploring the Pokédex.
 *
 * @component
 * @example
 * // Usage in another component or file:
 * // import Home from '../path/to/Home';
 * // ...
 * // <Home />
 */
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Handles the form submission, dispatches the entered trainer name,
     * and navigates to the Pokédex page.
     *
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setNameTrainer(e.target.nameTrainer.value));
        navigate("/pokedex");
    };

    return (
        <section className='min-h-screen grid grid-rows-[1fr_auto] bg-black text-white'>
            {/* Top section */}
            <section className='grid place-items-center'>
                <article className='flex flex-col items-center'>
                    <div className='font-bold text-3xl lg:text-5xl text-white mb-8 italic'>
                        <span className='text-red-800'>B</span>igStep <span className='text-red-800'>T</span>ask
                    </div>
                    <p className='text-md lg:text-xl mb-8 md:mb-12'>Let's Catch Them All</p>

                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col items-center gap-4 w-full h-24 md:h-12 md:flex-row md:gap-0 md:justify-center'
                    >
                        <input
                            className='w-[80%] max-w-sm h-12 shadow-md shadow-black/30 md:h-full md:w-80 outline-0 px-4 rounded-md md:rounded-tr-none md:rounded-br-none md:rounded-tl-md md:rounded-bl-md'
                            id='nameTrainer'
                            type="text"
                            placeholder='Type your name...'
                        />
                        <button
                            className='bg-red-500 shadow-md shadow-black/30 hover:bg-red-600 md:h-full text-white max-w-max px-10 py-2 rounded-md z-20 md:rounded-tl-none md:rounded-bl-none md:rounded-tr-md md:rounded-br-md'
                        >
                            Start
                        </button>
                    </form>
                </article>
            </section>

            {/* Image */}
            <div className='absolute w-32 top-6 left-8 sm:top-11 sm:left-14 sm:w-48 opacity-20 sm:opacity-50 lg:opacity-80 lg:left-32'>
                <img src="/images/ash.png" alt="Ash Ketchum" />
            </div>

            {/* Footer */}
            <Footer />
        </section>
    );
};

export default Home;

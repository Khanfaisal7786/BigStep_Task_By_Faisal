import React from 'react';
import { useDispatch } from 'react-redux';
import { setNameTrainer } from '../../store/slices/nameTrainer.slice';

/**
 * Header component for the application.
 * Displays the application name and a logout button.
 */
const Header = () => {
    const dispatch = useDispatch();

    /**
     * Handles the click event for the logout button.
     * Dispatches an action to set the trainer name to an empty string.
     */
    const handleClickLogout = () => {
        dispatch(setNameTrainer(''));
    };

    return (
        <section className='relative'>
            {/* Background for the application name */}
            <div className='h-16 bg-slate-800 grid items-end'>
                <div className='max-w-[200px] ml-2 sm:ml-6 sm:max-w-[300px]'>
                    {/* Application name with styling */}
                    <span className='text-white text-lg font-bold italic'>
                        <span className='text-red-500'>B</span>igStep <span className='text-red-500'>T</span>ask
                    </span>
                </div>
            </div>

            {/* Separator */}
            <div className='h-12 bg-white'></div>

            {/* User avatar and logout button */}
            <div className="h-20 aspect-square rounded-full bg-red-500 border-[4px] border-black absolute -bottom-4 right-0 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:rounded-full after:bg-black after:absolute after:border-[9px] after:border-white after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2">
                {/* Logout button */}
                <i
                    onClick={handleClickLogout}
                    className='bx bx-log-out-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-30 text-2xl hover:text-red-800 cursor-pointer duration-200'
                ></i>
            </div>
        </section>
    );
};

export default Header;

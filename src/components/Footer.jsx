import React from 'react';

/**
 * Footer component representing the bottom section of the application.
 * This component includes background elements and a decorative circle.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
    return (
        <footer className='relative'>
            {/* Background color for the upper part of the footer */}
            <div className='h-20 bg-slate-800'></div>

            {/* Background color for the lower part of the footer */}
            <div className='h-14 bg-white'></div>

            {/* Decorative circle with a border and positioning */}
            <div className="h-20 aspect-square rounded-full bg-red-500 border-[4px] border-black absolute bottom-3 left-1/2 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:rounded-full after:bg-black after:absolute after:border-[9px] after:border-white after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></div>
        </footer>
    );
};

export default Footer;

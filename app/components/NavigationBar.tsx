import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import logoImage from '../assets/logo/Logo.png';

const NavigationBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const menuAnimation = useSpring({
    opacity: isMenuOpen ? 1 : 0,
    maxHeight: isMenuOpen ? 400 : 0,
  });

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Attach click event listener to handle clicks outside the menu
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

 
  return (
    <nav className="bg-white fixed z-10 w-screen ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-center">

            <div className="flex flex-shrink-0 items-center mt-2">
              <img className="object-contain h-3 w-auto"src={logoImage} alt="Your Company" />
            </div>

            <div className="hidden sm:block sm:ml-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">

                {/* Container for input field */}
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                    {/* The actual input field */}
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="search"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:mt-2 sm:ml-[14.5rem] sm:block">

              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a href="index.html" className="hover:bg-gray-900 text-black rounded-md px-3 py-2 text-sm font-medium hover:text-white" aria-current="page">Home</a>
                <a href="services.html" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">services</a>
                <a href="about.html" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About us</a>
                <a href="blog.html" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">blog</a>
                <a href="contact.html" className="text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Contact us</a>
              </div>
            </div>
          </div>

          <div className="sm:hidden ml-4 mr-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">

              {/* Container for input field */}
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  {/* The actual input field */}
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="search"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="inset-y-0 left-0 flex items-center sm:hidden">

            {/* Mobile menu button*/}
            <button
          type="button"
          className="relative inline-flex mr-4 items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMenu}
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          {/* Icon when menu is closed */}
          <svg
            className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>
          {/* Icon when menu is open */}
          <svg
            className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
         <animated.div className={` bg-white/50 backdrop-blur-md mt-6 right-4 rounded-lg absolute sm:hidden`} ref={dropdownRef} style={menuAnimation}>
          <div className=" space-y-1 pl-2 pr-40 pb-3 pt-2 ">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <a href="index.html" className="text-black hover:text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</a>
            <a href="services.html" className="text-black hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">services</a>
            <a href="about.html" className="text-black hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">About us</a>
            <a href="blog.html" className="text-black hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">blog</a>
            <a href="contact.html" className="text-black hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Contact us</a>
          </div>
        </animated.div>
      </div>
    </nav>
  );
};

export default NavigationBar;





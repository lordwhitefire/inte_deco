import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

interface NavigationBarProps {
  isExclusiveOpen: boolean;
  toggleExclusiveDropdown: () => void;
  setBannerIsExclusiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isExclusiveOpen, toggleExclusiveDropdown, setBannerIsExclusiveOpen }) => {
  const dropdownRef = useRef(null);
 const userMenuRef =  useRef(null);

const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // New state for user menu

  const dropdownAnimation = useSpring({
    opacity: isExclusiveOpen ? 1 : 0,
    maxHeight: isExclusiveOpen ? 400 : 0,
  });

useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isUserMenuOpen && // Check if the user menu is open
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isUserMenuOpen, setIsUserMenuOpen]);
useEffect(() => {
  console.log('Navbar isExclusiveOpen:', isExclusiveOpen);

  const handleClickOutside = (event) => {
  if (
    isExclusiveOpen && // Check if the menu is open
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target) &&
    !event.target.classList.contains('balzac')
  ) {
    toggleExclusiveDropdown(false);
  }
};


  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [isExclusiveOpen, setBannerIsExclusiveOpen]);


  console.log('Navbar isExclusiveOpen:', isExclusiveOpen);
  const userMenu = (
<div className="relative">
      <div>
        <button
          type="button"
          className="flex rounded-full  text-sm  focus:bg-red-500 focus:text-white  p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 justify-center items-center"
          aria-expanded={isUserMenuOpen}
          aria-haspopup="true"
          onClick={() => setIsUserMenuOpen((prev) => !prev)} // Use new state updater
        >
          <span className="sr-only">Open user menu</span>
          <span className="icon-[lucide--user-round] w-5 h-5"></span>
        </button>
      </div>

      {isUserMenuOpen && (
        <div
          ref={userMenuRef}
         // Adjusted classes for a glassy feeling
className="absolute right-0 z-10 mt-4 w-[15rem] origin-top-right rounded-md bg-black/50 backdrop-blur-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"

          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-0"
          >
            <span className="icon-[lucide--user-round] w-5 h-5"></span>
            Manage my account
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-100 flex items-center gap-x-4"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-1"
          >
            <span className="icon-[ic--outline-border-color] w-5 h-5"></span>
            My order
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-2"
          >
            <span className="icon-[material-symbols--cancel-outline] w-5 h-5"></span>
            Cancellation
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-3"
          >
            <span className="icon-[material-symbols--star-outline] w-5 h-5"></span>
            My reviews
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-100 flex gap-x-4 items-center"
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-4"
          >
            <span className="icon-[tabler--logout-2] w-5 h-5"></span>
            Logout
          </a>
        </div>
      )}
    </div>
    );

return (
    <nav className="flex justify-around items-center p-4 text-neutral-900  ">
      {/* Exclusive Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <span
          className="font-bold lg:text-xl cursor-pointer"
          onClick={toggleExclusiveDropdown}
        >
          Exclusive
        </span>
        <animated.div
          style={dropdownAnimation}
          className="absolute top-[2.3rem] -left-[7.3rem] mt-2 w-[18rem] p-2 bg-white text-black border border-r-black text-center pb-6 pt-6  balzac"
        >
          {/* Dropdown content goes here */}
          <p className="py-3">Dropdown Item 1</p>
          <p className="py-3">Dropdown Item 2</p>
          <p className="py-3">Dropdown Item 3</p>
          <p className="py-3">Dropdown Item 4</p>
          <p className="py-3">Dropdown Item 5</p>
          <p className="py-3">Dropdown Item 4</p>
          <p className="py-3">Dropdown Item 5</p>
          {/* Add more dropdown items as needed */}
        </animated.div>
      </div>

      {/* Home, Contact, About, Signup */}
      <div className="flex space-x-6 text-sm">
        <p>Home</p>
        <p>Contact</p>
        <p>About</p>
        <p>Signup</p>
      </div>

      {/* Search Bar, Love Icon, Cart Icon */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
              placeholder="What are you looking for"
            value=""
            className="pl-4 pr-16 py-2 border text-xs border-gray-300 rounded focus:outline-none focus:border-blue-500 "
          />
          <span className="absolute right-3 transform icon-[mingcute--search-line] text-gray-500 lg:h-5 lg:w-5 top-1/4"></span>
        </div>
        <span className="lg:h-5 lg:w-5 cursor-pointer icon-[mdi--heart-outline] "></span>
        <span className="lg:h-5 lg:w-5 cursor-pointer icon-[ion--cart-outline] "></span>
          {userMenu}
      </div>
    </nav>
  );
};


export default NavigationBar;





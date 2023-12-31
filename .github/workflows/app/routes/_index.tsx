import React, { useState } from 'react';
import type { MetaFunction } from "@remix-run/node";
import NavigationBar from '../components/NavigationBar';
import BannerComponent from '../components/BannerComponent';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // State for Exclusive dropdown in Navbar
  const [isExclusiveOpen, setIsExclusiveOpen] = useState(false);

  // State for Exclusive dropdown in Banner
  const [bannerIsExclusiveOpen, setBannerIsExclusiveOpen] = useState(false);

  // Toggle function for Exclusive dropdown
  const toggleExclusiveDropdown = () => {
    setIsExclusiveOpen(!isExclusiveOpen);
    setBannerIsExclusiveOpen((prevBannerState) => !prevBannerState);
  };

  return (
    <div>
      <NavigationBar isExclusiveOpen={isExclusiveOpen} toggleExclusiveDropdown={toggleExclusiveDropdown} />
      <BannerComponent bannerIsExclusiveOpen={bannerIsExclusiveOpen} setBannerIsExclusiveOpen={setBannerIsExclusiveOpen} />

     {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <img
        src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
        alt="Description of the image"
        className="rounded-lg shadow-lg mt-4"
      />*/}
    </div>
  );
}
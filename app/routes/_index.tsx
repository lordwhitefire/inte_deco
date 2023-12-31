import type { MetaFunction } from "@remix-run/node";
import React, { useState } from 'react';


import BannerComponent from '../components/BannerComponent';
import NavigationBar from '../components/NavigationBar';


export const meta: MetaFunction = () => {
  return [
    { name: "description", content: "Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style." },
    { property: "og:title", content: "Interior Decorators Inc. - Transforming Spaces" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "url-to-interior-decoration-image" },
    { property: "og:url", content: "url-to-website" },
    { property: "og:description", content: "Elevate your spaces with our expert interior decoration services. Discover innovative designs tailored to your style." },
    { property: "og:site_name", content: "Interior Decorators Inc." },
  ];
};

export default function Index() {
  // State for Exclusive dropdown in Navbar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for Exclusive dropdown in Banner
 

  // Toggle function for Exclusive dropdown
  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
   
  };

  return (
    <div>
      <NavigationBar isMenuOpen={isMenuOpen} toggleMenuDropdown={toggleMenuDropdown} />
      <BannerComponent />

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
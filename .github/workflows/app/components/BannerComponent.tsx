import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface BannerProps {
  bannerIsExclusiveOpen: boolean;
  setBannerIsExclusiveOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BannerComponent: React.FC<BannerProps> = ({ bannerIsExclusiveOpen, setBannerIsExclusiveOpen }) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    console.log("Banner isExclusiveOpen:", bannerIsExclusiveOpen);
    // Update your animation or take any action based on bannerIsExclusiveOpen
  }, [bannerIsExclusiveOpen]);

  const bannerWidthAnimation = useSpring({
    width: bannerIsExclusiveOpen ? '60rem' : '100vw',
    config: { tension: 0, friction: 0 },
  });
  const bannermtAnimation = useSpring({
    marginTop: bannerIsExclusiveOpen ? '2rem' : '0', // Adjusted from '8' to '8rem'
    config: { tension: 0, friction: 0 },
  });
  
  const bannermlAnimation = useSpring({
    marginLeft: bannerIsExclusiveOpen ? '0' : '0', // Adjusted from '8' to '8rem'
    config: { tension: 0, friction: 0 },
  });
  const circlePositionAnimation = useSpring({
    top: bannerIsExclusiveOpen ? '20.5rem' : '19rem', // Adjust values as needed
    config: { tension: 0, friction: 0 },
  });

  const banner1Animation = useSpring({ opacity: bannerIndex === 0 ? 1 : 0, from: { opacity: 0 } });
  const banner2Animation = useSpring({ opacity: bannerIndex === 1 ? 1 : 0, from: { opacity: 0 } });
  const banner3Animation = useSpring({ opacity: bannerIndex === 2 ? 1 : 0, from: { opacity: 0 } });
  const banner4Animation = useSpring({ opacity: bannerIndex === 3 ? 1 : 0, from: { opacity: 0 } });
  const banner5Animation = useSpring({ opacity: bannerIndex === 4 ? 1 : 0, from: { opacity: 0 } });

  const banner1 = (
    <animated.div
    style={{ ...bannerWidthAnimation, ...banner1Animation, ...bannermtAnimation, ...bannermlAnimation }}
      className="flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4"
    >
      {/* Rest of your component remains unchanged */}
      <div className="">
        {/* Logo and Business Name */}
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
            alt="Epiphany Logo"
            className="h-10 w-10 rounded-full  mr-2"
          />
          <h2 className="text-md md:text-md lg:text-md text-white/50 font-bold">Epiphany Health series</h2>
        </div>
        {/* Business Description */}
        <p className="text-lg md:text-xl lg:text-3xl mb-8 font-medium">
          Embrace a thegrher <br />
          <span className="pt-16">lifestyle with Epiphany1. </span>
        </p>
        <button className="text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4">
          <span className="flex flex-col">
            <span>Shop Now </span>
            <p className="bg-white w-32 h-0.5"></p>
          </span>
          <span className="icon-[lucide--arrow-right] h-5 w-5 "> </span>
        </button>
      </div>
      <img
        src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
        alt="Banner"
        className="w-[30rem] h-auto "
      />
    </animated.div>
  );
  const banner2 = (
    <animated.div
    style={{ ...bannerWidthAnimation, ...banner2Animation, ...bannermtAnimation, ...bannermlAnimation }}
    className="flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4"
  >
      {/* Rest of your component remains unchanged */}
      <div className="">
        {/* Logo and Business Name */}
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
            alt="Epiphany Logo"
            className="h-10 w-10 rounded-full  mr-2"
          />
          <h2 className="text-md md:text-md lg:text-md text-white/50 font-bold">Epiphany Health series</h2>
        </div>
        {/* Business Description */}
        <p className="text-lg md:text-xl lg:text-3xl mb-8 font-medium">
          Embrace a healthier <br />
          <span className="pt-16">lifestyle with Epiphany2. </span>
        </p>
        <button className="text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4">
          <span className="flex flex-col">
            <span>Shop Now </span>
            <p className="bg-white w-32 h-0.5"></p>
          </span>
          <span className="icon-[lucide--arrow-right] h-5 w-5 "> </span>
        </button>
      </div>
      <img
        src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
        alt="Banner"
        className="w-[30rem] h-auto "
      />
    </animated.div>
  );
  const banner3 = (
    <animated.div
    style={{ ...bannerWidthAnimation, ...banner3Animation, ...bannermtAnimation, ...bannermlAnimation }}
    className="flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4"
  >
      {/* Rest of your component remains unchanged */}
      <div className="">
        {/* Logo and Business Name */}
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
            alt="Epiphany Logo"
            className="h-10 w-10 rounded-full  mr-2"
          />
          <h2 className="text-md md:text-md lg:text-md text-white/50 font-bold">Epiphany Health series</h2>
        </div>
        {/* Business Description */}
        <p className="text-lg md:text-xl lg:text-3xl mb-8 font-medium">
          Embrace a healthier <br />
          <span className="pt-16">lifestyle with Epiphany3. </span>
        </p>
        <button className="text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4">
          <span className="flex flex-col">
            <span>Shop Now </span>
            <p className="bg-white w-32 h-0.5"></p>
          </span>
          <span className="icon-[lucide--arrow-right] h-5 w-5 "> </span>
        </button>
      </div>
      <img
        src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
        alt="Banner"
        className="w-[30rem] h-auto "
      />
    </animated.div>
  );
  const banner4 = (
    <animated.div
    style={{ ...bannerWidthAnimation, ...banner4Animation, ...bannermtAnimation, ...bannermlAnimation }}
    className="flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4"
  >
      {/* Rest of your component remains unchanged */}
      <div className="">
        {/* Logo and Business Name */}
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
            alt="Epiphany Logo"
            className="h-10 w-10 rounded-full  mr-2"
          />
          <h2 className="text-md md:text-md lg:text-md text-white/50 font-bold">Epiphany Health series</h2>
        </div>
        {/* Business Description */}
        <p className="text-lg md:text-xl lg:text-3xl mb-8 font-medium">
          Embrace a healthier <br />
          <span className="pt-16">lifestyle with Epiphany4. </span>
        </p>
        <button className="text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4">
          <span className="flex flex-col">
            <span>Shop Now </span>
            <p className="bg-white w-32 h-0.5"></p>
          </span>
          <span className="icon-[lucide--arrow-right] h-5 w-5 "> </span>
        </button>
      </div>
      <img
        src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
        alt="Banner"
        className="w-[30rem] h-auto "
      />
    </animated.div>
  );
  const banner5 = (
    <animated.div
    style={{ ...bannerWidthAnimation, ...banner5Animation, ...bannermtAnimation, ...bannermlAnimation }}
    className="flex items-center justify-around overflow-hidden  absolute py-12 w-screen  right-0 bg-black text-white px-4"
  >
      {/* Rest of your component remains unchanged */}
      <div className="">
        {/* Logo and Business Name */}
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
            alt="Epiphany Logo"
            className="h-10 w-10 rounded-full  mr-2"
          />
          <h2 className="text-md md:text-md lg:text-md text-white/50 font-bold">Epiphany Health series</h2>
        </div>
        {/* Business Description */}
        <p className="text-lg md:text-xl lg:text-3xl mb-8 font-medium">
          Embrace a healthier <br />
          <span className="pt-16">lifestyle with Epiphany5. </span>
        </p>
        <button className="text-white px-8 py-3 text-lg rounded-full flex items-center gap-x-4">
          <span className="flex flex-col">
            <span>Shop Now </span>
            <p className="bg-white w-32 h-0.5"></p>
          </span>
          <span className="icon-[lucide--arrow-right] h-5 w-5 "> </span>
        </button>
      </div>
      <img
        src="https://drive.google.com/uc?export=view&id=1C3oSuF-HK9IlyTlo4gLYGym1LuejiFRS"
        alt="Banner"
        className="w-[30rem] h-auto "
      />
    </animated.div>
  );
  


  // Repeat the structure for banner2, banner3, banner4, and banner5

  const banners = [banner1, banner2, banner3, banner4, banner5];
const circle = (
  <animated.div
    style={{ ...bannerWidthAnimation, ...circlePositionAnimation }}
    className="flex justify-center  absolute w-screen right-0 px-4 gap-x-4"
  >
    {banners.map((banner, index) => (
      <span
        key={index}
        className={`icon-[bxs--circle] ${index === bannerIndex ? 'text-red-500' : 'text-white/50'} h-3 w-3`}
      ></span>
    ))}
  </animated.div>
);

  return <div className="relative  border  border-t-black">
  {banners}
  {circle}
  </div>;
};

export default BannerComponent;

  
  
  
  


  


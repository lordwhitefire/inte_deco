import React, { useState, useEffect } from 'react';
import '../styles/input.css'; // Adjust the path based on your actual directory structure


const YourComponent = () => {
  const backgrounds = ['background', 'background1', 'background2', 'background3', 'background4'];
  const [currentBackground, setCurrentBackground] = useState('background');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = backgrounds.indexOf(currentBackground);
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      setCurrentBackground(backgrounds[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBackground]);

  const project =  (
      <div className="-mt-10 sm:mt-16 grid grid-cols-1 mx-auto max-w-[50rem] md:grid-cols-3 gap-8 p-8 text-center">
        {/* Division One */}
        <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 sm:mx-0 lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-105">
          <h2 className="text-xl sm:text-xl font-bold mb-4">Project Plan</h2>
          <p className="text-xs sm:text-xs mb-4 w-4/5">There are many variations of the lorem ipsum from available majority</p>
          <a href="servicesingle.html">
            <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-bold py-2 px-4 rounded-lg">
              Read More
              <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
            </button>
          </a>
        </div>
  
        {/* Division Two */}
        <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 sm:mx-0 lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-105">
          <h2 className="text-xl sm:text-xl font-bold mb-4">Interior work</h2>
          <p className="w-4/5 sm:text-xs text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
          <button className="flex gap-x-2 hover:bg-gray-700 text-sm text-black hover:text-white font-bold py-2 px-4 rounded-lg">
            Read More
            <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4  "></span>
          </button>
        </div>
  
        {/* Division Three */}
        <div className="flex flex-col items-center bg-white sm:px-6 sm:py-20 py-6 mx-12 sm:mx-0 lg:mx-0 rounded-lg shadow-lg  justify-center transform transition-transform hover:scale-105">
          <h2 className="text-xl sm:text-xl font-bold mb-4">Realization</h2>
          <p className="w-4/5 text-xs sm:text-xs mb-4">There are many variations of the lorem ipsum from available majority</p>
          <button className="flex gap-x-2 hover:bg-gray-700 text-sm hover:text-white text-black font-bold py-2 px-4 rounded-lg">
            Read More
            <span className="mt-[0.3rem] sm:mt-[0.3rem] icon-[solar--arrow-right-linear] w-4 h-4 "></span>
          </button>
        </div>
      </div>
    );
  
  return (
    <div>
    <div className={`flex mb-4 justify-center w-full text-amber-400 ${currentBackground}`}>
      <div className={`flex justify-center flex-col pt-8 h-[28rem] sm:h-[30rem] w-11/12 rounded-bl-[10rem] mb-16 overflow-hidden`}>
        <div className={`bg-white bg-opacity-60 p-4 sm:p-8 ml-4 sm:ml-8 lg:ml-40 lg:mt-28 text-black shadow-sm w-11/12 sm:w-7/12 lg:w-6/12  rounded-tl-[2rem] rounded-br-[3rem] sm:rounded-tl-[4rem] sm:rounded-br-[5rem]`}>
          <h1 className="text-3xl sm:text-5xl Font1 w-10/12 sm:w-4/5 lg:w-3/5">
            Let your Home be unique 
          </h1>
          <p className="sm:mt-3 text-md w-4/5 sm:text-xl sm:w-[18rem]">
            There are many variations of lorem ipsum available.
          </p>
          <button className="mt-2 w-[8rem] sm:w-[8rem] text-[0.8rem] sm:text-sm flex gap-x-2 bg-gray-800 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 sm:pl-4 pl-4 rounded-md sm:rounded-md">
            Get Started
            <span className="mt-[0.1rem] sm:mt-[0.1rem] icon-[solar--arrow-right-linear] w-4 h-4 text-white"></span>
          </button>
        </div>
      </div>
    </div>
    {project}
    </div>
  );
};

export default YourComponent;

import React from 'react';
import Image from 'next/image';
import PropertySearchForm from './PropertySearchForm';
import heroImage from '@/assets/images/hero.jpg';

const Hero = () => {
  return (
    <section className="py-24 mb-6 shadow-lg relative">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Hero"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="w-full h-full opacity-20"
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 sm:text-6xl md:text-7xl leading-tight">
            Find Your Dream Rental
          </h1>
          <p className="mt-6 mb-8 text-lg text-gray-700 sm:text-xl md:text-2xl">
            Explore properties that perfectly match your lifestyle and needs.
          </p>
          <PropertySearchForm className="border-2 border-blue-500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

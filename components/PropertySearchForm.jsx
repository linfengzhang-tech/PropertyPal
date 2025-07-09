'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

const PropertySearchForm = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() === '') {
        router.push('/properties');
    } else {
        router.push(`/properties/search-results?location=${location}&propertyType=${propertyType}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 mx-auto max-w-3xl w-full flex flex-col md:flex-row items-center bg-gradient-to-r from-orange-300 to-orange-500 p-6 rounded-xl shadow-xl"
    >
      <div className="w-full md:w-3/5 md:pr-4 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Keywords or Location"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-4">
        <label htmlFor="property-type" className="sr-only">Property Type</label>
        <select
          id="property-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-8 py-3 rounded-lg bg-white text-blue-700 font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;

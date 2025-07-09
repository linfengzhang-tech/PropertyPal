import React from 'react';
import { FaBed, FaBath, FaRulerCombined, FaCheck, FaMapMarker, FaTimes } from "react-icons/fa";
import PropertyMap from './PropertyMap';

const PropertyDetails = ({ property }) => {
  return (
    <>
    <main>
        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{ property.type } </div>
        <h1 className="text-3xl font-bold mb-4">{ property.title }</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
            <FaMapMarker className="text-lg text-orange-700 mr-2" />
            <p className="text-orange-700">
            { property.location.street }, { property.location.city }, { property.location.state }, { property.location.zipcode }
            </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
            Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
            {['nightly', 'weekly', 'monthly'].map((rateType, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-center mb-4 ${index < 2 ? 'border-b border-gray-200 md:border-b-0 pb-4 md:pb-0' : 'pb-4 md:pb-0'}`}
                >
                    <div className="text-gray-500 mr-2 font-bold">{rateType.charAt(0).toUpperCase() + rateType.slice(1)}</div>
                    <div className="text-2xl font-bold text-blue-500">
                        {property.rates[rateType] ? (
                            new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(property.rates[rateType])
                        ) : (
                            <FaTimes className="text-red-700" />
                        )}
                    </div>
                </div>
            ))}
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-bold mb-6">Description & Details</h3>
            <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                <p>
                    <FaBed className="inline-block mr-2" /> {property.bedrooms}&nbsp;<span className="hidden sm:inline">Beds</span>
                </p>
                <p>
                    <FaBath className="inline-block mr-2" /> {property.bathrooms}&nbsp;<span className="hidden sm:inline">Baths</span>
                </p>
                <p>
                    <FaRulerCombined className="inline-block mr-2" /> {property.square_feet}&nbsp;<span className="hidden sm:inline">sqft</span>
                </p>
            </div>
            <p className="text-gray-500 mb-4">
                {property.description}
            </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-bold mb-6">Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                {property.amenities.map((amenity, index) => (
                    <li key={index}>
                        <FaCheck className="text-green-600 mr-2 inline-block" /> {amenity}
                    </li>
                ))}
            </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <PropertyMap property={property} />
        </div>
    </main>
    </>
  )
}

export default PropertyDetails
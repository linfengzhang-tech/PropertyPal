import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { fetchProperties } from '@/utils/request';

const HomeProperties = async ({ heading, sort }) => {
  const properties = await fetchProperties();
  const sortedProperties = properties.sort((a, b) => {
    if (sort === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sort === 'featured') {
      return b.is_featured - a.is_featured;
    } else if (sort === 'random' || !sort) {
      return Math.random() - 0.5;
    }
  });

  return (
    <>
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          {heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedProperties.slice(0, 3).map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
        </div>
      </div>
    </section>
    <section className="m-auto max-w-lg px-6 text-center">
        <Link
        href="/properties"
        className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Properties</Link>
    </section>
    </>
  );
};

export default HomeProperties;

export const dynamic = 'force-dynamic';

import React from 'react';
import { fetchProperties } from '@/utils/request';
import FeaturedPropertyCard from '@/components/FeaturedPropertiesCard';

const FeaturedProperties = async ({ heading, sort, limit }) => {
  const properties = await fetchProperties();
  const sortedProperties = properties.filter(property => property.is_featured === true);

  return (
    sortedProperties.length > 0 && (
      <section className='bg-blue-50 px-4 pt-6 pb-10'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
            {heading}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {sortedProperties.slice(0, limit).map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;

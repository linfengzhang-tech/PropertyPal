import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard =  ({ property }) => {
    const { rates } = property;
    const getRateDisplay = () => {
       if (rates.weekly) {
        return `${rates.weekly.toLocaleString()}/wk`;
       } else if (rates.monthly) {
        return `${rates.monthly.toLocaleString()}/mo`;
       } else if (rates.nightly) {
        return `${rates.nightly.toLocaleString()}/night`;
       }
    }

    return (
        <div className="rounded-xl shadow-md relative" key={property._id}>
        <Image
          src={property.images[0]}
          alt=""
          className='w-full h-[300px] rounded-t-xl  object-cover'
          width={500}
          height={500}
        />
        <div className="p-4">
          <div className="text-left md:text-center lg:text-left mb-6">
            <div className="text-gray-600">{property.type}</div>
            <h3 className="text-xl font-bold">{property.name}</h3>
          </div>
          <h3
            className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
          >
            {getRateDisplay()}
          </h3>

          <div className="flex justify-center gap-4 text-gray-500 mb-4">
            <p>
              <FaBed className='mr-2 inline'/> {property.bedrooms}{' '}
              <span className="md:hidden lg:inline">Beds</span>
            </p>
            <p>
              <FaBath className='mr-2 inline'/> {property.bathrooms}{' '}
              <span className="md:hidden lg:inline">Baths</span>
            </p>
            <p>
                <FaRulerCombined className='mr-2 inline'/> {property.square_feet}{' '}
                <span className="md:hidden lg:inline">sqft</span>
            </p>
          </div>

          <div
            className="flex justify-center gap-4 text-green-900 text-sm mb-4"
          >
            { rates.nightly && ( <p>
                <FaMoneyBill className='mr-2 inline'/>
                Nightly
                </p>
            )}
            { rates.weekly && ( <p>
                <FaMoneyBill className='mr-2 inline'/>
                Weekly
                </p>
            )}
            { rates.monthly && ( <p>
                <FaMoneyBill className='mr-2 inline'/>
                Monthly
                </p>
            )}
          </div>

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <FaMapMarkerAlt className="text-lg text-orange-700 mt-1" />
                <span className="text-orange-700 capitalize">
                  {property.location.street},
                  <br />
                  <span className="capitalize">{property.location.city}</span>, <span className="uppercase">{property.location.state}</span> {property.location.zipcode}
                </span>
            </div>
            <Link
              href={`/properties/${property._id}`}
              className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    );
};

export default PropertyCard;
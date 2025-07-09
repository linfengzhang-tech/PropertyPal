'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async (userId) => {
            if (!userId) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`/api/properties/user/${userId}`);
                const data = await response.json();
                setProperties(data.properties); 
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };
        if (session?.user?.id) {
            fetchProperties(session.user.id);
        }
    }, [session]);
    
    const handleDelete = async (propertyId) => {
        const confirm = window.confirm('Are you sure you want to delete this property?');
        if (!confirm) {
            return;
        }
        try {
            const response = await fetch(`/api/properties/${propertyId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProperties(properties.filter((property) => property._id !== propertyId));
                toast.success('Property deleted successfully');
            } else {
                toast.error('Failed to delete property');   
            }
        }
        catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        }
    }

    if (loading) {
        return <Spinner />
    }

    const profileImage = session?.user?.image || profileDefault;

    return (
        <section className="bg-blue-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={profileImage}
                                    alt="User"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <h2 className="text-2xl mb-4">
                                <span className="font-bold block">Name:</span> {user?.name || 'N/A'}
                            </h2>
                            <h2 className="text-2xl">
                                <span className="font-bold block">Email:</span> {user?.email || 'N/A'}
                            </h2>
                        </div>
                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            {properties.length > 0 ? (
                                properties.map((property) => (
                                    <div key={property._id} className="mb-10">
                                        <Link href={`/properties/${property._id}`}>
                                            <Image
                                                className="h-32 w-full rounded-md object-cover"
                                                src={property.images[0]}
                                                alt={property.name}
                                                width={1000}
                                                height={150}
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <p className="text-lg font-semibold">{property.name}</p>
                                            <p className="text-gray-600">Address: {property.location.street}, {property.location.city}, {property.location.state}, {property.location.zipcode}</p>
                                        </div>
                                        <div className="mt-2">
                                            <a href={`/properties/${property._id}/edit`}
                                               className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600">
                                                Edit
                                            </a>
                                            <button
                                                className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                type="button"
                                                onClick={() => handleDelete(property._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No properties found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage;
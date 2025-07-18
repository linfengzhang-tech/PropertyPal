'use client';
import { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/request";
import { useParams } from "next/navigation";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import Propertyimages from "@/components/Propertyimages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;

            try {
                const propertyData = await fetchProperty(id);
                setProperty(propertyData);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };

        if (property) {
            setLoading(false);
        } else {
            fetchPropertyData();
        }
    }, [id, property]);

    if (loading) {
        return <Spinner loading={loading} />;
    }

    return (
        <div>
            {property ? (
                <>
                    <PropertyHeaderImage image={property.images[0]} />
                    <section>
                        <div className="container m-auto py-6 px-6">
                            <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
                                <FaArrowLeft className="mr-2" /> Back to Properties
                            </Link>
                        </div>
                    </section>
                    <section className="bg-blue-50">
                    <div className="container m-auto py-10 px-6">
                      <div className="grid grid-cols-1 md:grid-cols-(--grid-cols-70-30) w-full gap-6">
                        <PropertyDetails property={property} />
                        <aside className="space-y-4">       
                            <BookmarkButton property={property} />
                            <ShareButtons property={property} />
                            <PropertyContactForm property={property} />
                        </aside>
                      </div>
                      <Propertyimages images={property.images} />
                    </div>
                  </section>
                </>
            ) : (
                <div>Property not found</div>
            )}
        </div>
    );
};

export default PropertyPage;

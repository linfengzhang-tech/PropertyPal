'use client';

import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, {Marker} from 'react-map-gl/mapbox';
import { setDefaults, fromAddress} from 'react-geocode';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 20,
        width: '100%',
        height: '300px',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        country: 'US',
    });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fromAddress(
                    `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`
                );

                if (!response.results || response.results.length === 0) {
                    setError('No results found');
                    setLoading(false);
                    throw new Error('No results found');
                    return;
                }

                const { lat, lng } = response.results[0].geometry.location;

                setLat(lat);
                setLng(lng);

                setViewport({
                    ...viewport,
                    latitude: lat,
                    longitude: lng,
                    zoom: 15,
                });

                setLoading(false);

            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchLocation();
    }, [property]);

    if (loading) return <Spinner />;

    if (error) return <div className="text-red-500">No location found</div>;

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={
                {
                    latitude: lat,
                    longitude: lng,
                    zoom: 15,
                }
            }

            style={{
                width: '100%',
                height: '300px',
            }}

            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={lng} latitude={lat} anchor="bottom" />
        </Map>
    );
};

export default PropertyMap;

'use client'

import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });

    const handleSuccess = (position: any) => {
        const { latitude, longitude } = position.coords;
        setLocation({
            latitude,
            longitude,
            error: null
        });
    };

    const handleError = (error: any) => {
        setLocation({
            latitude: null,
            longitude: null,
            error: error.message
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            setLocation((prevState: any) => ({ ...prevState, error: 'Geolocation is not supported by this browser.' }));
        }
    }, []);

    return (
        <div>
            <h1>User Location</h1>
            {location.error ? (
                <p>Error: {location.error}</p>
            ) : (
                <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
            )}
        </div>
    );
};

export default LocationComponent;

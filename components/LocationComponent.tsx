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
        let message: any;
        console.log(error.code)
        switch (error.code) {
            case 1: // PERMISSION_DENIED
                message = "User denied the request for Geolocation.";
                break;
            case 2: // POSITION_UNAVAILABLE
                message = "Location information is currently unavailable.";
                break;
            case 3: // TIMEOUT
                message = "The request to get user location timed out.";
                break;
            default:
                message = "An unknown error occurred.";
                break;
        }
        setLocation((prevState: any) => ({
            ...prevState,
            error: message
        }));
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

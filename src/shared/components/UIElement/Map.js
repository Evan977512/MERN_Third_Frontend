import React, { useRef, useEffect } from 'react';
// useRef hook == create reference
// useEffect hook == allows us to register logic,  a function that shuld be executed when certain inputs change

import './Map.css';

const Map = (props) => {
    const mapRef = useRef();

    const { center, zoom } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
        });

        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);
    /**
     * google map js SDK
     */

    return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;

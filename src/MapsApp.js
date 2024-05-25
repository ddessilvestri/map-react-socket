import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1IjoiZHNpbHZlc3RyaSIsImEiOiJjbHdsYXdoeDcxZDNvMmxtcGN0bmp0c3djIn0.BinfqsoxMX9DPrLMWNeY-g';

const initialReferences ={
    lng:-122.4725,
    lat:37.8010,
    zoom:13.5
}

export const MapsApp = () => {

    const mapDiv = useRef();
    // const [map, setMap] = useState();
    const map = useRef();
    const [coords, setCoords] = useState(initialReferences);
    useEffect(() => {

        const mapInstance = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[initialReferences.lng, initialReferences.lat],
            zoom:initialReferences.zoom
        });
        map.current = mapInstance;

    }, []);

    useEffect(() => {
      map.current?.on('move',()=>{
            const {lng,lat} = map.current.getCenter();
            setCoords({
                lng:lng.toFixed(4),
                lat:lat.toFixed(4),
                zoom: map.current.getZoom().toFixed(4)
            });
      });

    }, [map])
    
    
  return (
    <>

        <div className='info'>
            Lng: {coords.lng} | lat: {coords.lat} | zoom : {coords.zoom}
        </div>


        <div 
            ref={mapDiv}
            className='mapContainer'
        />
            
        
    </>
  )
}

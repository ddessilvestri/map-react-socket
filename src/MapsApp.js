import React from 'react'
import { useMapbox } from './hooks/useMapbox';


const initialReferences ={
    lng:-122.4725,
    lat:37.8010,
    zoom:13.5
}

export const MapsApp = () => {

   const { setRef, coords } = useMapbox(initialReferences);
    
  return (
    <>

        <div className='info'>
            Lng: {coords.lng} | lat: {coords.lat} | zoom : {coords.zoom}
        </div>


        <div 
            ref={setRef}
            className='mapContainer'
        />
            
        
    </>
  )
}

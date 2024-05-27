import React, { useContext, useEffect } from 'react'
// import { useMapbox } from './hooks/useMapbox';
import {useMapbox} from '../hooks/useMapbox';
import { SocketContext } from '../context/SocketContext';

const initialReferences ={
    lng:-122.4725,
    lat:37.8010,
    zoom:13.5,

    minZoom: 10, // Minimum zoom level
    maxZoom: 15, // Maximum zoom level
    minLng: 0.1, 
    maxLng: 0.1,
    minLat: 0.1,
    maxLat: 0.1  
    
}

export const MapsPage = () => {

  const { setRef, coords, newMarker$,moveMarker$,addMarker,updateLocation } = useMapbox(initialReferences);
  const { socket } = useContext(SocketContext);  

  // listen the current markers
useEffect(() => {
  socket.on('active-markers',(markers)=>{
    for(const key of Object.keys(markers)){
      addMarker(markers[key],key);
    }
  })
}, [socket,addMarker])


    useEffect(() => {
      newMarker$.subscribe(marker => {
        socket.emit('new-marker',marker);
      });
    }, [newMarker$,socket])
    
    useEffect(() => {
        moveMarker$.subscribe(marker =>{
          socket.emit('updated-marker',marker);
        })
    }, [moveMarker$,socket])
    
    // Move marker using sockets

    useEffect(() => {
       socket.on('updated-marker',(marker)=>{
        updateLocation(marker);
       }) 
    }, [socket])
    

    // listen new markers
    useEffect(() => {
      socket.on('new-marker',(marker)=>{
        addMarker(marker,marker.id);
      })
    }, [socket,addMarker])
    

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

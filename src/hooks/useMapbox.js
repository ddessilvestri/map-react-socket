import {useRef,useState,useEffect, useCallback} from 'react';
import mapboxgl from "mapbox-gl";
import { v4 } from 'uuid';


mapboxgl.accessToken = 'pk.eyJ1IjoiZHNpbHZlc3RyaSIsImEiOiJjbHdsYXdoeDcxZDNvMmxtcGN0bmp0c3djIn0.BinfqsoxMX9DPrLMWNeY-g';
export const useMapbox = (initialReferences) => {
    
    const mapDiv = useRef();
    //Reference to the map DIV
    const setRef = useCallback((node)=> {
        mapDiv.current = node;
    },[]);
    
    // reference to markers
    const markers = useRef({});

    const map = useRef();
    const [coords, setCoords] = useState(initialReferences);
    
    // function to add markers
    const addMaker = useCallback((ev)=> {
      const { lng,lat } = ev.lngLat;
      const marker = new mapboxgl.Marker();
      marker.id = v4(); 
      marker
          .setLngLat([lng,lat])
          .addTo(map.current)
          .setDraggable(true);

      markers.current[ marker.id ] = marker;
    },[]);

    useEffect(() => {

        const mapInstance = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[initialReferences.lng, initialReferences.lat],
            zoom:initialReferences.zoom,

            minZoom: initialReferences.minZoom, // Minimum zoom level
            maxZoom: initialReferences.maxZoom, // Maximum zoom level
            maxBounds: [
              [initialReferences.lng - initialReferences.minLng, initialReferences.lat - initialReferences.minLat], // Southwest coordinates
              [initialReferences.lng + initialReferences.maxLng, initialReferences.lat + initialReferences.maxLat]  // Northeast coordinates
            ]
        });
        map.current = mapInstance;

    }, [initialReferences]);

    
    // when map is moving
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
    
    // Add tags to the map
    useEffect(() => {
      map.current?.on('click',addMaker);
    }, [addMaker]);
    

    return {
        coords,
        markers,

        // methods
        addMaker,
        setRef
    }
}

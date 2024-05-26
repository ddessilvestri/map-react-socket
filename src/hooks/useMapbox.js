import {useRef,useState,useEffect, useCallback} from 'react';
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken = 'pk.eyJ1IjoiZHNpbHZlc3RyaSIsImEiOiJjbHdsYXdoeDcxZDNvMmxtcGN0bmp0c3djIn0.BinfqsoxMX9DPrLMWNeY-g';
export const useMapbox = (initialReferences) => {
    
    const mapDiv = useRef();
    //Reference to the map DIV
    const setRef = useCallback((node)=> {
        mapDiv.current = node;
    },[]);
    
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

    }, [initialReferences]);

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
    
    return {
        coords,
        setRef
    }
}

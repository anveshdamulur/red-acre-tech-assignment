import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface MapboxMapProps {}

const StyledMapboxMap = styled.div`
  .map-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW52ZXNoZGFtdWx1ciIsImEiOiJja3dndW9oYmQwc2M3MnBwbTk3aHk2ODhvIn0.cST7lXwv2m_th18JJnMq4g';

const MapboxMap = (props: MapboxMapProps) => {
  const mapContainer = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // if (map.current) return; // initialize map only once

    const map = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledMapboxMap>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </StyledMapboxMap>
  );
};

export default MapboxMap;

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
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // if (map.current) return; // initialize map only once

    const map = new mapboxgl.Map({
      container: mapContainerRef.current || '',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      map.addSource('popeye-village-balluta', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: '/assets/geojson/popeye-village-balluta.geojson',
      });

      map.addLayer({
        id: 'popeye-village-balluta-layer',
        type: 'circle',
        source: 'popeye-village-balluta',
        paint: {
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
        },
      });
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledMapboxMap>
      <div>
        <div ref={mapContainerRef} className="map-container" />
      </div>
    </StyledMapboxMap>
  );
};

export default MapboxMap;

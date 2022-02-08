import * as turf from '@turf/turf';
import mapboxgl, { Map } from 'mapbox-gl';
import { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import carImage from '../../assets/img/car.png';
import personImage from '../../assets/img/person-walk.png';

export interface CoordinatePoint {
  latitude: number;
  longitude: number;
}
/* eslint-disable-next-line */
export interface MapboxMapProps {
  datasets: string[];
  currentPosition: CoordinatePoint | null;
}

const StyledMapboxMap = styled.div`
  .map-container {
    margin-left: 300px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .mapboxgl-ctrl {
      &-attrib-inner {
        .mapbox-improve-map {
          display: none;
        }
      }
    }
  }
`;

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW52ZXNoZGFtdWx1ciIsImEiOiJja3dndW9oYmQwc2M3MnBwbTk3aHk2ODhvIn0.cST7lXwv2m_th18JJnMq4g';

const MapboxMap = ({ datasets, currentPosition }: MapboxMapProps) => {
  const mapContainerRef = useRef(null);
  const map = useRef<Map | null>(null);
  // const [map, setMap] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainerRef?.current || '',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [14.4, 35.9], // malta [lng, lat]
      zoom: 12,
    });

    const currentMap = map?.current;

    // add navigation control (the +/- zoom buttons)
    currentMap?.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    currentMap?.on('load', () => {
      // Load an image from an external URL.
      [
        { image: carImage, name: 'car' },
        { image: personImage, name: 'person' },
      ].forEach(({ image, name }) => {
        currentMap?.loadImage(image, (err, img) => {
          if (err) throw err;

          // Add the image to the map style.
          currentMap?.addImage(name, img!);
        });
      });
    });

    return () => {
      map?.current?.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const currentMap = map?.current;

    currentMap?.on('load', () => {
      currentMap?.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      currentMap?.addSource('popeye-village-balluta', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: '/assets/geojson/popeye-village-balluta.geojson',
      });

      currentMap?.addLayer({
        id: 'my-points',
        type: 'line',
        source: 'popeye-village-balluta',
        paint: {
          'line-color': 'blue',
          'line-width': 2,
        },
      });

      currentMap?.addLayer({
        id: 'popeye-village-balluta-layer',
        type: 'circle',
        source: 'popeye-village-balluta',
        paint: {
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
        },
      });

      currentMap?.addSource('lunch', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: '/assets/geojson/lunch.geojson',
      });

      currentMap?.addLayer({
        id: 'lunch-points-layer',
        type: 'line',
        source: 'lunch',
        paint: {
          'line-color': 'black',
          'line-width': 2,
          'line-dasharray': [3, 3],
        },
      });

      currentMap?.addLayer({
        id: 'lunch-circle-layer',
        type: 'circle',
        source: 'lunch',
        paint: {
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-color': 'green',
          'circle-stroke-color': 'white',
        },
      });

      // Add a layer to use the image to represent the data.
      currentMap?.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point', // reference the data source
        layout: {
          'icon-image': 'car', // reference the image
          'icon-size': 0.15,
        },
      });
    });
  }, [datasets]);

  useEffect(() => {
    if (!currentPosition) return;

    const pointFeature = turf.point([
      currentPosition.latitude,
      currentPosition.longitude,
    ]);
    const featColl = turf.featureCollection([pointFeature]);
    console.log('feat: ', featColl);
    const source: mapboxgl.GeoJSONSource = map?.current?.getSource(
      'point'
    ) as mapboxgl.GeoJSONSource;
    source.setData(featColl);
  }, [currentPosition]);

  return (
    <StyledMapboxMap>
      <div ref={mapContainerRef} className="map-container" />
    </StyledMapboxMap>
  );
};

export default MapboxMap;

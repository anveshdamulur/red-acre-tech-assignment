import { render } from '@testing-library/react';

import MapboxMap from './mapbox-map';

describe('MapboxMap', () => {
  const currentPosition = {
    latitude: 20.0,
    longitude: 20.0,
  };
  it('should render successfully', () => {
    const { baseElement } = render(
      <MapboxMap
        selectedRoute={'House -> Office'}
        currentPosition={currentPosition}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

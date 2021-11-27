import { render } from '@testing-library/react';

import MapboxMap from './mapbox-map';

describe('MapboxMap', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapboxMap />);
    expect(baseElement).toBeTruthy();
  });
});

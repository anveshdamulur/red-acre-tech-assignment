import { render } from '@testing-library/react';

import RouteItem from './route-item';

describe('RouteItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RouteItem text="test" />);
    expect(baseElement).toBeTruthy();
  });
});

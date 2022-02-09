import { render } from '@testing-library/react';

import RouteItem from './route-item';

describe('RouteItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RouteItem
        text={'test'}
        isSelected={false}
        handleClick={(e) => console.log('click')}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

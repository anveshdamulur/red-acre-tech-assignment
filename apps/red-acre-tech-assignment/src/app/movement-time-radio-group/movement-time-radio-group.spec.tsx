import { render } from '@testing-library/react';

import MovementTimeRadioGroup from './movement-time-radio-group';

describe('MovementTimeRadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MovementTimeRadioGroup />);
    expect(baseElement).toBeTruthy();
  });
});

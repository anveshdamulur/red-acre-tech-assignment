import { render } from '@testing-library/react';

import MovementTimeRadioGroup from './movement-time-radio-group';

describe('MovementTimeRadioGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MovementTimeRadioGroup
        timeInSeconds={[1, 5, 10]}
        value={5}
        handleChange={(e, b) => {
          console.log(b);
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

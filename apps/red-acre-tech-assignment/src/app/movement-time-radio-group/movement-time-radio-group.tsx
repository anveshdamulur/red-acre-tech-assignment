import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface MovementTimeRadioGroupProps {
  timeInSeconds: number[];
  value: number;
  handleChange: (e: SyntheticEvent<Element, Event>, check: boolean) => void;
}

const StyledMovementTimeRadioGroup = styled.div`
  color: #fff;
`;

export function MovementTimeRadioGroup({
  timeInSeconds,
  value,
  handleChange,
}: MovementTimeRadioGroupProps) {
  return (
    <StyledMovementTimeRadioGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">Time (in seconds)</FormLabel>
        <RadioGroup
          row
          aria-label="Time (in seconds)"
          value={value}
          name="radio-buttons-group"
        >
          {timeInSeconds.map((ts) => (
            <FormControlLabel
              key={`movement-${ts}`}
              value={ts}
              control={<Radio />}
              onChange={handleChange}
              label={ts}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </StyledMovementTimeRadioGroup>
  );
}

export default MovementTimeRadioGroup;

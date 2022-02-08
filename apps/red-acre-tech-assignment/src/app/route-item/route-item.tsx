import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface RouteItemProps {
  text: string;
  isSelected: boolean;
  handleClick: (e: SyntheticEvent<Element, Event>) => void;
}

const StyledRouteItem = styled.div<{ isSelected: boolean }>`
  color: #fff;

  .list-item {
    background-color: ${(props) => (props.isSelected ? 'black' : '')};
  }
`;

export function RouteItem({ text, isSelected, handleClick }: RouteItemProps) {
  return (
    <StyledRouteItem isSelected={isSelected}>
      <ListItem className="list-item" disablePadding onClick={handleClick}>
        <ListItemButton>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </StyledRouteItem>
  );
}

export default RouteItem;

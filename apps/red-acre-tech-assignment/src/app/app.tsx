import { List } from '@mui/material';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import MapboxMap, { CoordinatePoint } from './mapbox-map/mapbox-map';
import MovementTimeRadioGroup from './movement-time-radio-group/movement-time-radio-group';
import RouteItem from './route-item/route-item';

const StyledApp = styled.div`
  .side-nav {
    height: 100%;
    width: 300px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #ed1c25;
    overflow-x: hidden;

    &__content {
      padding: 20px;
    }
  }
`;

const App = () => {
  const timeInSecondsArray = [1, 5, 10];
  const routes = [
    'House -> Office',
    'Office -> Lunch',
    'Lunch -> Office',
    'Office -> House',
  ];

  const [timeInSeconds, setTimeInSeconds] = useState(5);
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [currentPositionOnMap, setCurrentPositionOnMap] =
    useState<CoordinatePoint | null>(null);

  useEffect(() => {
    const wss = new WebSocket('ws://localhost:8080/');

    const subscribe = {
      event: 'pos:subscribe',
      data: {
        channel: selectedRoute,
      },
    };

    let intervalId: NodeJS.Timeout | null = null;

    wss.onmessage = (data) => {
      console.log('message received: ', data.data);
      if (data.data === '') return;

      const [latitude, longitude] = JSON.parse(data.data);
      setCurrentPositionOnMap({ latitude, longitude });
    };

    wss.onopen = () => {
      console.log('ws opened');

      try {
        intervalId = setInterval(
          (function x() {
            wss.send(JSON.stringify(subscribe));
            return x;
          })(),
          timeInSeconds * 1000
        );
      } catch (e) {
        console.error(e);
      }
    };

    wss.onclose = () => console.log('ws closed');
    return () => {
      wss.close();
      clearInterval(Number(intervalId));
    };
  }, [timeInSeconds, selectedRoute]);

  const handleRouteSelectionClick = (e: SyntheticEvent<Element, Event>) => {
    const element = e.target as HTMLElement;
    console.log(element.innerText);
    setSelectedRoute(element.innerText);
  };

  const handleMovementTimeRadioGroupOnChange = (
    e: SyntheticEvent<Element, Event>,
    check: boolean
  ) => {
    const element = e.target as HTMLInputElement;
    setTimeInSeconds(+element.value);
  };

  return (
    <StyledApp>
      <div className="side-nav">
        <div className="side-nav__content">
          <MovementTimeRadioGroup
            timeInSeconds={timeInSecondsArray}
            value={timeInSeconds}
            handleChange={handleMovementTimeRadioGroupOnChange}
          ></MovementTimeRadioGroup>
          <List>
            {routes.map((route) => (
              <RouteItem
                key={`route-item-${route.replace(/\s/g, '')}`}
                text={route}
                isSelected={route === selectedRoute}
                handleClick={handleRouteSelectionClick}
              ></RouteItem>
            ))}
          </List>
        </div>
      </div>
      <MapboxMap
        selectedRoute={selectedRoute}
        currentPosition={currentPositionOnMap}
      ></MapboxMap>
    </StyledApp>
  );
};

export default App;

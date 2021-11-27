import styled from 'styled-components';

import MapboxMap from './mapbox-map/mapbox-map';

const StyledApp = styled.div`
  .map-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const App = () => {
  return (
    <StyledApp>
      <MapboxMap></MapboxMap>
    </StyledApp>
  );
};

export default App;

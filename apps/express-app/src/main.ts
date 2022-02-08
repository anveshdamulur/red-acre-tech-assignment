/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as ws from 'ws';
import * as fs from 'fs';

interface Data {
  event: string;
  data: {
    channel: string;
  };
}

const villageGeoJsonData = JSON.parse(
  fs.readFileSync(
    __dirname + '/assets/data/popeye-village-balluta.geojson',
    'utf-8'
  )
);
const lunchGeoJsonData = JSON.parse(
  fs.readFileSync(__dirname + '/assets/data/lunch.geojson', 'utf-8')
);
const villageCoordinates = villageGeoJsonData.features[0].geometry.coordinates;
const lunchCoordinates = lunchGeoJsonData.features[0].geometry.coordinates;

// Creating a new websocket server
const wss = new ws.Server({ port: 8080 });

// Creating connection using websocket
wss.on('connection', (ws) => {
  console.log('new client connected');
  let i = 0;
  // sending message
  ws.on('message', (data) => {
    console.log(`Client has sent us: ${data}`);
    const receivedData = JSON.parse(data.toString());
    try {
      switch (receivedData.data.channel) {
        case 'House -> Office':
          if (i === villageCoordinates.length - 1) return '';
          ws.send(JSON.stringify(villageCoordinates[i]));
          i++;
          break;
        case 'Office -> Lunch':
          if (i === lunchCoordinates.length - 1) return '';
          ws.send(JSON.stringify(lunchCoordinates[i]));
          i++;
          break;
        case 'Lunch -> Office':
          if (i === lunchCoordinates.length - 1) return '';
          ws.send(
            JSON.stringify(lunchCoordinates[lunchCoordinates.length - 1 - i])
          );
          i++;
          break;
        case 'Office -> House':
          if (i === villageCoordinates.length - 1) return '';
          ws.send(
            JSON.stringify(
              villageCoordinates[villageCoordinates.length - 1 - i]
            )
          );
          i++;
          break;
        default:
          throw new Error(`Invalid channel: ${receivedData.data.channel}`);
      }
    } catch (e) {
      console.error(
        `Something went wrong while sending a message: ${e.message}`
      );
    }
  });
  // handling what to do when clients disconnects from server
  ws.on('close', () => {
    console.log('the client has disconnected');
  });
  // handling client connection error
  ws.onerror = function () {
    console.log('Some Error occurred');
  };
});
console.log('The WebSocket server is running on port 8080');

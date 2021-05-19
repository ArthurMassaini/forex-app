import socketIoClient from 'socket.io-client';

const socket = socketIoClient('http://localhost:3001');

export default socket;

// // Connect to TraderMade Data Server
// const socket = io.connect('http://tradermade.com', { reconnect: true });

// socket.on('connect', () => {
//   console.log('Connected!');
//   socket.emit('login', { userKey: 'WSTrial2891' });
// });

// socket.on('handshake', (msg) => {
//   console.log(msg);
//   console.log('Handshake Recived now send symbol requests');
//   socket.emit('symbolSub', { symbol: 'GBPUSD' });
// });

// socket.on('subResponse', (msg) => {
//   console.log(msg);
// });

// socket.on('price', (message) => {
//   console.log(`Price Data:${message}`);
// // });

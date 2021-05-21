import socketIoClient from 'socket.io-client';

const socket = socketIoClient('http://localhost:3001');

export default socket;

const express = require('express');
const cors = require('cors');

const loginRoute = require('./routes/loginRoute');
const usersRoute = require('./routes/usersRoute');
const tradesRoute = require('./routes/tradesRoute');
const socketCon = require('./socket/socketFake');
// const socketCon = require('./socket/socketCon');

const errorMiddleware = require('./middlewares/error');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // Accepted URL by cors
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Accepted methods
  },
});

app.use(cors());
app.use(express.json());

io.on('connection', socketCon.socketConnection);

app.use(loginRoute);
app.use(usersRoute);
app.use(tradesRoute);
app.use(errorMiddleware);

const PORT = 3001;

http.listen(PORT, () => {
  console.log(`Express and SocketIO runnig on port ${PORT}`);
});

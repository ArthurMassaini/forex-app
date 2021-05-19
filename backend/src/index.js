const express = require('express');
const cors = require('cors');

const loginRoute = require('./routes/loginRoute');
const usersRoute = require('./routes/usersRoute');
const socketController = require('./controllers/socketController');
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

io.on('connection', socketController.socketConnection);

app.use(loginRoute);
app.use(usersRoute);

// code for testing
// const usersModel = require('./models/usersModel');
// app.get('/users', async (req,res)=>{
//     const allUsers = await usersModel.getAllUsers();
//     res.status(200).json(allUsers)
// })
// const usersModel = require('./models/usersModel');
// app.get('/users', async (req,res)=>{
//     const{email} = req.body;
//     const allUsers = await usersModel.getUserByEmail(email);
//     res.status(200).json(allUsers)
// })

app.use(errorMiddleware);

const PORT = 3001;

http.listen(PORT, () => {
  console.log(`Express and SocketIO runnig on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');

const loginRoute = require('./routes/loginRoute');
const usersRoute = require('./routes/usersRoute');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(cors());
app.use(express.json());

app.use(loginRoute);
app.use(usersRoute);

// code for testing
// const usersModel = require('./src/models/usersModel');
// app.get('/', async (req,res)=>{
//     const allUsers = await usersModel.getAllUsers();
//     res.status(200).json(allUsers)
// })

app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API runnig on port ${PORT}`);
});

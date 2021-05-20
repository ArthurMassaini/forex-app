const cron = require('node-cron');
const fetch = require('node-fetch');

const doTheFetch = () => {
  return fetch(
    'https://api.twelvedata.com/time_series?symbol=GBP/USD&interval=1min&outputsize=1&apikey=8a6f8212cc974c7d91a70aec45d7cc22',
  ).then((data) => data.json());
};

const socketConnection = async (socket) => {
  console.log(`User connnected! ${socket.id}`);
  const initialValue = await doTheFetch();

  socket.emit('apiValues', initialValue);

  cron.schedule('* * * * *', async () => {
    const nextValue = await doTheFetch();

    socket.emit('apiValues', nextValue);
  });

  socket.on('disconnect', () => {
    console.log('User disconnnected!');
  });
};

module.exports = { socketConnection };

const allValues = [
  {
    meta: {
      symbol: 'EUR/USD',
      interval: '1min',
      currency_base: 'Euro',
      currency_quote: 'US Dollar',
      type: 'Physical Currency',
    },
    values: [
      {
        datetime: '2021-05-19 10:03:00',
        open: '1.22130',
        high: '1.22135',
        low: '1.22130',
        close: '1.22135',
      },
    ],
    status: 'ok',
  },
  {
    meta: {
      symbol: 'EUR/USD',
      interval: '1min',
      currency_base: 'Euro',
      currency_quote: 'US Dollar',
      type: 'Physical Currency',
    },
    values: [
      {
        datetime: '2021-05-19 10:03:00',
        open: '1.66666',
        high: '1.66666',
        low: '1.66661',
        close: '1.66666',
      },
    ],
    status: 'ok',
  },
  {
    meta: {
      symbol: 'EUR/USD',
      interval: '1min',
      currency_base: 'Euro',
      currency_quote: 'US Dollar',
      type: 'Physical Currency',
    },
    values: [
      {
        datetime: '2021-05-19 10:03:00',
        open: '0.99999',
        high: '0.99999',
        low: '0.99991',
        close: '0.99999',
      },
    ],
    status: 'ok',
  },
];

const socketConnection = (socket) => {
  console.log(`Usuário conectado! ${socket.id}`);
  let i = 1;

  socket.emit('apiValues', allValues[0]);

  setInterval(() => {
    socket.emit('apiValues', allValues[i]);

    if (i === 0) {
      i++;
    } else if (i === 1){
      i++;
    } else {
      i = 0;
    }
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
};

// const cron = require('node-cron');
// const fetch = require('node-fetch');

// const doTheFetch = () => {
//   return fetch(
//     'https://api.twelvedata.com/time_series?symbol=GBP/USD&interval=1min&outputsize=1&apikey=8a6f8212cc974c7d91a70aec45d7cc22',
//   ).then((data) => data.json());
// };

// const socketConnection = async (socket) => {
//   console.log(`Usuário conectado! ${socket.id}`);
//   const initialValue = await doTheFetch();

//   socket.emit('apiValues', initialValue);

//   cron.schedule('* * * * *', async () => {
//     const nextValue = await doTheFetch();

//     socket.emit('apiValues', nextValue);
//   });

//   socket.on('disconnect', () => {
//     //   socket.close();
//   });
// };

module.exports = { socketConnection };

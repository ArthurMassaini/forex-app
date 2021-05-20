const randomNumber = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(5);
};

const returnFakeData = () => {
  return {
    meta: {
      symbol: 'GBP/USD',
      interval: '1min',
      currency_base: 'British Pound',
      currency_quote: 'US Dollar',
      type: 'Physical Currency',
    },
    values: [
      {
        datetime: '2021-05-19 10:03:00',
        open: '1.41260',
        high: randomNumber(1.40010, 1.40015), // 1.41000 1.42000
        low: randomNumber(1.40000, 1.40005), // 1.38000  1.39000
        close: '1.41255',
      },
    ],
    status: 'ok',
  };
};

const socketConnection = (socket) => {
  console.log(`Usuário conectado! ${socket.id}`);

  const fakeValue = returnFakeData();

  socket.emit('apiValues', fakeValue);

  setInterval(() => {
    const fakeValue = returnFakeData();
    socket.emit('apiValues', fakeValue);
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
};

module.exports = { socketConnection };

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
        datetime: new Date().toLocaleString(),
        open: '1.41260',
        high: randomNumber(1.40010, 1.40015), 
        low: randomNumber(1.40000, 1.40005), 
        close: '1.41255',
      },
    ],
    status: 'ok',
  };
};

const socketConnection = (socket) => {
  console.log(`User connnected! ${socket.id}`);

  const fakeValue = returnFakeData();

  socket.emit('apiValues', fakeValue);

  setInterval(() => {
    const fakeValue = returnFakeData();
    socket.emit('apiValues', fakeValue);
  }, 2000);

  socket.on('disconnect', () => {
    console.log('User disconnnected!');
  });
};

module.exports = { socketConnection };

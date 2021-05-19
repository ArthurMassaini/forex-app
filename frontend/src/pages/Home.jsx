import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import socketClient from '../services/socketClient';
import NavBar from '../components/NavBar';
import Fluctuations from '../components/Fluctuations';
import * as STORAGE from '../services/localStorage';
import * as ACTIONS from '../redux/actions';

function Home() {
  const dispatch = useDispatch();
  const fluctuation = useSelector((state) => state.fluctuation.data);

  useEffect(() => {
    // fetch(
    //   'https://api.twelvedata.com/time_series?symbol=GBP/USD&interval=1min&outputsize=1&apikey=8a6f8212cc974c7d91a70aec45d7cc22',
    // )
    //   .then((data) => data.json())
    //   .then((resp) => console.log(resp));
    // socketClient.on('apiValues', (data) => {
    //   console.log(data);
    //   setResponse(data.values);
    // });
    // socket.close();
    dispatch(ACTIONS.retrieveData());
  }, []);

  if (STORAGE.getUser() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="main-home">
      <NavBar item="DashBoard" />
      <h1>GBP/USD</h1>
      <p>(fluctuation updates every 1 minute)</p>
      <section className="section">
        {fluctuation
          && fluctuation.map((values) => (
            <Fluctuations key={values.datetime} values={values} />
          ))}
      </section>
    </main>
  );
}

export default Home;

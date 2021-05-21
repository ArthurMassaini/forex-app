import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from '../components/NavBar';
import Fluctuations from '../components/Fluctuations';
import * as STORAGE from '../services/localStorage';
import * as ACTIONS from '../redux/actions';
import * as API from '../services/api';

function Home() {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    dispatch(ACTIONS.retrieveData());
  }, []);

  useEffect(() => {
    API.getuser().then((response) => setTotalAmount(response.user.totalAmount));
  }, []);

  if (STORAGE.getUser() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="main-home">
      <NavBar item="DashBoard" />

      {totalAmount && <h3 className="no-margin">{totalAmount.toFixed(2)}</h3>}
      <p>Available to trade</p>

      <h2 className="no-margin">GBP/USD</h2>
      <p>(fluctuation updates every 1 minute)</p>

      <section className="section">
        <Fluctuations />
      </section>
    </main>
  );
}

export default Home;

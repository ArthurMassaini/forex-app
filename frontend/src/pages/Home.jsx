import React from 'react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar';
import * as STORAGE from '../services/localStorage';

function Home() {
  if (STORAGE.getUser() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <main>
      <NavBar item="DashBoard" />
    </main>
  );
}

export default Home;

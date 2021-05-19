import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import socketClient from '../services/socketClient';
import NavBar from '../components/NavBar';
import Fluctuations from '../components/Fluctuations';
import * as STORAGE from '../services/localStorage';
import * as ACTIONS from '../redux/actions';

function Home() {
  // const [response, setResponse] = useState([]);
  const dispatch = useDispatch();
  const fluctuation = useSelector((state) => state.fluctuation.data);

  useEffect(() => {
    // fetch(
    //   'https://api.twelvedata.com/time_series?symbol=EUR/USD&interval=1min&apikey=demo&source=docs',
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
    <main>
      <NavBar item="DashBoard" />
      {fluctuation
        && fluctuation.map((values) => (
          <Fluctuations key={values.datetime} values={values} />
        ))}
    </main>
  );
}

export default Home;

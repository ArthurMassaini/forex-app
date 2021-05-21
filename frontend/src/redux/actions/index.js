import * as TYPES from '../types';
import socketClient from '../../services/socketClient';

export const getData = (data) => ({
  type: TYPES.GET_CURRENCY_PAIR,
  data,
});

export const retrieveData = () => async (dispatch) => {
  //   dispatch({ type: LOADING });
  socketClient.on('apiValues', (data) => {
    dispatch(getData(data));
  });
  //   dispatch({ type: OK });
};

export const flag = () => ({
  type: TYPES.FLAG,
});

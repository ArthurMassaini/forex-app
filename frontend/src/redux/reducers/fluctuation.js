import * as TYPES from '../types';

const INITIAL_STATE = {
  data: [],
};

const fluctuation = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_CURRENCY_PAIR:
      return { ...state, data: action.data.values };
    default:
      return state;
  }
};

export default fluctuation;

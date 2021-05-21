import * as TYPES from '../types';

const INITIAL_STATE = {
  payload: true,
};

const fluctuation = (state = INITIAL_STATE, action) => {
  let bool;
  switch (action.type) {
    case TYPES.FLAG:
      bool = !state.payload;
      return { ...state, payload: bool };
    default:
      return state;
  }
};

export default fluctuation;

import { SET_ALERT, REMOVE_ALERT } from '../types';

const alert_reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== action.payload);
    default:
      return state;
  }
};


export default alert_reducer;

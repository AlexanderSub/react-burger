import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../action-types/wsActionTypes';

const initialState = {
  wsConnected: false,
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
                error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
                error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
                error: undefined,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      const {success, orders, total, totalToday} = action.payload
      return {
        ...state,
        success,
        orders,
        total,
        totalToday,
                error: undefined,    
      };
    default:
      return state;
  }
}; 

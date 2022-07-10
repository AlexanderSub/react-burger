import { TwsActions } from '../actions/wsActions';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants'
import { TOrder } from '../types/data';

type TwsState = {
  wsConnected: boolean,
    success: boolean,
    orders: TOrder[],
    total: number,
    totalToday: number,
    error: string | undefined
};

const wsInitialState: TwsState = {
  wsConnected: false,
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined
};

export const wsReducer = (state = wsInitialState, action: TwsActions): TwsState => {
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

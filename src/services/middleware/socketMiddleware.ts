import { getCookie } from '../../utils/utils';
import { Middleware, MiddlewareAPI } from 'redux'
import { TwsIActions } from '../actions/wsActions';

export const socketMiddleware = (wsUrl: string, wsActions: TwsIActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (action.user && type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`)
      } else if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`)
      }
  
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event })
          console.log('Соединение установлено')
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
          console.log('Ошибка соединения')
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
          console.log('Соединение прервано')
        }
      }

      next(action);
    };
  };
};
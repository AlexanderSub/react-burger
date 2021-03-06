import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (action.user && type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken')}`)
      } else if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`)
      }
  
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event })
          console.log('Соединение установлено')
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
          console.log('Ошибка соединения')
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
          console.log('Соединение прервано')
        };

        if (type === wsSendMessage) {
          const message = getCookie('accessToken') ? { ...payload, token: getCookie('accessToken')} : { ...payload }
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
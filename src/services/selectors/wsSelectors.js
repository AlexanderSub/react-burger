export const getMessages = store => store.ws.messages || []
export const getWsConnected = store => store.ws.wsConnected
const URL = 'https://norma.nomoreparties.space/api'

export const getIngredientsRequest = async () => {
  return await fetch(`${URL}/ingredients`)
}

export const getOrderRequest = ingredients => {
  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients})
  });
}

export const checkResponse = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}
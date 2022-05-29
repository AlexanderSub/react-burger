import { URL, URL_INGREDIENTS, URL_ORDERS } from './constants'

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export const getIngredientsRequest = async () => {
  return await fetch(`${URL}${URL_INGREDIENTS}`)
}

export const getOrderRequest = ingredients => {
  return fetch(`${URL}${URL_ORDERS}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ingredients}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
  });
}

export const checkResponse = res => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

//Регистрация в системе
export const registerUser = async (form) => {
  return await fetch(`${URL}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}

//Вход в систему
export const loginUser = async (form) => {
  return await fetch(`${URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}

//Выход из системы
export const logoutUser = async () => {
  return await fetch(`${URL}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      'token': `${localStorage.getItem('refreshToken')}`
    })
  })
}

//Запрос сброса пароля
export const forgotPassword = async (form) => {
  return await fetch(`${URL}/password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}

//Сброс пароля
export const resetPassword = async (form) => {
  return await fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
}

// Получение данных о пользователе
export const getUser = async () => {
  return await fetch(`${URL}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}

//Обновление токена
export const refreshToken = async () => {
  return await fetch(`${URL}/auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      'token': `${localStorage.getItem('refreshToken')}`
    })
  })
}

// Обновление данных о пользователе
export const updateUser = async (name, email) => {
  return await fetch(`${URL}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({name, email})
  })
}

//Приведение даты и времени к формату
export const formatDate = (createdDate) => {
  const createdAt = new Date(createdDate);
  const today = new Date();
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const dayDiff = today.getDate() - createdAt.getDate();
  const day = dayDiff === 0 ? 'Сегодня' 
    : dayDiff === 1 ? 'Вчера' 
    : `${dayDiff} дня назад`
  return `${day}, ${hours}:${(minutes < 10) ? `0${minutes}` : minutes} i-GMT+3`;
}
export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export type TOrder = {
  _id: string,
  name: string,
  number: number,
  status: string,
  ingredients: string[],
  createdAt: string,
  updatedAt: string
}

export type TOrders = {
  success: boolean,
  orders: string[],
  total: number,
  totalToday: number
}

export type TAuth = {
  name: string,
  email: string
}
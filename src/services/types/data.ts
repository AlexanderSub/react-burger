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
  __v: number,
  uniqueId?: number
}

export type TOrder = {
  _id: string,
  name: string,
  number: number,
  status: string,
  ingredients: Array<string>,
  createdAt: string,
  updatedAt: string
}

export type TOrders = {
  success: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number
}

export type TAuth = {
  name: string,
  email: string
}

export type TLocationState = {
  from: string,
  background: {
    pathname: string;
    state: {};
    search: string;
    hash: string;
  }
}
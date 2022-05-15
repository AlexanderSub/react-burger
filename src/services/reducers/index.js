import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { detailsReducer } from './details'
import { orderReducer } from './order'
import { constructorReducer } from './constructor'
import { authReducer } from './auth'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  details: detailsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer
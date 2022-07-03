import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../store";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TDetailsActions } from "../actions/details";
import { TwsActions } from "../actions/wsActions";

export type RootState = ReturnType<typeof store.getState>

// Типизация всех экшенов приложения
type TApplicationActions = 
  | TIngredientsActions
  | TOrderActions
  | TDetailsActions
  | TwsActions

// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch

import React, {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { URL_MAIN, URL_LOGIN, URL_PROFILE, URL_FORGOT, URL_RESET, URL_REGISTER, URL_INGREDIENT_DETAILS, URL_ORDERS, URL_FEED } from '../../utils/constants'
import Main from '../../pages/main'
import Login from '../../pages/login'
import Profile from '../../pages/profile/profile'
import Forgot from '../../pages/forgot-password'
import Reset from '../../pages/reset-password'
import Register from '../../pages/register'
import IngredientPage from '../../pages/ingredient-page/ingredient-page'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Orders from '../../pages/profile/orders'
import { getCookie } from '../../utils/utils'
import { getUserData } from '../../services/actions/auth'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { Feed } from '../../pages/feed/feed'
import { Order } from '../Order/Order'
import OrderPage from '../../pages/order-page/order-page'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background

  const closeModal = () => {
    history.goBack()
  }

  useEffect(() => {
    dispatch(getIngredients())
  }, [])

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    if (accessToken) {
      dispatch(getUserData())
    }
  }, [dispatch])


  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <Switch location={ background || location }>
        <Route path={URL_MAIN} exact>
          <Main />
        </Route>
        <Route path={URL_FEED} exact>
          <Feed />
        </Route>
        <Route path={URL_LOGIN}>
          <Login />
        </Route>
        <ProtectedRoute path={URL_PROFILE}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path={URL_ORDERS}>
          <Orders />
        </ProtectedRoute>
        <Route path={URL_FORGOT}>
          <Forgot />
        </Route>
        <Route path={URL_RESET}>
          <Reset />
        </Route>
        <Route path={URL_REGISTER}>
          <Register />
        </Route>
        <Route path='/ingredients/:id'>
          <IngredientPage />
        </Route>
        <Route path='/feed'>
          <Feed />
        </Route>
        <Route path='/feed/:id'>
          <OrderPage />
        </Route>
      </Switch>
      {
        background && (
          <Route path='/ingredients/:id'>
            <Modal closeModal={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
        )
      }
      {/* {
        background && (
          <Route path='/feed/:id'>
            <Modal closeModal={closeModal}>
              <Order />
            </Modal>
          </Route>
        )
      } */}
    </div>
  )
}

export default App
import {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
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
import OrderPage from '../../pages/order-page/order-page'
import { OrderInfo } from '../OrderInfo/OrderInfo'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const background = location.state && location.state.background

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
  }, [])

  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <Switch location={ background || location }>
        <Route path='/' exact>
          <Main />
        </Route>
        <Route path='/feed' exact>
          <Feed />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <ProtectedRoute path='/profile' exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders' exact>
          <Orders />
        </ProtectedRoute>
        <Route path='/forgot-password'>
          <Forgot />
        </Route>
        <Route path='/reset-password'>
          <Reset />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/ingredients/:id'>
          <IngredientPage />
        </Route>
        <Route path='/feed/:id'>
          <OrderPage path={'feed'} />
        </Route>
        <Route path='/profile/orders/:id'>
          <OrderPage path={'profile'} />
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
      {
        background && (
          <Route path='/feed/:id'>
            <Modal closeModal={closeModal}>
              <OrderInfo path={'feed'} />
            </Modal>
          </Route>
        )
      }
      {
        background && (
          <Route path='/profile/orders/:id'>
            <Modal closeModal={closeModal}>
              <OrderInfo path={'profile'} />
            </Modal>
          </Route>
        )
      }
    </div>
  )
}

export default App
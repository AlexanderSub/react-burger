import React, {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { URL_MAIN, URL_LOGIN, URL_PROFILE, URL_FORGOT, URL_RESET, URL_REGISTER, URL_INGREDIENTS, URL_INGREDIENT_DETAILS, URL_ORDERS } from '../../utils/constants'
import Main from '../../pages/main'
import Login from '../../pages/login'
import Profile from '../../pages/profile/profile'
import Forgot from '../../pages/forgot-password'
import Reset from '../../pages/reset-password'
import Register from '../../pages/register'
import IngredientPage from '../../pages/ingredient-page'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Orders from '../../pages/profile/orders'
import { getCookie } from '../../utils/utils'
import { getUser } from '../../services/actions/auth'
import Modal from '../Modal/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/details'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const background = location.state && location.state.background

  const closeIngredientDetails = () => {
    history.goBack()
  }

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    dispatch(getIngredients())
    if (accessToken) {
      dispatch(getUser())
    }
  }, [dispatch])


  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <Switch location={ background || location }>
        <Route path={URL_MAIN} exact>
          <Main />
        </Route>
        <Route path={URL_LOGIN} exact>
          <Login />
        </Route>
        <ProtectedRoute path={URL_PROFILE} exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path={URL_ORDERS} exact>
          <Orders />
        </ProtectedRoute>
        <Route path={URL_FORGOT} exact>
          <Forgot />
        </Route>
        <Route path={URL_RESET} exact>
          <Reset />
        </Route>
        <Route path={URL_REGISTER} exact>
          <Register />
        </Route>
        <Route path={URL_INGREDIENT_DETAILS} exact>
          <IngredientPage />
        </Route>
      </Switch>
      {
        background && (
          <Route path={URL_INGREDIENT_DETAILS}>
            <Modal closeModal={closeIngredientDetails}>
              <IngredientDetails />
            </Modal>
          </Route>
        )
      }
    </div>
  )
}

export default App
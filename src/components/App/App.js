import React, {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    dispatch(getIngredients())
    if (accessToken) {
      dispatch(getUser())
    }
  }, [dispatch])


  return (
    <div className={AppStyles.page}>
      <Router>
        <AppHeader />
        <Switch>
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
      </Router>
    </div>
  )
}

export default App
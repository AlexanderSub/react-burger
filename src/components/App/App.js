import React, {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { URL_MAIN, URL_LOGIN, URL_PROFILE, URL_FORGOT, URL_RESET, URL_REGISTER, URL_INGREDIENTS, URL_INGREDIENT_DETAILS } from '../../utils/utils'
import Main from '../../pages/main'
import Login from '../../pages/login'
import Profile from '../../pages/profile/profile'
import Forgot from '../../pages/forgot-password'
import Reset from '../../pages/reset-password'
import Register from '../../pages/register'
import IngredientPage from '../../pages/ingredient-page'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { ProvideAuth } from '../../services/auth'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={AppStyles.page}>
      <ProvideAuth>
        <Router>
          <AppHeader />
          <Routes>
            <Route path={URL_MAIN} element={<Main />} />
            <Route path={URL_LOGIN} element={<Login />} />
            {/* <ProtectedRoute path={URL_PROFILE} >
              <Profile />
            </ProtectedRoute> */}
            <Route path={URL_PROFILE} element={
              <ProtectedRoute >
                <Profile />
              </ProtectedRoute>
            } />
            <Route path={URL_FORGOT} element={<Forgot />} />
            <Route path={URL_RESET} element={<Reset />} />
            <Route path={URL_REGISTER} element={<Register />} />
            <Route path={URL_INGREDIENT_DETAILS} element={<IngredientPage />} />
          </Routes>
        </Router>
      </ProvideAuth>
    </div>
  )
}

export default App
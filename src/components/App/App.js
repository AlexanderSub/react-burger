import React, {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { URL_MAIN, URL_LOGIN, URL_PROFILE, URL_FORGOT, URL_RESET, URL_REGISTER, URL_INGREDIENT_DETAILS } from '../../utils/constants'
import Main from '../../pages/main'
import Login from '../../pages/login'
import Profile from '../../pages/profile/profile'
import Forgot from '../../pages/forgot-password'
import Reset from '../../pages/reset-password'
import Register from '../../pages/register'
import IngredientPage from '../../pages/ingredient-page/ingredient-page'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import Modal from '../Modal/Modal'


const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state?.background

  const closeIngredientDetails = () => navigate(-1)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={URL_MAIN} element={<Main />} />
        <Route path={URL_LOGIN} element={<Login />} />
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
      {background && <Routes>
        <Route
          path="/ingredients/:id"
          element={
            <Modal closeModal={closeIngredientDetails}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>}
    </div>
  )
}

export default App
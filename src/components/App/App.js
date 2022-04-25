import React, {useEffect} from 'react'
import AppStyles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import { useDispatch } from 'react-redux'
import { getIngredients } from '../../services/actions/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <main className={AppStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  )
}

export default App
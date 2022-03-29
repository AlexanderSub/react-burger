import React, {useEffect, useReducer, useState} from "react";
import AppStyles from './App.module.css'
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { DataContext, ConstructorContext } from "../../services/productContext";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [orderDetailsModalState, setOrderDetailsModalState] = useState({visible: false})
  const [ingredientDetailsModalState, setIngredientDetailsModalState] = useState({visible: false})
  const [ingredient, setIngredient] = useState(null)
  const identifier = '034536'

  const [ingredients, setIngredients]= useState({
    data: []
  })

  useEffect(() => {
    const getData = async () => {
      try {
        setIngredients({
          ...ingredients
        })
        const res = await fetch(URL)
        if (!res.ok) {
          throw new Error(`Ошибка ответа сети: ${res.status}`)
        }
        const data = await res.json();
        setIngredients({
          data: data.data
        })
      } catch (error) {
        console.log('Возникла проблема с вашим fetch запросом: ', error.message)
      }
    }
    getData()
  }, [])

  const openOrderDetailsModal = () => {
    setOrderDetailsModalState({visible: true})
  }
 
  const openIngredientDetailsModal = (ingredientData) => {
    setIngredient(ingredientData)
    setIngredientDetailsModalState({visible: true})
  }

  const closeModal = () => {
    setOrderDetailsModalState({visible: false})
    setIngredientDetailsModalState({visible: false})
  }

  return (
    <div className={AppStyles.page}>
      <AppHeader />
      <main className={AppStyles.main}>
        <DataContext.Provider value={ingredients}>
          <BurgerIngredients openModal={openIngredientDetailsModal} />
          <BurgerConstructor openModal={openOrderDetailsModal} />
        </DataContext.Provider>
      </main>
      {orderDetailsModalState.visible && <OrderDetails identifier={identifier} closeModal={closeModal} />}
      {ingredientDetailsModalState.visible && <IngredientDetails ingredient={ingredient} closeModal={closeModal} />}
    </div>
  )
}

export default App
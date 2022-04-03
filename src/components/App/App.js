import React, {useEffect, useState} from "react";
import AppStyles from './App.module.css'
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { DataContext } from "../../services/productContext";
import { URL } from "../../utils/constants";

const App = () => {
  const [orderDetailsModalState, setOrderDetailsModalState] = useState({visible: false})
  const [ingredientDetailsModalState, setIngredientDetailsModalState] = useState({visible: false})
  const [ingredient, setIngredient] = useState(null)
  const [order, setOrder] = useState(null)

  const [ingredients, setIngredients]= useState({
    data: []
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const res = await fetch(`${URL}/ingredients`)
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
          <BurgerConstructor openModal={openOrderDetailsModal} setOrderDetails={setOrder} />
        </DataContext.Provider>
      </main>
      {orderDetailsModalState.visible && <OrderDetails orderDetails={order} closeModal={closeModal} />}
      {ingredientDetailsModalState.visible && <IngredientDetails ingredient={ingredient} closeModal={closeModal} />}
    </div>
  )
}

export default App
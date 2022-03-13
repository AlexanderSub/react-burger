import React, {useState} from "react";
import AppStyles from './App.module.css'
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import useGetIngredientsData from "../../utils/data";


const App = () => {
  const products = useGetIngredientsData();
  const [orderDetailsModalState, setOrderDetailsModalState] = useState({visible: false})
  const [ingredientDetailsModalState, setIngredientDetailsModalState] = useState({visible: false})
  const [ingredient, setIngredient] = useState({})
  const identifier = '034536'

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
        <BurgerIngredients products={products} openModal={openIngredientDetailsModal} />
        <BurgerConstructor products={products} openModal={openOrderDetailsModal} />
      </main>
      {orderDetailsModalState.visible && <OrderDetails identifier={identifier} closeModal={closeModal} />}
      {ingredientDetailsModalState.visible && <IngredientDetails ingredient={ingredient} closeModal={closeModal} />}
    </div>
  )
}

export default App
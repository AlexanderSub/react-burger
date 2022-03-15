import React, {useEffect, useState} from "react";
import AppStyles from './App.module.css'
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const URL = 'https://norma.nomoreparties.space/api/ingredients';


const App = () => {
  const [orderDetailsModalState, setOrderDetailsModalState] = useState({visible: false})
  const [ingredientDetailsModalState, setIngredientDetailsModalState] = useState({visible: false})
  const [ingredient, setIngredient] = useState(null)
  const identifier = '034536'
  const [state, setState] = useState({
    productsData: [],
    isLoading: false,
  })

  useEffect(() => {
    const getProductData = async () => {
      try {
        setState({...state, isLoading: true})
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(`Ошибка ответа сети: ${res.status}, ${res.statusMessage}`)
      }
      const data = await res.json();
      setState({productsData: data.data, isLoading: false});
      } catch (error) {
        console.log('Возникла проблема с вашим fetch запросом: ', error.message)
      }
    }

    getProductData();
  }, [])

  const products = state.productsData


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
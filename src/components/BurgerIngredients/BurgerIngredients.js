import React, {useState} from "react"
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { useDispatch, useSelector } from "react-redux"
import Modal from "../Modal/Modal"
import IngredientDetails from "../IngredientDetails/IngredientDetails"
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../../services/actions/details" 

const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(store => store.ingredients.data)
  const ingredientDetails = useSelector(state => state.details.ingredient)
  const openDetails = useSelector(state => state.details.isOpen)

  const openIngredientDetails = (ingredient) => {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      payload: ingredient
    })
  }

  const closeIngredientDetails = () => {
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS
    })
  }

  const [current, setCurrent] = useState('bun')

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun')
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce')
  const mains = ingredients.filter(ingredient => ingredient.type === 'main')

  const ingredientsList = (list) => {
    return list.map(ingredient => 
      (<li className={BurgerIngredientsStyles.item} key={ingredient._id} onClick={() => openIngredientDetails(ingredient)} >
      <Counter count={1} size="default" />
      <img src={ingredient.image} alt={ingredient.name} className={`pl-4 pr-4 mb-1`}/>
      <div className={`${BurgerIngredientsStyles.wrapper} mb-1`}>
        <p className={`text text_type_digits-default mr-2`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${BurgerIngredientsStyles.span} text text_type_main-default`}>{ingredient.name}</span>
    </li>)
    )
  }

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <nav className={`${BurgerIngredientsStyles.nav} mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </nav>
      <div className={`${BurgerIngredientsStyles.window} custom-scroll`}>
        <section className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id='bun'>Булки</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {ingredientsList(buns)}
          </ul>
        </section>

        <section className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id='sauce'>Соусы</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {ingredientsList(sauces)}
          </ul>
        </section>

        <section className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id='main'>Начинки</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {ingredientsList(mains)}
          </ul>
        </section>
      </div>
      {openDetails && (
        <Modal closeModal={closeIngredientDetails}>
          <IngredientDetails data={ingredientDetails} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerIngredients
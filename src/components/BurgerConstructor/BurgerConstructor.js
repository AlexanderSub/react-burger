import React, {useMemo} from "react"
import PropTypes from 'prop-types'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/default-ingredients.json'
import { getOrderData, checkResponse } from "../../utils/utils"

const BurgerConstructor = ( {openModal, setOrderDetails} ) => {

  const bun = data.find(el => el.type === 'bun')
  const fillings = data.filter(el => el.type !== 'bun')

  const burgerPrice = useMemo(
    () => {
      let price = 0
      price = fillings.reduce((acc, el) => acc + el.price, bun.price*2)
      return price
    },
    [bun, fillings]
  )

  const handleOrderButtonClick = () => {
    const currentBurger = []

    fillings.forEach(el => currentBurger.push(el._id))
    currentBurger.push(bun._id)

    getOrderData(currentBurger)
      .then(checkResponse)
      .then(setOrderDetails)
      .then(openModal)
      .catch(error => console.log(error));
  }
 
  return (
    <section className={`${BurgerConstructorStyles.section} mt-25`}>
      <div className={`${BurgerConstructorStyles.container} mb-10`}>
        <div className={'ml-6'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        
        <div className={`${BurgerConstructorStyles.middleContainer} custom-scroll`}>
          {fillings.map((item, index) => {
            return (
              <div className={BurgerConstructorStyles.ingredient} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} key={index} />
              </div>
            )
          })}
        </div>

        <div className={'ml-6'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>

      <div className={BurgerConstructorStyles.order}>
        <div className={`${BurgerConstructorStyles.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2`}>{burgerPrice ? burgerPrice : '...'}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type='primary' size='large' onClick={handleOrderButtonClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
  setOrderDetails: PropTypes.func.isRequired
}

export default BurgerConstructor
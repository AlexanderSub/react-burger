import React, { useContext } from "react"
import PropTypes from 'prop-types'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DataContext } from "../../services/productContext"

const BurgerConstructor = ( {openModal} ) => {
  const ingredients = useContext(DataContext).data

  const fillings = ingredients.filter(ingredient => ingredient.type !== 'bun')

  return (
    <section className={`${BurgerConstructorStyles.section} mt-25`}>
      <div className={`${BurgerConstructorStyles.container} mb-10`}>
        <div className={'ml-6'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
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
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>

      </div>

      <div className={BurgerConstructorStyles.order}>
        <div className={`${BurgerConstructorStyles.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2`}>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type='primary' size='large' onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
}

export default BurgerConstructor
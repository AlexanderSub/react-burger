import React, {useMemo} from "react"
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from "../Modal/Modal"
import OrderDetails from "../OrderDetails/OrderDetails"
import data from '../../utils/default-ingredients.json'
import { useDispatch, useSelector } from "react-redux"
import { CLOSE_ORDER_DETAILS, OPEN_ORDER_DETAILS, getOrder } from "../../services/actions/order"

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const openOrderDetails = useSelector(state => state.order.isOpen)
  const order = useSelector(store => store.order.order)

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

  const orderDetails = () => {
    const ingredients = []

    fillings.forEach(el => ingredients.push(el._id))
    ingredients.push(bun._id)
    dispatch(getOrder(ingredients))
    dispatch({
      type: OPEN_ORDER_DETAILS
    })
  }

  const closeOrderDetails = () => {
    dispatch({
      type: CLOSE_ORDER_DETAILS
    })
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
        <Button type='primary' size='large' onClick={orderDetails}>
          Оформить заказ
        </Button>
      </div>
      {openOrderDetails && order && (
        <Modal closeModal={closeOrderDetails}>
          <OrderDetails order={order}/>
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor
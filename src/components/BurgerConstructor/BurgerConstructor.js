import React, {useMemo} from 'react'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_ORDER_DETAILS, OPEN_ORDER_DETAILS, getOrder } from '../../services/actions/order'
import { useDrop } from 'react-dnd'
import { ADD_BUN, ADD_FILLING, GENERATE_ID, MOVE_ITEM, RESET_CONSTRUCTOR } from '../../services/actions/constructor'
import { v4 as uuidv4 } from 'uuid'
import { BurgerConstructorItem } from '../BurgerConstructorItem/BurgerConstructorItem'
import { useHistory } from 'react-router-dom'
import { URL_LOGIN } from '../../utils/constants'

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const data = useSelector(store => store.ingredients.data)
  const bun = useSelector(store => store.burgerConstructor.bun)
  const fillings = useSelector(store => store.burgerConstructor.fillings)
  const ingredients = ['main', 'sauce']
  const items = [...bun, ...bun, ...fillings]
  const generateId = useSelector(store => store.burgerConstructor.generateId)
  
  const orderId = items.map(item => item._id)
  const order = useSelector(store => store.order.order)
  const openOrderDetails = useSelector(state => state.order.isOpen)

  const isAuthorized = useSelector(state => state.auth.authorized)

  const [{ bunHover }, drop] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({
        type: ADD_BUN,
        ...item,
        payload: data.find((el) => el._id === item.id),
      })
    },
    collect: (monitor) => ({
      bunHover: monitor.isOver(),
    }),
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: ingredients,
    drop(item) {
      dispatch({
        type: GENERATE_ID,
        payload: uuidv4()
      })
      dispatch({
        type: ADD_FILLING,
        ...item,
        payload: data.find(el => el._id === item.id)
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  const moveItem = (dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_ITEM,
      dragIndex,
      hoverIndex
    })
  }

  const borderColor = bunHover || isHover ? '#4C4CFF' : 'transparent'

  const burgerPrice = useMemo(
    () => {
      return items.reduce((acc, el) => acc + el.price, 0)
    },
    [items]
  )

  const orderDetails = () => {
    if (!isAuthorized) {
      history.push({pathname: URL_LOGIN, state: {prevPathname: history.location.pathname}})
      return
    }
    dispatch(getOrder(orderId))
    dispatch({
      type: OPEN_ORDER_DETAILS
    })
  }

  const closeOrderDetails = () => {
    dispatch({
      type: CLOSE_ORDER_DETAILS,
    })
    dispatch({
      type: RESET_CONSTRUCTOR
    })
  }
 
  return (
    <section className={`${BurgerConstructorStyles.section} mt-25`}>
      {(bun.length === 0 || fillings.length === 0) && 
        <div className={BurgerConstructorStyles.containerEmpty}>
          <p className={`${BurgerConstructorStyles.text} text text_type_main-medium`}>
            Перетащите сюда булку и любые ингредиенты, чтобы сделать заказ
          </p>
        </div>}
      <div className={`${BurgerConstructorStyles.container} mb-10`} style={{borderColor}} ref={drop}>
        {bun[0] && (<div className={'ml-6'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun[0].name} (верх)`}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>)}
        
        <div className={`${BurgerConstructorStyles.middleContainer} custom-scroll`} ref={dropTarget} style={{borderColor}}>
          {
            fillings.map((data, index) => {
              return (
                <BurgerConstructorItem
                  key={generateId[index]}
                  index={index}
                  data={data}
                  moveItem={moveItem}
                />
              )
            })
          }
        </div>

        {bun[0] && (<div className={'ml-6'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun[0].name} (низ)`}
            price={bun[0].price}
            thumbnail={bun[0].image}
          />
        </div>)}
      </div>

      <div className={BurgerConstructorStyles.order}>
        <div className={`${BurgerConstructorStyles.sum} mr-10`}>
          <p className={`text text_type_digits-medium mr-2`}>{burgerPrice ? burgerPrice : 0}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type='primary' size='large' onClick={orderDetails} disabled={bun.length === 0 || fillings.length === 0 }>
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
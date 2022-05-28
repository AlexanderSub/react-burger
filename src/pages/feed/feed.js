import React, { useEffect } from "react";
import AppStyles from '../../components/App/App.module.css'
import FeedStyles from '../feed/feed.module.css'
import { useDispatch, useSelector } from "react-redux";
import { wsConnectionStart } from "../../services/actions/wsActions";
import { ClipLoader } from 'react-spinners'
import { Order } from "../../components/Order/Order";
import { Link, useLocation } from "react-router-dom";

export const Feed = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  useEffect(() => {
    dispatch(wsConnectionStart())
  }, [dispatch])

  const orders = useSelector(state => state.ws.orders)
  const ordersTotal = useSelector(state => state.ws.total)
  const ordersToday = useSelector(state => state.ws.totalToday)

  if (!orders.length) {
    return(
     <div className={FeedStyles.loader}>
       <h4 className={`text text_type_main-medium mb-4`}>Загрузка данных о заказах</h4>
      <ClipLoader color={'#fff'} size={100} />
    </div> 
    )
  }

    const ordersDone = orders.filter(order => order.status === 'done')
    const ordersCooking = orders.filter(order => order.status === 'pending')

  return (
    <main className={AppStyles.main}>
      <div>
        <h2 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
        <ul className={`${FeedStyles.orders} custom-scroll`}>
          {orders.map(order => <Order key={order._id} data={order}/>)}
        </ul>
      </div>
      <div>
        <div className={`${FeedStyles.ordersBoard} mt-25 mb-15`}>
          <div className={FeedStyles.ordersList}>
            <h4 className={`text text_type_main-medium mb-4`}>Готовы:</h4>
            <ul className={FeedStyles.list}>
              {ordersDone.slice(0, 5).map(order => {
                return (
                  <li key={order.number} className={`${FeedStyles.done} text text_type_digits-default mb-2`}>{order.number}</li>
                )
              })}
            </ul>
          </div>
          <div className={FeedStyles.ordersList}>
            <h4 className={`text text_type_main-medium mb-4`}>В работе:</h4>
            <ul className={FeedStyles.list}>
              {ordersCooking.slice(0, 5).map(order => {
                return (
                  <li key={order.number} className={`text text_type_digits-default mb-2`}>{order.number}</li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className={`${FeedStyles.completed} mb-15`}>
          <h4 className={`text text_type_main-medium mb-4`}>Выполнено за всё время:</h4>
          <p className={`${FeedStyles.number} text text_type_digits-large`}>{ordersTotal}</p>
        </div>
        <div className={FeedStyles.completed}>
          <h4 className={`text text_type_main-medium mb-4`}>Выполнено за сегодня:</h4>
          <p className={`${FeedStyles.number} text text_type_digits-large`}>{ordersToday}</p>
        </div>
      </div>
    </main>
  )
  
}
import React, { useEffect } from "react";
import AppStyles from '../../components/App/App.module.css'
import FeedStyles from '../feed/feed.module.css'
import { useDispatch, useSelector } from "react-redux";
import { wsConnectionClosed, wsConnectionStart, wsGetMessage } from "../../services/actions/wsActions";
import { getMessages, getWsConnected } from "../../services/selectors/wsSelectors";

export const Feed = () => {
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const isConnected = useSelector(getWsConnected)

  useEffect(() => {
    dispatch(wsConnectionStart())
  }, [dispatch])

  const ordersData = useSelector(store => store.ws.messages)


  return (
    <main className={AppStyles.main}>
      <div>
        <h2 className={`text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
        <div className={`${FeedStyles.orders} custom-scroll`}>

        </div>
      </div>
      <div>
        <div className={`${FeedStyles.ordersBoard} mt-25 mb-15`}>
          <div className={FeedStyles.ordersList}>
            <h4 className={`text text_type_main-medium mb-4`}>Готовы:</h4>
            <ul className={FeedStyles.list}>
              <li className={`${FeedStyles.done} text text_type_digits-default mb-2`}>034533</li>
              <li className={`${FeedStyles.done} text text_type_digits-default mb-2`}>034532</li>
              <li className={`${FeedStyles.done} text text_type_digits-default mb-2`}>034530</li>
              <li className={`${FeedStyles.done} text text_type_digits-default`}>034527</li>
            </ul>
          </div>
          <div className={FeedStyles.ordersList}>
            <h4 className={`text text_type_main-medium mb-4`}>В работе:</h4>
            <ul className={FeedStyles.list}>
              <li className={`text text_type_digits-default`}>034538</li>
              <li className={`text text_type_digits-default`}>034541</li>
              <li className={`text text_type_digits-default`}>034542</li>
            </ul>
          </div>
        </div>
        <div className={`${FeedStyles.completed} mb-15`}>
          <h4 className={`text text_type_main-medium mb-4`}>Выполнено за всё время:</h4>
          <p className={`${FeedStyles.number} text text_type_digits-large`}>28 752</p>
        </div>
        <div className={FeedStyles.completed}>
          <h4 className={`text text_type_main-medium mb-4`}>Выполнено за сегодня:</h4>
          <p className={`${FeedStyles.number} text text_type_digits-large`}>138</p>
        </div>
      </div>
    </main>
  )
  
}
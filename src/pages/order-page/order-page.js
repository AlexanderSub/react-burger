import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";
import OrderPageStyles from './order-page.module.css'

const OrderPage = () => {
  // let { id } = useParams()

  return (
    <div className={`${OrderPageStyles.wrapper} mt-30`}>
      <OrderInfo />
    </div>
  )
}

export default OrderPage
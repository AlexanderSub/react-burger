import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Order } from "../../components/Order/Order";
import OrderPageStyles from './order-page.module.css'

const OrderPage = () => {
  let { id } = useParams()
  console.log(id)
  // const ingredients = useSelector(state => state.ingredients.data)
  // if (!ingredients) {
  //   return null
  // }

  return (
    <div className={`${OrderPageStyles.wrapper} mt-30`}>
      12324
      {/* <Order /> */}
    </div>
  )
}

export default OrderPage
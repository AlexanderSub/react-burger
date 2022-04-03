import React from "react";
import PropTypes from 'prop-types'
import OrderDetailsStyles from './OrderDetails.module.css'
import Modal from "../Modal/Modal"
import { orderDetailsPropType } from "../../utils/types";

const OrderDetails = ({orderDetails, closeModal}) => {
  const { number } = orderDetails.order;

  return (
    <Modal className={OrderDetailsStyles.container} closeModal={closeModal}>
      <h2 className={`${OrderDetailsStyles.orderNumber} text text_type_digits-large mt-30 mb-8`}>{number}</h2>
      <h3 className="text text_type_main-medium mb-15">Идентификатор заказа</h3>
      <div className={`${OrderDetailsStyles.doneImage} mb-15`} />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
}

OrderDetails.propTypes = {
  orderDetails: orderDetailsPropType.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default OrderDetails
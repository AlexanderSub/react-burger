import React from "react";
import PropTypes from 'prop-types'
import ModalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({children, onClose}) => {
  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClose}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay
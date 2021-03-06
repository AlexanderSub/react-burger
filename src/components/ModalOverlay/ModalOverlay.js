import React from 'react'
import PropTypes from 'prop-types'
import ModalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({onClose}) => {
  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClose} />
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay
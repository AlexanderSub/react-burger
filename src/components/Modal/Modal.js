import {useEffect} from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import ModalStyles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById('react-modals')

const Modal = ({children, closeModal}) => {
  
  const closeModalByClickOnEscape = (evt) => {
    if (evt.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalByClickOnEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByClickOnEscape)
    }
  }, [])


  return createPortal (
    <>
      <div className={ModalStyles.container}>
        <button className={ModalStyles.button} onClick={closeModal}>
          <CloseIcon />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={closeModal} />
    </>,
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal
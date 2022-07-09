import {useEffect, ReactNode, FC} from 'react'
import { createPortal } from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import ModalStyles from './Modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById('react-modals')

type TModalProps = {
  children: ReactNode,
  closeModal: () => void
}

const Modal: FC<TModalProps> = ({children, closeModal}) => {
  
  const closeModalByClickOnEscape = (evt: KeyboardEvent) => {
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


  return modalRoot ? createPortal (
    <>
      <div className={ModalStyles.container}>
        <button className={ModalStyles.button} onClick={closeModal}>
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={closeModal} />
    </>,
    modalRoot
  ) : null
}

export default Modal
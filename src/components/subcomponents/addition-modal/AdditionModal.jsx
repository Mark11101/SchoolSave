import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CloseIcon from '@material-ui/icons/Close'

import './AdditionModal.css'

const AdditionModal = (props) => {
  const {
    children,
    onHide,
  } = props;
  
  return (
    <Modal 
      show={true} 
      className='b-addition-modal'
      onHide={onHide}
      centered
    >
      <Modal.Body>
        <button 
          className='b-button b-button--danger b-addition-modal__close-btn'
          onClick={onHide}
        >
          <CloseIcon />
        </button>
        {children}
      </Modal.Body>
    </Modal>
  )
} 

export default AdditionModal

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({ isOpen, onClose }) {
  const handleCloseButton = () => {
    onClose();
  };

  const handleFormSubmit = () => {};

  const { closeButtonStyle, modalStyle, headerStyle } = styles;

  return (
    <Modal isOpen={isOpen} contentLabel="Exemple Modal" style={modalStyle}>
      <div>
        <div style={headerStyle}>
          <h6>
            <strong>Edição de lançamento</strong>
          </h6>
          <button
            className="waves-effect btn"
            style={closeButtonStyle}
            onClick={handleCloseButton}
          >
            X
          </button>
        </div>
        <form action="" onSubmit={handleFormSubmit}>
          <legend>
            <label>Tipo</label>
          </legend>
        </form>
      </div>
    </Modal>
  );
}

const styles = {
  closeButtonStyle: {
    backgroundColor: 'white',
    marginLeft: '5px',
    marginRight: '5px',
    fontWeight: 'bold',
    color: 'darkgrey',
  },
  modalStyle: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)', // move um objeto nos eixos x e y
    },
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
};

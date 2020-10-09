import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/modalTransaction.css';

Modal.setAppElement('#root');

export default function ModalTransaction({ isOpen, onClose }) {
  const [mode, setMode] = useState('insert');
  const [type, setType] = useState('-');

  const handleCloseButton = () => {
    onClose();
  };

  const handleFormSubmit = () => {};

  const handleRadioChange = (event) => {
    const newType = event.target.value;
    // A cada troca de type será renderizada a seleção de um botão
    // tornando-o colorido
    setType(newType);
  };

  const { closeButtonStyle, modalStyle, headerStyle } = styles;

  return (
    <Modal isOpen={isOpen} contentLabel="Exemple Modal" style={modalStyle}>
      <div>
        <div style={headerStyle}>
          <h6>
            <strong>Edição de lançamento</strong>
          </h6>
          <button
            className="waves-effect waves-circle btn-small"
            style={closeButtonStyle}
            onClick={handleCloseButton}
          >
            X
          </button>
        </div>
        <form action="" onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>
              <label>Tipo</label>
            </legend>
            <div className="item-type">
              <label>
                <input
                  name="type"
                  type="radio"
                  value="-"
                  onChange={handleRadioChange}
                  checked={type === '-'}
                  disabled={mode !== 'insert'}
                />
                <span>
                  <strong>Despesa</strong>
                </span>
              </label>
              <label>
                <input
                  name="type"
                  type="radio"
                  value="+"
                  onChange={handleRadioChange}
                  checked={type === '+'}
                  disabled={mode !== 'insert'}
                />
                <span>
                  <strong>Receita</strong>
                </span>
              </label>
            </div>
          </fieldset>
        </form>
      </div>
    </Modal>
  );
}

const styles = {
  closeButtonStyle: {
    display: 'flex',
    justifyContent: 'center', // X centralizado no botão
    backgroundColor: 'white',
    marginLeft: '1%',
    marginRight: '1%',
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

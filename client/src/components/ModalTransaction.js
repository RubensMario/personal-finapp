import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/modalTransaction.css';

Modal.setAppElement('#root');

export default function ModalTransaction({
  isOpen,
  isEdit,
  onClose,
  selectedTransaction,
}) {
  const [mode, setMode] = useState('insert');
  const [formData, setFormData] = useState(selectedTransaction);

  const { closeButtonStyle, modalStyle, headerStyle, categoryStyle } = styles;
  const { type, category } = formData;

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleCloseButton = () => {
    onClose();
  };

  const handleFormSubmit = () => {};

  // Cada troca de um radio button modifica o estado formData
  // e é renderizada a seleção do botão tornando-o colorido
  const handleInputsChange = (event) => {
    // name: o que o input permite selecionar (ex:type do lançamento)
    // value: o valor escolhido: (ex: type '+' ou type '-')
    const { name, value } = event.target;

    // modifica apenas a propriedade indicada com name (type,category, etc)
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const title = isEdit ? 'Edição de lançamento' : 'Inserção de lançamento';
  return (
    <Modal isOpen={isOpen} contentLabel="Exemple Modal" style={modalStyle}>
      <div>
        <div style={headerStyle}>
          <h6>
            <strong>{title}</strong>
          </h6>
          <i style={closeButtonStyle} onClick={handleCloseButton}>
            x
          </i>
        </div>
        <form action="" onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>
              <label>Tipo</label>
            </legend>
            <div className="items-type">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="-"
                  onChange={handleInputsChange}
                  checked={type === '-'}
                  disabled={mode !== 'insert'}
                />
                <span>
                  <strong>Despesa</strong>
                </span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="+"
                  onChange={handleInputsChange}
                  checked={type === '+'}
                  disabled={mode !== 'insert'}
                />
                <span>
                  <strong>Receita</strong>
                </span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <label> Categorias </label>
            </legend>
            <div className="category-items">
              <label className={category === 'Mercado' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Mercado"
                  onChange={handleInputsChange}
                />
                <i className="material-icons small">shopping_cart</i>
                <span>Mercado</span>
              </label>

              <label className={category === 'Receita' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Receita"
                  onChange={handleInputsChange}
                />
                <i className="material-icons small">local_atm</i>
                <span>Receita</span>
              </label>

              <label className={category === 'Saúde' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Saúde"
                  onChange={handleInputsChange}
                />
                <i className="material-icons small">local_hospital</i>
                <span>Saúde</span>
              </label>

              <label className={category === 'Transporte' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Transporte"
                  onChange={handleInputsChange}
                />
                <i className="material-icons small">drive_eta</i>
                <span>Transporte</span>
              </label>

              <label className={category === 'Moradia' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Moradia"
                  onChange={handleInputsChange}
                />
                <i className="material-icons small">home</i>
                <span>Moradia</span>
              </label>

              <label className={category === 'Viagem' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Viagem"
                  onChange={handleInputsChange}
                />
                <i className="material-icons small">local_airport</i>
                <span>Viagem</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="category"
                  value="Lazer"
                  onChange={handleInputsChange}
                />
                <i className="material-icons">beach_access</i>
                <span>Lazer</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="category"
                  value="Outros"
                  onChange={handleInputsChange}
                />
                <i className="material-icons">add</i>
                <span>Outros</span>
              </label>
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="description">Descrição</label>
            <input type="text" id="description" name="description" />
          </div>
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
    marginLeft: 'auto',
    // marginRight: '1%',
    fontWeight: 'bold',
    color: '#9E9E9E',
    cursor: 'pointer',
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
  categoryStyle: {
    backgroundColor: '#f5f5f5',
    listStyle: 'none',
    border: '2px solid #f5f5f5',
    borderRadius: '8px',
    height: '90px',
    padding: '18px, 12px, 6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

// Opção de botão para fechar modal
{
  /* <button
className="waves-effect waves-circle btn-small"
style={closeButtonStyle}
onClick={handleCloseButton}
>
X
</button> */
}

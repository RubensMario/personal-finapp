import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/modalTransaction.css';

Modal.setAppElement('#root');

export default function ModalTransaction({
  isOpen,
  onClose,
  selectedTransaction,
}) {
  const [mode, setMode] = useState('insert');
  // const [type, setType] = useState('-');
  // const [category, setCategory] = useState('Lazer');
  const [formData, setFormData] = useState(selectedTransaction);

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

  // const handleTypeChange = (event) => {
  //   const selectedType = event.target.value;
  //   // A cada troca de type será renderizada a seleção de um botão
  //   // tornando-o colorido
  //   setType(selectedType);
  // };

  // const handleCategoryChange = (event) => {
  //   const selectedCategory = event.target.value;
  //   setCategory(selectedCategory);
  // };

  const handleRadioInputsChange = (event) => {
    const { name, value } = event.target;
    // name: o que o radio button permite selecionar (ex:type do lançamento)
    // value: o valor escolhido: (ex: type '+' ou type '-')
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const { closeButtonStyle, modalStyle, headerStyle, categoryStyle } = styles;
  const { type, category } = formData;

  return (
    <Modal isOpen={isOpen} contentLabel="Exemple Modal" style={modalStyle}>
      <div>
        <div style={headerStyle}>
          <h6>
            <strong>Edição de lançamento</strong>
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
                  onChange={handleRadioInputsChange}
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
                  onChange={handleRadioInputsChange}
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
              <label
                className={formData.category === 'Mercado' ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name="category"
                  value="Mercado"
                  onChange={handleRadioInputsChange}
                />
                <i className="material-icons small">shopping_cart</i>
                <span>Mercado</span>
              </label>

              <label
                className={formData.category === 'Receita' ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name="category"
                  value="Receita"
                  onChange={handleRadioInputsChange}
                />
                <i className="material-icons small">local_atm</i>
                <span>Receita</span>
              </label>

              <label
                className={formData.category === 'Saúde' ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name="category"
                  value="Saúde"
                  onChange={handleRadioInputsChange}
                />
                <i className="material-icons small">local_hospital</i>
                <span>Saúde</span>
              </label>

              <label
                className={formData.category === 'Transporte' ? 'selected' : ''}
              >
                <input
                  type="radio"
                  name="category"
                  value="Transporte"
                  onChange={handleRadioInputsChange}
                />
                <i className="material-icons small">drive_eta</i>
                <span>Transporte</span>
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

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/modalTransaction.css';

Modal.setAppElement('#root');

export default function ModalTransaction({
  isOpen,
  isEdit,
  onClose,
  onSave,
  selectedTransaction,
}) {
  const [formData, setFormData] = useState(selectedTransaction);

  const { closeButtonStyle, saveButtonStyle, modalStyle, headerStyle } = styles;

  const { type, category, description, value, yearMonthDay } = formData;

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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    onSave(formData, isEdit);
  };

  // Cada troca de um radio button modifica o estado formData
  // e a seleção do botão é renderizada tornando-o colorido
  const handleInputsChange = (event) => {
    // name: o que o input permite selecionar (ex:type do lançamento)
    // value: o valor escolhido: (ex: type '+' ou type '-')
    let { name, value } = event.target;

    name === 'value' && (value = parseFloat(value));

    // modifica apenas a propriedade indicada com name (type,category, etc)
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const { description, value } = formData;
    const validated =
      description && description !== '' && value > 0 && yearMonthDay;
    return validated;
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
                  disabled={isEdit}
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
                  disabled={isEdit}
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

              <label className={category === 'Lazer' ? 'selected' : ''}>
                <input
                  type="radio"
                  name="category"
                  value="Lazer"
                  onChange={handleInputsChange}
                />
                <i className="material-icons">beach_access</i>
                <span>Lazer</span>
              </label>

              <label className={category === 'Outros' ? 'selected' : ''}>
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

          <div className="text-inputs-style">
            <div className="field input-field ">
              <label
                htmlFor="description"
                className="active"
                style={{ backgroundColor: 'white' }}
              >
                Descrição
              </label>
              <input
                type="text"
                id="description"
                name="description"
                required
                // pattern="[A-Za-zÀ-ú\s]+$"
                defaultValue={formData && description}
                onChange={handleInputsChange}
                style={{ height: '30px', fontSize: '15px' }}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="value" className="active">
                  Valor
                </label>
                <input
                  id="value"
                  name="value"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  defaultValue={formData && value}
                  onChange={handleInputsChange}
                  style={{ width: '80%', height: '20px', fontSize: '15px' }}
                />
              </div>

              <div className="field">
                <label className="yearMonthDay">Data</label>
                <input
                  id="yearMonthDay"
                  name="yearMonthDay"
                  type="date"
                  required
                  defaultValue={formData && yearMonthDay}
                  onChange={handleInputsChange}
                  style={{ width: '80%', height: '20px', fontSize: '15px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="waves-effect btn-small"
              disabled={!validate()}
              style={saveButtonStyle}
            >
              Salvar
            </button>
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
    fontWeight: 'bold',
    color: '#9E9E9E',
    cursor: 'pointer',
  },

  saveButtonStyle: {
    backgroundColor: 'white',
    marginTop: '3px',
    marginLeft: '5px',
    marginRight: '5px',
    fontWeight: 'bold',
    color: 'darkgrey',
    alignItems: 'right',
  },

  modalStyle: {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -40%)', // move um objeto nos eixos x e y
    },
  },
  headerStyle: {
    display: 'flex',
    flexDirection: 'row',
  },

  // textInputsStyle: {
  //   display: 'grid',
  //   gridTamplateRows: '1fr 1fr',
  //   gap: '0.2vw',
  // },
};

// Opção de botão para fechar modal

/* <button
className="waves-effect waves-circle btn-small"
style={closeButtonStyle}
onClick={handleCloseButton}
>
X
</button> */

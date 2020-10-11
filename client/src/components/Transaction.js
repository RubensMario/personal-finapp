import React from 'react';
import Action from './Action';
import { formatNumber } from '../helpers/formatNumber';

export default function Transaction({ transaction, onEdit, onDelete }) {
  const { _id, description, value, category, day, type } = transaction;

  const {
    transactionStyle,
    containerStyle,
    dayStyle,
    descriptionAndTypeStyle,
    actionAndValueStyle,
    incomingValue,
    outgoingValue,
  } = styles;

  /* Outra forma de uso de object literals em handleActionClick */
  // const handleActionClick = (type) => actionClickType[type](_id);
  //
  // const actionClickType = {
  //   delete: () => onDelete(_id),
  //   edit: () => onEdit(_id),
  // };

  const handleActionClick = (type) => {
    // Object literals
    const actionClickType = {
      delete: () => onDelete(_id),
      edit: () => onEdit(_id),
    };

    return actionClickType[type](_id);
  };

  return (
    <div style={{ ...transactionStyle, ...containerStyle }}>
      <div className="day" style={dayStyle}>
        <span>
          <strong>{day}</strong>
        </span>
      </div>
      <div className="descriptionAndType" style={descriptionAndTypeStyle}>
        <span>
          <strong>{category}</strong>
        </span>
        <span value={description}>{description}</span>
      </div>
      <div className="actionAndValue" style={actionAndValueStyle}>
        <div>
          <span style={type === '+' ? incomingValue : outgoingValue}>
            <strong>{formatNumber(value)}</strong>
          </span>
        </div>
        <div style={{ width: '30%', marginLeft: '10%' }}>
          <Action type={'edit'} onActionClick={handleActionClick} />
          <Action type={'delete'} onActionClick={handleActionClick} />
        </div>
      </div>
    </div>
  );
}

// 1ª div filha de actionValue
// style={{ marginLeft: '2.17vw', width: '8rem' }}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '50%',
  },
  // containerStyle: {
  //   display: 'grid',
  //   gridTemplateColumns: '0.3fr 1fr 1fr 1fr',
  //   width: '50%',
  //   alignItems: 'center',
  // },

  transactionStyle: {
    border: '0.1vw solid ',
    borderColor: 'lightgrey',
    borderRadius: '0.4vw',
    padding: '0.02vw',
    margin: '0.5px',
    textAlign: 'left',
  },

  dayStyle: {
    width: '2%',
  },

  actionAndValueStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },

  descriptionAndTypeStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '30%', // Fundamental para o alinhamento dos valores dos lançamentos
  },

  incomingValue: {
    color: '#2980b9',
  },

  outgoingValue: {
    color: '#c0392b',
  },
};

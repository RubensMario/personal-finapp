import React from 'react';
import Action from './Action';
import { formatNumber } from '../helpers/formatNumber';

export default function Transaction({ transaction, onEdit, onDelete }) {
  const { _id, description, value, category, day } = transaction;

  const {
    transactionStyle,
    containerStyle,
    dayStyle,
    descriptionAndTypeStyle,
    valueStyle,
    actionAndValueStyle,
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
        <div style={{ marginLeft: '30px', width: '8rem' }}>
          <span styles={valueStyle}>
            <strong>{formatNumber(value)}</strong>
          </span>
        </div>
        <Action type={'edit'} onActionClick={handleActionClick} />
        <Action type={'delete'} onActionClick={handleActionClick} />
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '50%',
  },

  transactionStyle: {
    border: '0.1vw solid ',
    borderColor: 'lightgrey',
    borderRadius: '0.4vw',
    padding: '0.02vw',
    margin: '0.5px',
  },

  dayStyle: {
    // marginRight: '2%',
    padding: '2%',
  },

  actionAndValueStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'strech',
    marginleft: '10px',
  },

  descriptionAndTypeStyle: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    justifyContent: 'space-between',
    width: '50%', // Fundamental para o alinhamento dos valores dos lançamentos
  },
};

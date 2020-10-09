import React from 'react';
import { formatNumber } from '../helpers/formatNumber';

export default function Summary({
  incomings,
  outgoings,
  balance,
  transactionsNumber,
}) {
  const {
    summaryStyle,
    positiveBalance,
    negativeBalance,
    nullBalance,
  } = styles;

  return (
    <div style={summaryStyle}>
      <span>
        <strong>Lançamentos: </strong>
        {transactionsNumber}
      </span>
      <span>
        <strong> Receitas: </strong>
        {formatNumber(incomings)}
      </span>
      <span>
        <strong>Despesas: </strong>
        {formatNumber(outgoings)}
      </span>
      <span>
        <strong>Saldo: </strong>
        <span
          style={
            balance > 0
              ? positiveBalance
              : balance < 0
              ? negativeBalance
              : nullBalance
          }
        >
          <strong>{formatNumber(balance)}</strong>
        </span>
      </span>
    </div>
  );
}

const styles = {
  summaryStyle: {
    border: '0.1vw solid',
    borderColor: 'lightgrey',
    margin: '0.5vw',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
    marginTop: '2%',
  },

  positiveBalance: {
    color: '#2980b9',
  },

  negativeBalance: {
    color: '#c0392b',
  },

  nullBalance: {
    color: 'black',
  },
};

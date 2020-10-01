import React from 'react';
import { formatNumber } from '../helpers/formatNumber';

export default function Summary({ currentTransactionsData }) {
  const { transactionsNumber, balance } = currentTransactionsData;

  const positiveTransactions = currentTransactionsData.transactionsList.filter(
    (transaction) => transaction.type === '+'
  );

  const negativeTransactions = currentTransactionsData.transactionsList.filter(
    (transaction) => transaction.type === '-'
  );

  const incomings = positiveTransactions.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const outgoings = negativeTransactions.reduce(
    (acc, curr) => acc + curr.value,
    0
  );

  const { summaryStyle, positiveBalance, negativeBalance } = styles;

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
        <span style={positiveBalance}>
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
    margin: '10px',
    marginTop: '2%',
  },

  positiveBalance: {
    color: '#2980b9',
  },

  negativeBalance: {
    fontColor: '#c0392b',
  },
};

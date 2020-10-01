import React from 'react';
import './style.css';
import Transaction from './Transaction';
// {/* <p>{currentTransaction.transactionsList[0].description}</p> */}

/*  currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
export default function Transactions({ currentTransactionsData }) {
  return (
    <div>
      {currentTransactionsData.transactionsList.map((transaction) => {
        const { _id } = transaction;

        return (
          <div className="transactionCard" key={_id} style={{ padding: '1%' }}>
            <Transaction transaction={transaction} />
          </div>
        );
      })}
    </div>
  );
}

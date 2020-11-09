import React from 'react';
import Transaction from './Transaction';
import './css/transactions.css';

/*  currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
export default function Transactions({
  transactionsData,
  onEditTransaction,
  onDeleteTransaction,
}) {
  transactionsData.transactionsList.sort((a, b) => a.day - b.day);

  const handleEdit = (_id) => {
    onEditTransaction(_id);
  };

  const handleDelete = (_id) => {
    onDeleteTransaction(_id);
  };

  return (
    <div className="transactions-inner">
      {transactionsData.transactionsList.map((transaction) => {
        const { _id } = transaction;

        return (
          <div className="transactionCard" key={_id} style={{ padding: '1%' }}>
            <Transaction
              onEdit={handleEdit}
              onDelete={handleDelete}
              transaction={transaction}
            />
          </div>
        );
      })}
    </div>
  );
}

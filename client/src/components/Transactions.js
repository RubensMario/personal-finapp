import React from 'react';
import './style.css';
import Transaction from './Transaction';
// {/* <p>{currentTransaction.transactionsList[0].description}</p> */}

/*  currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
export default function Transactions({
  currentTransactionsData,
  onEditTransaction,
  onDeleteTransaction,
}) {
  const handleEdit = (_id) => {
    onEditTransaction(_id);
  };

  const handleDelete = (_id) => {
    onDeleteTransaction(_id);
  };

  return (
    <div>
      {currentTransactionsData.transactionsList.map((transaction) => {
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

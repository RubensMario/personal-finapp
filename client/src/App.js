import React, { useState, useEffect } from 'react';
import Select from './components/PeriodSelector';
import Transactions from './components/Transactions';
import PERIODS from './helpers/periods';
import { getTransactionsFrom, deleteTransaction } from './api/apiService';
import Spinner from './components/Spinner';
import Summary from './components/Summary';
import Filter from './components/Filter';
import ModalTransaction from './components/ModalTransaction';

export default function App() {
  // period = {id:n, date:yyyy-mm, name:'nome_mes/yyyy'}
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  // transações do período (mm-yyyy) selecionado (usado se o filtro está vazio)
  /*  currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
  const [currentTransactionsData, setCurrentTransactionsData] = useState({
    transactionsList: [],
  });
  // Se não há filtro, seu conteúdo é preenchido com currentTransactions
  const [filteredTransactionsData, setFilteredTransactionsData] = useState({
    transactionsList: [],
  });
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const currentDate = currentPeriod.date;
    getCurrentTransactions(currentDate);
  }, [currentPeriod]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  async function getCurrentTransactions(date) {
    // Impedir execução antes de currentPeriod ser preenchido
    if (!currentPeriod.date) return;

    const transactions = await getTransactionsFrom(date);

    setCurrentTransactionsData(transactions);
    setFilteredTransactionsData(transactions);
  }

  const handleFilterChange = (newTextToFilter) => {
    // Sem texto no filtro, exibir todas as transações do mês
    if (newTextToFilter.trim() === '') {
      setFilteredTransactionsData(currentTransactionsData);
    } else {
      const lowerCaseCategory = newTextToFilter.toLowerCase();

      const filteredTransactions = currentTransactionsData.transactionsList.filter(
        (transaction) =>
          transaction.category.toLowerCase().includes(lowerCaseCategory)
      );

      const { balance, transactionsNumber } = getDataFromTransactions(
        filteredTransactions
      );

      const newFilteredTransactionsData = {
        transactionsNumber,
        balance,
        transactionsList: filteredTransactions,
      };

      setFilteredTransactionsData(newFilteredTransactionsData);
    }
  };

  // transactions: array apenas com lançamentos
  const getDataFromTransactions = (transactions) => {
    const transactionsNumber = transactions.length;

    const positiveTransactions = transactions.filter(
      (transaction) => transaction.type === '+'
    );

    const negativeTransactions = transactions.filter(
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

    const balance = incomings - outgoings;

    return { incomings, outgoings, balance, transactionsNumber };
  };

  const handleEditTransaction = (selectedId) => {
    const newSelectedTransaction = currentTransactionsData.transactionsList.find(
      (transaction) => transaction._id === selectedId
    );

    console.log(newSelectedTransaction);
    setIsModalOpen(true);
    setSelectedTransaction(newSelectedTransaction);
  };

  const handleDeleteTransaction = async (_id) => {
    await deleteTransaction(_id);
    await getCurrentTransactions(currentPeriod.date);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const {
    incomings,
    outgoings,
    balance,
    transactionsNumber,
  } = getDataFromTransactions(filteredTransactionsData.transactionsList);

  return (
    <>
      <header>
        <div className="navbar-fixed">
          <nav style={{ backgroundColor: 'black' }}>
            <div className="navbar-home">
              <div className="content-header">
                <strong className="font-xlarge">
                  CONTROLE FINANCEIRO PESSOAL
                </strong>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="container">
        {/* <h4 className="center" style={{ padding: '5%' }}>
          <strong>CONTROLE FINANCEIRO</strong>
        </h4> */}
        {!isModalOpen && (
          <Select
            allPeriods={PERIODS}
            currentPeriod={currentPeriod}
            onChangePeriod={handlePeriodChange}
          />
        )}
        <Summary
          balance={balance}
          incomings={incomings}
          outgoings={outgoings}
          transactionsNumber={transactionsNumber}
        />
        <Filter onFilterChange={handleFilterChange} />
        <Transactions
          currentTransactionsData={filteredTransactionsData}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
        {isModalOpen && (
          <ModalTransaction
            isOpen={isModalOpen}
            isEdit={isEdit}
            onClose={handleModalClose}
            selectedTransaction={selectedTransaction}
          />
        )}
      </div>
    </>
  );
}

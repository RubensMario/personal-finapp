import React, { useState, useEffect } from 'react';
import Select from './components/PeriodSelector';
import Transactions from './components/Transactions';
import PERIODS from './helpers/periods';
import {
  getTransactionsFrom,
  deleteTransaction,
  postTransaction,
} from './api/apiService';
import Spinner from './components/Spinner';
import Summary from './components/Summary';
import Filter from './components/Filter';
import ModalTransaction from './components/ModalTransaction';
import './app.css';

export default function App() {
  // period = {id:n, date:yyyy-mm, name:'nome_mes/yyyy'}
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  // transações do período (mm-yyyy) selecionado (usado se o filtro está vazio)
  /* currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
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

    console.log(currentTransactionsData);
  }, [currentPeriod]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  async function getCurrentTransactions(date) {
    // Impedir execução antes de currentPeriod ser preenchido
    if (!currentPeriod.date) return;

    const transactionsData = await getTransactionsFrom(date);

    transactionsData.transactionsList.sort((a, b) => a.day - b.day);

    setCurrentTransactionsData(transactionsData);
    setFilteredTransactionsData(transactionsData);
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

    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedTransaction(newSelectedTransaction);
  };

  const handleDeleteTransaction = async (_id) => {
    await deleteTransaction(_id);
    await getCurrentTransactions(currentPeriod.date);
  };

  const handleInsertTransaction = async () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (formData, isEdit) => {
    if (!isEdit) {
      const { yearMonthDay } = formData;
      const year = parseInt(yearMonthDay.substring(0, 4));
      const month = parseInt(yearMonthDay.substring(5, 7));
      const day = parseInt(yearMonthDay.substring(8, 10));
      const yearMonth = yearMonthDay.substring(0, 7);

      const newTransaction = { ...formData, year, month, day, yearMonth };

      const postedTransaction = postTransaction(newTransaction);

      setIsModalOpen(false);

      // console.log(newTransaction);
      // console.log(currentTransactionsData.transactionsList);

      const newTransactionsList = [
        ...currentTransactionsData.transactionsList,
        newTransaction,
      ];

      const { balance, transactionsNumber } = getDataFromTransactions(
        newTransactionsList
      );

      const newTransactionsData = {
        transactionsNumber,
        balance,
        transactionsList: newTransactionsList,
      };

      setCurrentTransactionsData(newTransactionsData);
      setFilteredTransactionsData(newTransactionsData);
    }

    // console.log(newTransactionsList);

    // const handleActionClick = (type) => {
    //   // Object literals
    //   const actionClickType = {
    //     delete: () => onDelete(_id),
    //     edit: () => onEdit(_id),
    //   };
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
        {!isModalOpen && (
          <button
            className="waves-effect btn-small create-transaction"
            onClick={handleInsertTransaction}
          >
            Novo lançamento
          </button>
        )}
        <Transactions
          currentTransactionsData={filteredTransactionsData}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          isEdit={isEdit}
        />
        {isModalOpen && (
          <ModalTransaction
            isOpen={isModalOpen}
            isEdit={isEdit}
            onClose={handleModalClose}
            selectedTransaction={selectedTransaction}
            onSave={handleModalSave}
          />
        )}
      </div>
    </>
  );
}

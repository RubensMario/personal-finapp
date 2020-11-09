import React, { useState, useEffect } from 'react';
import Select from './components/PeriodSelector';
import Transactions from './components/Transactions';
import PERIODS from './helpers/periods';
import {
  getTransactionsFrom,
  deleteTransaction,
  createTransaction,
  updateTransaction,
} from './api/apiService';
import Summary from './components/Summary';
import Filter from './components/Filter';
import ModalTransaction from './components/ModalTransaction';
import './app.css';
import PieChart from './components/PieChart';

function findCurrentYearMonthIndex() {
  const presentDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;

  const currentYearMonth = PERIODS.find(
    (period) => period.date === presentDate
  );

  const index = PERIODS.indexOf(currentYearMonth);

  return index;
}

const currentYearMonthIndex = findCurrentYearMonthIndex();

export default function App() {
  // period = {id:n, date:yyyy-mm, name:'nome_mes/yyyy'}

  // const [currentPeriod, setCurrentPeriod] = useState(PERIODS[23]);
  const [currentPeriod, setCurrentPeriod] = useState(
    PERIODS[currentYearMonthIndex + 1]
  );

  // transações do período (mm-yyyy) selecionado (usado se o filtro está vazio)
  /* currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
  const [currentTransactionsData, setCurrentTransactionsData] = useState({
    transactionsList: [],
  });
  // Sem texto no filtro, seu conteúdo é preenchido com currentTransactions
  const [filteredTransactionsData, setFilteredTransactionsData] = useState({
    transactionsList: [],
  });
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filteredText, setFilteredText] = useState('');

  useEffect(() => {
    const currentDate = currentPeriod.date;

    getCurrentTransactions(currentDate);
    console.log(filteredText);
    console.log(currentDate);
  }, [currentPeriod]);

  useEffect(() => {
    if (filteredText.trim() === '') {
      setFilteredTransactionsData(currentTransactionsData);
    } else {
      const lowerCaseCategory = filteredText.toLowerCase();

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
  }, [setFilteredTransactionsData, filteredText]);

  const getCurrentTransactions = async (date) => {
    // Impedir execução antes de currentPeriod ser preenchido
    if (currentPeriod.date === undefined) return;

    const transactionsData = await getTransactionsFrom(date);

    // Organizar lista em ordem crescente
    transactionsData.transactionsList.sort((a, b) => a.day - b.day);

    setCurrentTransactionsData(transactionsData);
    // setFilteredTransactionsData(transactionsData);

    if (filteredText.length === 0) {
      setFilteredTransactionsData(transactionsData);
    } else {
      handleFilterChange(filteredText);
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

  const completeTransaction = (formData) => {
    const { yearMonthDay } = formData;
    const year = parseInt(yearMonthDay.substring(0, 4));
    const month = parseInt(yearMonthDay.substring(5, 7));
    const day = parseInt(yearMonthDay.substring(8, 10));
    const yearMonth = yearMonthDay.substring(0, 7);

    const completeTransaction = { ...formData, year, month, day, yearMonth };

    return completeTransaction;
  };

  const filterTransactionsList = (transactionsData, text) => {
    const lowerCaseCategory = text.toLowerCase();

    const listToFilter = transactionsData.transactionsList;
    // console.log(listToFilter);
    const filteredTransactions = (listToFilter || []).filter((transaction) => {
      transaction.category.toLowerCase().includes(lowerCaseCategory);
    });
    // console.log(filteredTransactions);

    filteredTransactions.sort((a, b) => a.day - b.day);

    return filteredTransactions;
  };

  const completeTransactionsData = (transactions) => {
    const { balance, transactionsNumber } = getDataFromTransactions(
      transactions
    );

    const newTransactionsData = {
      transactionsNumber,
      balance,
      transactionsList: transactions,
    };

    return newTransactionsData;
  };

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleFilterChange = (textToFilter) => {
    setFilteredText(textToFilter);
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

    const newTransactionsData = await getTransactionsFrom(currentPeriod.date);
    setCurrentTransactionsData(newTransactionsData);

    // Filtrar lista pós-exclusão com texto do filtro (se houver)
    const newTransactionsList = filterTransactionsList(
      newTransactionsData,
      filteredText
    );

    const newFilteredTransactionsData = completeTransactionsData(
      newTransactionsList
    );

    setFilteredTransactionsData(newFilteredTransactionsData);
  };

  const showNovemberTransactions = async () => {
    const novemberTransactions = await getTransactionsFrom(PERIODS[22].date);

    // console.log(novemberTransactions.transactionsList);

    let text = 'mercado';
    // console.log('filtro :' + text);

    const newTransactionsList = filterTransactionsList(
      novemberTransactions,
      text
    );

    const newFilteredTransactionsData = completeTransactionsData(
      newTransactionsList
    );

    // const newTransactionsList = filterTransactionsList(
    //   currentTransactionsData,
    //   text
    // );

    // const newFilteredTransactionsData = completeTransactionsData(
    //   newTransactionsList
    // );

    // console.log(newFilteredTransactionsData);
  };

  // showNovemberTransactions();
  // console.log(filteredText);

  const handleInsertTransaction = async () => {
    setIsModalOpen(true);
    setIsEdit(false);
    setSelectedTransaction({});
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = async (formData, isEdit) => {
    setIsModalOpen(false);

    const newTransaction = completeTransaction(formData);

    isEdit
      ? await updateTransaction(newTransaction)
      : await createTransaction(newTransaction);

    // Balance e transactionsNumber são calculados no backend
    getCurrentTransactions(currentPeriod.date);
    // setFilteredTransactionsData(currentPeriod.date);
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
        <Filter onFilterChange={handleFilterChange} searchText={filteredText} />
        {!isModalOpen && (
          <button
            className="waves-effect btn-small create-transaction"
            onClick={handleInsertTransaction}
          >
            Novo lançamento
          </button>
        )}
        <div className="cards-and-chart">
          <Transactions
            transactionsData={filteredTransactionsData}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            isEdit={isEdit}
          />
          <PieChart chartData={filteredTransactionsData} />
        </div>
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

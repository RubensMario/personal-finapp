import React, { useState, useEffect } from 'react';
import Select from './components/PeriodSelector';
import Transactions from './components/Transactions';
import PERIODS from './helpers/periods';
import { getTransactionFrom } from './api/apiService';
import Spinner from './components/Spinner';
import Summary from './components/Summary';
import Filter from './components/Filter';

export default function App() {
  // period = {id:n, date:yyyy-mm, name:'nome_mes/yyyy'}
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[0]);
  // transações do período (mm-yyyy) selecionado
  /*  currentTransaction = { transactionsNumber: n, balance:R$ n, transactionsList: [transações do mês] } */
  const [currentTransactionsData, setCurrentTransactionsData] = useState({
    transactionsList: [],
  });

  useEffect(() => {
    async function getCurrentTransactions(date) {
      // Impedir execução antes de currentPeriod ser preenchido
      if (!currentPeriod.date) return;

      const transactions = await getTransactionFrom(date);
      setCurrentTransactionsData(transactions);
    }

    const currentDate = currentPeriod.date;
    getCurrentTransactions(currentDate);
  }, [currentPeriod]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleFilterChange = (textToFilter) => {
    const lowerCaseCategory = textToFilter.toLowerCase();
    const filteredTransactions = currentTransactionsData.transactionsList.filter(
      (transaction) => transaction.category.includes(lowerCaseCategory, 0)
      // (transaction) => transaction.category === lowerCaseCategory
    );

    /* Quebra por fornecer apenas transactionsList, sem as outras propriedades.
    Isso pode ser resolvido criando-se uma função para complementar o objeto do tipo currentTransactionsData. Esse objeto pode ser usado posteriormente para a atualização do summary após o uso do filtro
    */
    // setCurrentTransactionsData(filteredTransactions);
    // console.log(typeof currentTransactionsData.transactionsList[0].category);
    console.log(filteredTransactions);
  };

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
        <Select
          allPeriods={PERIODS}
          currentPeriod={currentPeriod}
          onChangePeriod={handlePeriodChange}
        />
        <Summary currentTransactionsData={currentTransactionsData} />
        <Filter
          onFilterChange={handleFilterChange}
          // textToFilter={filteredCategory}
        />
        <Transactions currentTransactionsData={currentTransactionsData} />
      </div>
    </>
  );
}

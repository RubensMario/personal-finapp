import React from 'react';
import './css/pieChart.css';
import Chart from 'react-google-charts';

export default function PieChart({ chartData }) {
  let chartMap = new Map();
  let categorySet = new Set();

  // Evitar execução da função com valor undefined pra transactionsList
  chartData.transactionsList[0] && createChartMap();

  function createChartMap() {
    for (let transaction of chartData.transactionsList) {
      categorySet.add(transaction.category);
    }

    categorySet.forEach((category) => {
      let keyValue = 0;

      chartData.transactionsList.forEach((transaction) => {
        if (transaction.category === category) {
          keyValue = transaction.value + keyValue;
          chartMap.set(category, keyValue);
        }
      });
    });

    /* TESTE */
    // console.log(chartData.transactionsList);
    const transportTransactions = chartData.transactionsList.filter(
      (transaction) => transaction.category == 'Transporte'
    );
    const marketTransactions = chartData.transactionsList.filter(
      (transaction) => transaction.category == 'Mercado'
    );

    const transportTransactionsValue = transportTransactions.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const marketTransactionsValue = marketTransactions.reduce(
      (acc, curr) => acc + curr.value,
      0
    );

    console.log('Transporte: ' + transportTransactionsValue);
    console.log('Mercado: ' + marketTransactionsValue);
  }

  const pieOptions = {
    legend: {
      position: 'right',
      // alignment: 'center',
      textStyle: {
        color: '233238',
        fontSize: 12,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 100,
      top: 12,
      width: '90%',
      height: '90%',
    },
    width: '100%',
  };

  const chartMatrix = Array.from(chartMap);
  const categoriesData = [...chartMatrix, ['Saldo', chartData.balance]];

  return (
    <div className="chart-container">
      <Chart
        width={'500px'}
        height={'400px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Category', 'Value'],
          // P/ que as despesas no gráfico sejam um percentual da receita total
          ...categoriesData,
        ]}
        options={{
          title: 'Popularity of Types of Pizza',
          sliceVisibilityThreshold: 0.01, // 20%
          ...pieOptions,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
}

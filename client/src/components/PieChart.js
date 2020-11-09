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
      transaction.category !== 'Receita' &&
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
  }

  const pieOptions = {
    legend: {
      position: 'right',
      textStyle: {
        color: '233238',
        fontSize: 12,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 165,
      top: 12,
      width: '90%',
      height: '90%',
    },
    width: '100%',
  };

  const chartMatrix = Array.from(chartMap);
  const completeChartMatrix = [...chartMatrix, ['Saldo', chartData.balance]];

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
          ...completeChartMatrix,
        ]}
        options={{
          title: 'Saldo e despesas por categoria',
          sliceVisibilityThreshold: 0.01, // 20%
          ...pieOptions,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
}

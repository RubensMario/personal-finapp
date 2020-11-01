import React from 'react';
import './css/pieChart.css';
import Chart from 'react-google-charts';

export default function PieChart({ chartData }) {
  const { category, value } = chartData;
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
  const categoriesData = [
    ['Mercado', 200],
    // ['Mercado', 1000],
    ['Lazer', 3000],
    ['Saúde', 2000],
    ['Saldo', chartData.balance],
  ];
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

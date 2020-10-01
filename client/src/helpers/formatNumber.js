// Formata números para serem exibidos com o padrão financeiro brasileiro
const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency', // currency, decimal, percent
  currency: 'BRL',
});

function formatNumber(number) {
  const formattedNumber = formatter.format(number);

  return formattedNumber;
}

export { formatNumber };

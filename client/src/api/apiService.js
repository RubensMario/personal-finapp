import axios from 'axios';

const api = axios.create({ baseURL: '/api' });
const RESOURCE = '/transaction';

// period = PERIODS[i].date
async function getTransactionFrom(date) {
  // Retorna o response vindo de transactionsService (backend)
  const response = await api.get(`${RESOURCE}?period=${date}`);

  return response.data;
}

export { getTransactionFrom };

import axios from 'axios';

const api = axios.create({ baseURL: '/api' });
const RESOURCE = '/transaction';

// period = PERIODS[i].date
async function getTransactionsFrom(date) {
  // Retorna o response vindo de transactionsService (backend)
  const response = await api.get(`${RESOURCE}?period=${date}`);

  return response.data;
}

async function deleteTransaction(_id) {
  const response = await api.delete(`${RESOURCE}/${_id}`);

  return;
}

export { getTransactionsFrom, deleteTransaction };

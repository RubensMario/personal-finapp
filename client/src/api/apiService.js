import axios from 'axios';

const api = axios.create({ baseURL: '/api' });
const RESOURCE = '/transaction';

// period = PERIODS[i].date
async function getTransactionsFrom(date) {
  // Retorna o response vindo de transactionsService (backend)
  const response = await api.get(`${RESOURCE}?period=${date}`);

  // .data é um método do axios
  return response.data;
}

async function deleteTransaction(_id) {
  await api.delete(`${RESOURCE}/${_id}`);

  return;
}

async function createTransaction(transaction) {
  const response = await api.post(RESOURCE, transaction);

  return response.data;
}

async function updateTransaction(transaction) {
  const { _id } = transaction;
  const response = await api.put(`${RESOURCE}/${_id}`, transaction);

  return response.data;
}

export {
  getTransactionsFrom,
  deleteTransaction,
  createTransaction,
  updateTransaction,
};

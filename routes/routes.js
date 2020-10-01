const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/', service.getAll);
transactionRouter.put('/:id', service.update);
transactionRouter.post('/', service.create);
transactionRouter.delete('/:id', service.remove);

module.exports = transactionRouter;

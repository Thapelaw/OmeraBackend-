const express = require('express');
const router = express.Router();
const controller = require('../controller/invoice-mail')

router.post('/sendinvoice', controller.createInvoice)

module.exports = router;
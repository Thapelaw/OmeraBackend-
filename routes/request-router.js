const express = require('express');
const router = express.Router();
const controller = require('../controller/requests')


router.post('/makeRequest', controller.createRequest)

router.get('/history/:email', controller.findRequestbyEmail);

router.get('/getAllRequest', controller.getAllReguest);

router.get('/getRequestById/:id', controller.findRequestbyId);

router.put('/update/:id', controller.updatRequest);

module.exports = router;
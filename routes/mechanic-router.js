const express = require('express');
const router = express.Router();
const controller = require('../controller/mechanic')

router.get('/getAllMechanic', controller.getAllReqisteredMechanics)
router.post('/addNewMechanic', controller.addMechanic)
router.delete('/removeMechanic/:id', controller.removeMechanic)
router.put('/updateMechanic/',controller.update)
router.get('/getMechanicById/:id',controller.findMechanicbyId)

module.exports = router;
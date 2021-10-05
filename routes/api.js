const express = require("express")
const router = express.Router()

const { createShift, getAllShifts, deleteShift, updateShift } = require('../controllers/crudShifts')
const { getAllUsers } = require('../controllers/user')

router.post('/createShift/:userId', createShift)
router.post('/deleteShift/:_id', deleteShift)
router.post('/updateShift/:userId', updateShift)
router.get('/getAllShifts', getAllShifts)
router.get('/getAllUsers', getAllUsers)

module.exports = router
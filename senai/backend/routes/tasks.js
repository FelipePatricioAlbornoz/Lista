const express = require('express');
const router = express.Router();
const { getAll, create, update } = require('../controllers/tasksController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAll);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);

module.exports = router;
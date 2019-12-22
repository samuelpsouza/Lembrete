const express = require('express');
const router = express.Router();

const LembreteController = require('../controllers/lembrete');

router.get('/', LembreteController.encontrarTodosOsLembretes);

module.exports = router;
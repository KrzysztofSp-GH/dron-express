const express = require('express');
const router = express.Router();

const kontrolerStron = require('../controllers/pageController');

router.get('/', kontrolerStron.wyswietlStroneGlowna);

router.get('/hardware/:id', kontrolerStron.wyswietlSzczegolySprzetu);

router.get('/prints', kontrolerStron.filtrujIWyswietlWydruki);

module.exports = router;
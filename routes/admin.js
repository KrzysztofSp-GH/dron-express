const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const kontrolerAdmina = require('../controllers/adminController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', kontrolerAdmina.wyswietlPanelAdmina);

router.post('/dodaj-wpis', upload.single('plik_zdjecia'), kontrolerAdmina.odbierzFormularzPost);

module.exports = router;
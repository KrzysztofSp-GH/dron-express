const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const trasyGlowne = require('./routes/index');
const trasyAdmina = require('./routes/admin');

app.use('/', trasyGlowne);
app.use('/admin', trasyAdmina);

app.use((req, res) => {
    res.status(404).render('error', { 
        tytul: 'Nie znaleziono strony', 
        wiadomosc: 'Strona o podanym adresie URL nie istnieje.' 
    });
});

//Dynamiczny port (niezbędne dla render.com)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serwer drona AI działa na http://localhost:${port}`);
});

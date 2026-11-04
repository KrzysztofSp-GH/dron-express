const fs = require('fs');
const path = require('path');
const plikZDanych = require('../data/data.json');

const wyswietlPanelAdmina = (req, res) => {
    res.render('admin', { 
        tytul: 'Aktualności i Panel', 
        aktualnosci: plikZDanych.aktualnosci 
    });
};

const odbierzFormularzPost = (req, res) => {
    const wpisaneHaslo = req.body.haslo;
    const nazwaWpisu = req.body.tytul_zdjecia;

    if (wpisaneHaslo === 'Student123') {
        let sciezkaZdjecia = null;
        if (req.file) {
            sciezkaZdjecia = '/images/' + req.file.filename;
        }

        const nowyWpis = {
            id: Date.now(),
            tytul: nazwaWpisu,
            zdjecie: sciezkaZdjecia
        };

        plikZDanych.aktualnosci.push(nowyWpis);

        fs.writeFileSync(
            path.join(__dirname, '../data/data.json'), 
            JSON.stringify(plikZDanych, null, 2)
        );

        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2 style="color: green;">Dodano nowy wpis!</h2>
                <p><strong>Tytuł:</strong> ${nazwaWpisu}</p>
                <br>
                <a href="/admin">Wróc do aktualności</a> | <a href="/">Wróć na stronę główną</a>
            </div>
        `);
    } else {        
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2 style="color: red;">Błąd autoryzacji! Niepoprawne hasło.</h2>
                <br>
                <a href="/admin">Spróbuj ponownie</a>
            </div>
        `);
    }
};

module.exports = {
    wyswietlPanelAdmina,
    odbierzFormularzPost 
};
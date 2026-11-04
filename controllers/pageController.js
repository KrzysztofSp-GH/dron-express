const plikZDanych = require('../data/data.json');

const wyswietlStroneGlowna = (req, res) => {
    res.render('home', { tytul: 'Praca Magisterska - Dron AI' });
};

const wyswietlSzczegolySprzetu = (req, res) => {
    const idElementu = req.params.id; 
    const wybraneDane = plikZDanych.sprzet[idElementu];

    if (wybraneDane) {
        res.render('hardware', { 
            tytul: wybraneDane.nazwa, 
            sprzet: wybraneDane 
        });
    } else {
        res.status(404).render('home', { 
            tytul: 'Błąd', 
            blad: 'Nie znaleziono takiego komponentu sprzętowego.' 
        });
    }
};

const filtrujIWyswietlWydruki = (req, res) => {
    const szukanaFraza = req.query.nazwa ? req.query.nazwa.toLowerCase() : '';
    const wybranyMaterial = req.query.material || 'Wszystkie';
    const czyTylkoPobieralne = req.query.gotowe === 'on';

    let przefiltrowaneWydruki = plikZDanych.wydruki.filter(wydruk => {
        let pasujeNazwa = wydruk.nazwa.toLowerCase().includes(szukanaFraza);
        let pasujeMaterial = wybranyMaterial === 'Wszystkie' || wydruk.material === wybranyMaterial;
        let pasujeDostepnosc = czyTylkoPobieralne ? wydruk.gotoweDoPobrania === true : true;
        
        return pasujeNazwa && pasujeMaterial && pasujeDostepnosc;
    });

    res.render('prints', {
        tytul: 'Wydruki 3D',
        wydruki: przefiltrowaneWydruki
    });
};

module.exports = {
    wyswietlStroneGlowna,
    wyswietlSzczegolySprzetu,
    filtrujIWyswietlWydruki
};
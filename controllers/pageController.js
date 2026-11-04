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

const wyswietlArdupilot = (req, res) => {
    const daneArdupilot = plikZDanych.oprogramowanie.ardupilot;
    
    res.render('ardupilot', { 
        tytul: 'Oprogramowanie ArduPilot',
        dane: daneArdupilot
    });
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


const wyswietlSzczegolyWydruku = (req, res) => {
    const idWydruku = parseInt(req.params.id); 
    
    const znalezionyWydruk = plikZDanych.wydruki.find(w => w.id === idWydruku);

    if (znalezionyWydruk) {
        res.render('wydruk_detale', { 
            tytul: `Szczegóły wydruku: ${znalezionyWydruk.nazwa}`, 
            wydruk: znalezionyWydruk 
        });
    } else {
        res.status(404).render('error', { 
            tytul: 'Błąd', 
            wiadomosc: 'Nie znaleziono wydruku o podanym ID.' 
        });
    }
};

module.exports = {
    wyswietlStroneGlowna,
    wyswietlSzczegolySprzetu,
    filtrujIWyswietlWydruki,
    wyswietlArdupilot,
    wyswietlSzczegolyWydruku
};
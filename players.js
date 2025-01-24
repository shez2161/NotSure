const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/players', (req, res) => {
    db.all('SELECT * FROM FieldHockeyPlayers', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
        } else {
            res.json(rows);
        }
    });
});

router.post('/players', (req, res) => {
    const { FirstName, SecondName, Position, Appearances, Goals, GreenCards, YellowCards, RedCards, Captaincy } = req.body;
    const query = `INSERT INTO FieldHockeyPlayers (FirstName, SecondName, Position, Appearances, Goals, GreenCards, YellowCards, RedCards, Captaincy) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [FirstName, SecondName, Position, Appearances, Goals, GreenCards, YellowCards, RedCards, Captaincy], function(err) {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, FirstName, SecondName, Position, Appearances, Goals, GreenCards, YellowCards, RedCards, Captaincy });
        }
    });
});

router.put('/players/:id', (req, res) => {
    const { id } = req.params;
    const { FirstName, SecondName, Position, Appearances, Goals, GreenCards, YellowCards, RedCards, Captaincy } = req.body;
    const query = `UPDATE FieldHockeyPlayers SET FirstName = ?, SecondName = ?, Position = ?, Appearances = ?, Goals = ?, GreenCards = ?, YellowCards = ?, RedCards = ?, Captaincy = ? WHERE id = ?`;

    db.run(query, [FirstName, SecondName, Position, Appearances, Goals, GreenCards, YellowCards, RedCards, Captaincy, id], function(err) {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
        } else {
            res.json({ message: 'Player updated', changes: this.changes });
        }
    });
});

router.delete('/players/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM FieldHockeyPlayers WHERE id = ?`;

    db.run(query, [id], function(err) {
        if (err) {
            res.status(500).json({ message: 'Database error', error: err.message });
        } else {
            res.json({ message: 'Player deleted', changes: this.changes });
        }
    });
});

module.exports = router;

const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./fieldhockey.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


const createTableQuery = `
CREATE TABLE IF NOT EXISTS FieldHockeyPlayers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName VARCHAR(50),
    SecondName VARCHAR(50),
    Position VARCHAR(30),
    Appearances INT,
    Goals INT,
    GreenCards INT,
    YellowCards INT,
    RedCards INT,
    Captaincy CHAR(1)
);`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('FieldHockeyPlayers table created or already exists.');
    }
});

module.exports = db;

const Dataabse = require("better-sqlite3");

const db = new Dataabse("courses.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS courses(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    duration INTEGER,
    cover TEXT
    )
    `)
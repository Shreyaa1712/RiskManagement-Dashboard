const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./risk_management.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS PortfolioAsset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT, name TEXT,
      quantity INTEGER, price REAL,
      sector TEXT, risk_score REAL,
      created_at TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS RiskMetric (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      var_95 REAL, var_99 REAL,
      sharpe_ratio REAL, volatility REAL, beta REAL,
      created_at TEXT
    )
  `);
});

// CRUD Endpoints (SQL Used)
app.get('/assets', (req, res) => {
  db.all('SELECT * FROM PortfolioAsset', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});
app.post('/assets', (req, res) => {
  const { symbol, name, quantity, price, sector, risk_score } = req.body;
  db.run(
    `INSERT INTO PortfolioAsset (symbol, name, quantity, price, sector, risk_score, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [symbol, name, quantity, price, sector, risk_score, new Date().toISOString()],
    function (err) {
      if (err) return res.status(500).send(err);
      res.json({ id: this.lastID });
    }
  );
});
app.delete('/assets/:id', (req, res) => {
  db.run(`DELETE FROM PortfolioAsset WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});
// Repeat similar endpoints for RiskMetric...

app.listen(4000, () => console.log('API running on port 4000'));
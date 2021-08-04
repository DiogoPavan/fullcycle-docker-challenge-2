const express = require("express");
const mysql = require('mysql2');
const random = require('random-name')
const config = require('./config');

const app = express();
const connection = mysql.createConnection(config.dbConfig);

app.get('/', async (req, res) => {
  await connection.promise().execute(`INSERT INTO people(name) VALUES("${random()}")`);

  const [rows] = await connection.promise().query('SELECT * FROM `people`');

  res.send(`
    <h1>Full Cycle</h1>
    <ul>${rows.map(row => `<li>${row.name}</li>`).join('')}</ul>
  `);
});

app.listen(config.port, () => console.log('Server Rodando'))

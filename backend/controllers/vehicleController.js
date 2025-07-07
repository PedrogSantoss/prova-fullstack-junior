const pool = require('../database/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { name, plate } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO vehicles (name, plate) VALUES ($1, $2) RETURNING *',
      [name, plate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// continue com update, archive, unarchive, remove...

module.exports = {
  listarVeiculos: (req, res) => { /* ... */ },
  cadastrarVeiculo: (req, res) => { /* ... */ },
  editarVeiculo: (req, res) => { /* ... */ },
  excluirVeiculo: (req, res) => { /* ... */ },
};
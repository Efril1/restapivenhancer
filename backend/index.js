import express from 'express';
import cors from 'cors';
import pkg from 'pg'
import http from 'http';
import { Server } from 'socket.io';

//for postgresql
const { Pool } = pkg;
const app = express();




const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  
});
//this part is for messages
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', async (msg) => {
    io.emit('chat message', msg);

    const text = 'INSERT INTO messages(content) VALUES($1)';
    const values = [msg];

    try {
      await pool.query(text, values);
      console.log('message inserted');
    } catch (err) {
      console.log(err.stack);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



//postgresql connect
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'cenk',
  port: 5432,
});

//port
const PORT = 8080;

app.use(cors());
app.use(express.json());

//users get
 app.get('/api/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  //users post
  app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  try {
    const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
  //users delete
  app.delete('/api/users/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [userId]);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
});
//users put
app.put('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  try {
    await pool.query('UPDATE users SET name = $1 WHERE id = $2', [name, userId]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

httpServer.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
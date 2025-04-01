const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'starbucks',
  password: 'changeme',
  port: 5432,
});

// Secret for JWT signing (store this in an environment variable in production)
// this is insecure
const JWT_SECRET = 'j9RQzElkF4UcT61EMjCvFM5ppaFrttBM8C7SzfPVuSMT0SQQdQEK1Lb0iuRwrF0B';

// -------------------------
// Index endpoint
// -------------------------
app.get('/', async (req, res) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ message: `hello ${decoded.username}! 🔥`, username: decoded.username });
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
    }

    res.status(200).json({ message: 'hello world! 🔥' });
  });

// -------------------------
// Health Check Endpoint
// -------------------------
app.get('/health', async (req, res) => {
    try {
      const dbCheck = await pool.query('SELECT 1');
      if (dbCheck) {
        res.status(200).json({ status: 'ok', db: 'connected' });
      } else {
        res.status(500).json({ status: 'error', db: 'not responding' });
      }
    } catch (error) {
      console.error('Health check error:', error);
      res.status(500).json({ status: 'error', db: 'connection failed' });
    }
});

// -------------------------
// Register Endpoint
// -------------------------
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User created successfully.', user: result.rows[0] });
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// -------------------------
// Login Endpoint
// -------------------------
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// -------------------------
// Middleware to Verify JWT Token
// -------------------------
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(403).json({ error: 'Forbidden: No token provided.' });
  }
}

// -------------------------
// Protected Route Example: Write Data
// -------------------------
app.post('/data', verifyToken, async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data is required.' });
    }

    // Save the provided data associated with the logged in user
    const result = await pool.query(
      'INSERT INTO data (user_id, content) VALUES ($1, $2) RETURNING id, content',
      [req.user.id, data]
    );

    res.status(201).json({ message: 'Data saved successfully.', data: result.rows[0] });
  } catch (error) {
    console.error('Error in /data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// main application flow
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

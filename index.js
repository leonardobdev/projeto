// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Use environment variable for port or default to 5000
const MONGODB_URI = 'mongodb://<username>:<password>@<hostname>:<port>/<database>?authSource=<admin>&ssl=true';
// Connect to MongoDB Atlas (replace with your actual connection string)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// Define Mongoose Schemas
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Make name mandatory
  email: { type: String, required: true, unique: true }, // Make email mandatory and unique
});

const User = mongoose.model('User', userSchema);

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Make name mandatory for products
  descricao: String, // Optional description for products
  preco: { type: Number, required: true }, // Make price mandatory for products
});

const Produto = mongoose.model('Produto', produtoSchema);

// Routes
app.post('/api/cadastrar', async (req, res) => {
  const { nome, email } = req.body;

  try {
    // Validate email format (optional, you can add an email validation library)
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   return res.status(400).json({ message: 'Invalid email format' });
    // }

    const newUser = new User({ nome, email });
    await newUser.save();
    res.json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
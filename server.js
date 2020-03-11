const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();
app.use(express.json({ extended: false }));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contacts', require('./src/routes/contacts'));

app.listen(5000, () => console.log('Express server is running on port 5000'));

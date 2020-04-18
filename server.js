const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./config/db');

connectDB();
app.use(express.json({ extended: false }));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contacts', require('./src/routes/contacts'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(5000, () => console.log('Express server is running on port 5000'));

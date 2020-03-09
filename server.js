const express = require('express');
const app = express();

app.use('/api/users', require('./src/routes/users'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contacts', require('./src/routes/contacts'));

app.listen(3000, () => console.log('Express server is running on port 3000'));

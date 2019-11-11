const express = require('express');
require('./db/mongoose');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRoutes);
app.use(taskRoutes);


app.listen(port, () => {
    console.log('Server is up on port' + port);
    
})
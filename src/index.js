const express = require('express');
require('./db/mongoose');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//  if(req.method === 'GET') {
//         res.send('Get req disabled')
//  } else {
//         next();
//  }

// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon.')
// })



app.use(express.json())
app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
    console.log('Server is up on port' + port);
    
})
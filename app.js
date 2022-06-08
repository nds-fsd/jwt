const express = require('express');
const { authRouter, configSecurity } = require('./src/controllers/jwt');
const users = require('./src/controllers/users');
const app = express();
const port = 3001;

app.use(express.json());
configSecurity(app);
app.use('/', authRouter);
app.use('/user', users);

app.listen(port, '', () => {
  console.log(`App is running on port ${port}`);
});
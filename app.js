const express = require('express');
const { authRouter, configSecurity } = require('./src/routes/jwt');
const users = require('./src/routes/users');
const app = express();
const port = 8080;

app.use(express.json());
configSecurity(app);
app.use('/', authRouter);
app.use('/user', users);

app.listen(port, '', () => {
  console.log(`App is running on port ${port}`);
});
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
const createPoolRoute = require('./routes/createPool');
const getPoolsRoute = require('./routes/getPools');
require('dotenv').config();
app.use(express.json());

app.use(cors());
app.use('/api/createPool', createPoolRoute);
app.use('/api/getPools', getPoolsRoute);
app.listen(PORT, () => {
  console.log('server is up and running on port :', PORT);
});

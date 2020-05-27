const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  res
    .send('Hello, apps');
})

app.listen(8000, () => {
  console.log('Server is running on PORT 8000');
})
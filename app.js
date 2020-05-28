const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const playstore = require('./playstore.js');

app.get('/apps', (req, res) => {
  let { sort, genres } = req.query;
  let results = playstore;

  // validate generes
  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res
        .status(400)
        .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
    }
  }

  // validate sort
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be rating or app');
    }
  }

  // search by genres
  if (genres) {
    results = playstore
      .filter(app =>
        app
          .Genres
          .includes(genres))
  }

  // sort results if sort param selected
  if (sort) {
    if (sort === 'App') {
      results
        .sort((a, b) => {
          return a[sort] > b[sort]
            ? 1
            : a[sort] < b[sort]
              ? -1
              : 0;
        })
    } else {
      results
        .sort((a, b) => {
          return a[sort] < b[sort]
            ? 1
            : a[sort] > b[sort]
              ? -1
              : 0;
        })
    }
  }

  // if no query params return all apps
  res
    .json(results);
})

app.listen(8000, () => {
  console.log('Server is running on PORT 8000');
})
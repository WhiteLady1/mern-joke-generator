const express = require('express');
const bodyParser = require('body-parser');

const jokesRoutes = require('./routes/jokes-routes');
const HttpError = require('./models/http-error');

const PORT = 5050;

const app = express();

app.use(bodyParser.json());

app.use('/api/jokes', jokesRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(PORT);

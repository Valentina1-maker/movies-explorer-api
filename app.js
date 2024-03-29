const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const { PORT = 3001 } = process.env;
const { MONGO_ADRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();
app.use(express.json());

const { errors: celebrateError } = require('celebrate');
const CommonError = require('./errors/CommonError');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

mongoose.connect(MONGO_ADRESS);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/auth'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use((req, res, next) => {
  next(new CommonError(404, 'Страница не найдена'));
});

app.use(errorLogger);

app.use(celebrateError());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});

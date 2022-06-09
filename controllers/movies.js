const CommonError = require('../errors/CommonError');
const Movie = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send({ movie });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new CommonError(400, 'Переданы некорректные данные'));
      } else {
        next(new Error());
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new CommonError(404, 'Фильма с таким id не существует')))
    .then((movie) => {
      if (String(movie.owner._id) !== req.user._id) {
        return next(new CommonError(403, 'Этот фильм не Ваш и удалить его не можете'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм успешно удален' }));
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new CommonError(400, 'Переданы некорректные данные'));
      } else {
        next(new Error());
      }
    });
};

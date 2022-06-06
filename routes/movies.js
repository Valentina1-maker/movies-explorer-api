const router = require('express').Router();
const { getMovies, createMovie, deleteMovieByID } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovie);

router.delete('/movies/_id', deleteMovieByID);

module.exports = router;

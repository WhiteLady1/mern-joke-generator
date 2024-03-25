const express = require('express');

const jokesControllers = require('../controllers/jokes-controller');

const router = express.Router();

router.get('/', jokesControllers.getAllJokes);

router.get('/:jokeId', jokesControllers.getJokeById);

router.post('/', jokesControllers.createJokes);

router.patch('/:jokeId', jokesControllers.updateJoke);

router.delete('/:jokeId', jokesControllers.deleteJoke);

module.exports = router;

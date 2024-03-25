const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_JOKES = [
  {
    id: '1',
    type: "general",
    setup: "What did the fish say when it hit the wall?",
    punchline: "Dam."
  },
  {
    id: '2',
    type: "general",
    setup: "How do you make a tissue dance?",
    punchline: "You put a little boogie on it."
  },
  {
    id: '3',
    type: "general",
    setup: "What's Forrest Gump's password?",
    punchline: "1Forrest1"
  }
];

const getAllJokes =  (req, res, next) => {
  res.json({ DUMMY_JOKES });
};

const getJokeById = (req, res, next) => {
  const jokeId = req.params.jokeId;
  const joke = DUMMY_JOKES.find(item => item.id === jokeId);

  if (!joke) {
    throw new HttpError('Could not find a joke fot the provided id!', 404);
    // throw error; // in a synchronous code
    // return next(error); // in asynchronous code
  }
  res.json({ joke }); //{joke} is the same as {joke: joke}
};

const createJokes = (req, res, next) => {
  const { type, setup, punchline } = req.body;
  const createdJoke = {
    id: uuidv4(),
    type: type,
    setup: setup,
    punchline: punchline
  };
  DUMMY_JOKES.push(createdJoke);

  res.status(201).json({ joke: createdJoke });
};

const updateJoke = (req, res, next) => {
  const { type, setup, punchline } = req.body;
  const jokeId = req.params.jokeId;
  const updatedJoke = { ...DUMMY_JOKES.find(joke => joke.id === jokeId)};
  const jokeIndex = DUMMY_JOKES.findIndex(joke => joke.id === jokeId);

  updatedJoke.type = type;
  updatedJoke.setup = setup;
  updatedJoke.punchline = punchline;

  DUMMY_JOKES[jokeIndex] = updatedJoke;

  res.status(200).json({ jokes: DUMMY_JOKES })
};

const deleteJoke = (req, res, next) => {

};

exports.getAllJokes = getAllJokes;
exports.getJokeById = getJokeById;
exports.createJokes = createJokes;
exports.updateJoke = updateJoke;
exports.deleteJoke = deleteJoke;

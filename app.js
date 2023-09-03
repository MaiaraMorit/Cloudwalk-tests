const express = require('express')
const app = express()
const matchesControllers = require('./controller/matches.Controller');

app.use(express.json());

app.get('/matches', matchesControllers.getMatches);

module.exports = app;
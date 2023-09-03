const matchesCallAPI = require('../CallsAPI/matches.API');

const getMatches = async () => {
    const matches = await matchesCallAPI.getMatchesFromAPI();
    return matches
};

module.exports = { getMatches };
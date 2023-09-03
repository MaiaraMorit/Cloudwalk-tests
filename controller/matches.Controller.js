const matchesService = require('../service/matches.Service');

const getMatches = async (_req, res) => {
    const matches = await matchesService.getMatches();
    return res.status(200).json(matches);
};

module.exports = { getMatches };
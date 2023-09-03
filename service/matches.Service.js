const matchesCallAPI = require('../CallsAPI/matches.API');

const getPlayerNameFromRawName = (player)=> {
    const splitPlayer = player.split(": ");
    return splitPlayer.length > 1 ? splitPlayer[1] : player;
}

const getPlayerNameFromClientInfo = (str) => {
    const splitStr = str.split("\\");
    const nameIndex = splitStr.indexOf("n") + 2;
    return splitStr[nameIndex];
};

const getMatches = async () => {
    const data = await matchesCallAPI.getMatchesFromAPI();
    const lines = data.split('\n');
    const games = [];
    let currentGame = null;

    lines.forEach((line) => {
        if (line.indexOf('InitGame') !== -1) {
            if (currentGame) {
                games.push(currentGame);
            }
            currentGame = {
                total_kills: 0,
                players: [],
                kills: {}
            }

        } else if (line.indexOf('Kill') !== -1) {
            const regex = /:\s(.*)\skilled\s(.*)\sby\s[a-zA-Z_]+/g;
            const match = regex.exec(line);
            const killerRawName = match[1];
            const killedRawName = match[2];
            const killer = getPlayerNameFromRawName(killerRawName);
            const killed = getPlayerNameFromRawName(killedRawName);
            const playerNotKilledYourself = killer !== killed;
            
            if (killer !== '<world>') {
                if (playerNotKilledYourself) {
                    currentGame.kills[killer]++;
                } else if (!playerNotKilledYourself) {
                    currentGame.kills[killer]--;
                }
            } else {
                currentGame.kills[killed]--;
            }
            currentGame.total_kills++;
        } else if (line.indexOf('ClientUserinfoChanged') !== -1) {
            const playerName = getPlayerNameFromClientInfo(line);
            if (currentGame.players.indexOf(playerName) === -1) {
                currentGame.players.push(playerName);
            }
            if (!currentGame.kills[playerName]) {
                currentGame.kills[playerName] = 0;
            }
        }
    });

    games.push(currentGame);

    const rawReport = games.map((game, index) => {
        return {
            ["game_" + (index + 1)]: { ...game },
        }
    }) 
    
    // const report = JSON.stringify(rawReport, null, 2); // melhor vizualização do print no terminal
    // console.log(rawReport);
    return rawReport;

};

module.exports = { getMatches };
# Game Match Statistics API
This project provides an API that offers detailed information about game matches, including various data subclasses. You will be able to access information about each match, including the total kills per match, as well as the individual kills count per user.

### 1.Initial Setup
- Environment setup in Node.js version 18.17.1.
- Installation of Express.js framework version 4.18.2.
- Server port configuration is set to listen on port 3000.

### 2.Contracts
- To access the list of matches, it is necessary to make a GET request to the route '/matches'.
- Method: GET
- URL: http://localhost:3000/matches
- The route '/matches' should return a list of matches.
### Example:
```
{
    "game_21": {
      "total_kills": 131,
      "players": [
        "Dono da Bola",
        "Isgalamido",
        "Zeh",
        "Oootsimo",
        "Assasinu Credi",
        "Mal"
      ],
      "kills": {
        "Dono da Bola": 16,
        "Zeh": 21,
        "Isgalamido": 19,
        "Assasinu Credi": 22,
        "Oootsimo": 24,
        "Mal": 12
      }
    }
}
```
###  3.Tests
- To run the integration test, you need to use the command `npm run test`


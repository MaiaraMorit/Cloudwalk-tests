const request = require('supertest');
const app = require('../../app');
const fs = require('fs');
const fetchMock = require('jest-fetch-mock');

jest.mock('../../CallsAPI/matches.API.js'); 

describe('Test matches List', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('Should return data from the external API - integration test', async () => {
      // given 
        fs.readFile('./tests/mocks/example.log', 'utf8', (err, data) => {
            if (err) {
                console.error('Error on read file:', err);
                return;
            }
            // console.log('DATA TEST:', data);
            fetchMock.mockOnce(data);

            const expected = 	[{
              "game_1": {
                "total_kills": 11,
                "players": [
                  "Isgalamido",
                  "Dono da Bola",
                  "Mocinha"
                ],
                "kills": {
                  "Isgalamido": -9,
                  "Dono da Bola": 0,
                  "Mocinha": 0
                }
              }
            }]
          
            // when
            const response = request(app).get('/matches').then((response) => {
            // then
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(expected);
            });
        });
      });
});
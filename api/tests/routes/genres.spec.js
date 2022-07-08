/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'wohoooooooo',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /genres', () => {
    it('should get 200', () =>
      agent.get('/genres').expect(200)
    );
    it("should get at least 19 genres in an array", () =>
      agent
        .get("/genres")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body.length).to.be.at.least(19);
        }));
  });
});

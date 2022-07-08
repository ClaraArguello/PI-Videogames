const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', (done) => {
        Videogame.create({ name: 'Super Mario Bros' , description: 'wohoooooooooo'})
        .then(() => done())
        .catch(() => done(new Error('Name and description cannot be null')))
      });
      it('should create a videogame with their respective values', async () => {
        const v1 = await Videogame.create({ name: 'Pacman' , description: 'ñam ñam ñam'})
        const idvg = v1.toJSON().id;
        expect(v1.dataValues).to.deep.equal({ 
          createdInDb: true,
          description: "ñam ñam ñam",
          id: idvg,
          image: null,
          name: "Pacman",
          platforms: null,
          rating: null,
          released: null,})
      });
    });
  });
});

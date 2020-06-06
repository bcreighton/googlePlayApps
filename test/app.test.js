const { expect } = require('chai');
const app = require('../app');
const supertest = require('supertest');

describe('Google Play Store Apps Test', () => {
  it('should return 200 without parameters', () => {
    return supertest(app)
      .get('/apps')
      .query({})
      .expect(200)
  })

  it('should return an array of all apps', () => {
    return supertest(app)
      .get('/apps')
      .query({})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.at.least(1)

        const app = res.body[0]

        expect(app).to.include.all.keys(
          "App", "Category", "Rating", "Reviews", "Size", "Installs", "Type", "Price", "Content Rating", "Genres", "Last Updated", "Current Ver", "Android Ver"
        )
      })
  })

  it('should return 400 if genres is not one of Action, Puzzle, Strategy, Casual, Arcade, or Card', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'action' })
      .expect(400, 'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card')
  })

  it('should return 400 if sort is not one of Rating or App', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'rating' })
      .expect(400, 'Sort must be Rating or App')
  })

  it('should ONLY return apps with Action genre', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Action' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.at.least(1)

        let filtered = true;

        let i = 0;

        while (i < res.body.length) {
          const currentApp = res.body[i];

          if (!currentApp.Genres.includes('Action')) {
            filtered = false;
            break;
          }

          i++
        }

        expect(filtered).to.be.true;
      })
  })

  it('should return sorted by App name', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.at.least(1)

        let sorted = true;

        let i = 0;

        while (i < res.body.length - 1) {
          const initialApp = res.body[i];
          const compareApp = res.body[i + 1];

          if (compareApp.App < initialApp.App) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      })
  })

  it('should return sorted apps by Rating within the Casual genres', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'Rating', genres: 'Casual' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf.at.least(1)

        let filtered = true, sorted = true;
        let i = 0, n = 0;

        while (i < res.body.length) {
          const currentApp = res.body[i]

          if (!currentApp.Genres.includes('Casual')) {
            filtered = false;
            break;
          }
          i++
        }

        while (n < res.body.legnth - 1) {
          const initialApp = res.body[n]
          const compareApp = res.body[n - 1]

          if (compareApp.Rating < initialApp.Rating) {
            sorted = false;
            break;
          }
          n++
        }

        expect(filtered, sorted).to.be.true;

      })
  })
})
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
})
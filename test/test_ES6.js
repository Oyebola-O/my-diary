import chai from 'chai';
import { expect } from 'chai';
import app from '../server';

chai.use(require('chai-http'));


// Simple test to check if mocha and travis were setup well
function ret() {
  return 1;
}

describe('Mocha and Travis are working', () => {
  it('is a simple test that checks if moha and travis were setup properly', () => {
    expect(ret()).to.equal(1);
  });
});

// POST an enrty
describe('Create an entry', () => {
  it('Should create an entry', () => chai.request(app)
    .post('/api/v1/entries')
    .send({ title: 'Title', text: 'Text' })
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('An entry has been created');
      expect(res.body.details.title).to.equal('Title');
      expect(res.body.details.text).to.equal('Text');
    }));
});


// Get all entries
describe('Get all entries', () => {
  it('Gets all the entries in the database', () => chai.request(app)
    .get('/api/v1/entries')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body[0].id).to.equal(0);
      expect(res.body[1].id).to.equal(1);
    }));
});

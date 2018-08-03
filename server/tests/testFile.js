import chai from 'chai';
import { expect } from 'chai';
import app from '../controllers/server';
chai.use(require('chai-http'));
const testToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcm5hbWUxIn0sImlhdCI6MTUzMzI1NTgzM30.ykAk2kXsTdERJ3fTFirIkncX35P-bePAdisqRH0jnMw';


// Getting entries
describe('test Get entry endpoints', () => {
  // Get all entries
  it('should get all entries', (done) => {
    chai.request(app)
    .get('/entries')
    .set('Authorization', testToken)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.length).to.not.equal(0);
      done();
    });
  });
  // Get single entry
  it('should get a single entries', (done) => {
    chai.request(app)
    .get('/entries/4')
    .set('Authorization', testToken)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(4);
      done();
    });
  });
});


// Edit entries
describe('test if user can edit entries', () => {
  it('should edit an entry', (done) => {
    chai.request(app)
      .put('/entries/10')
      .set('Authorization', testToken)
      .send({ title: 'New title', text: 'New text' })
      .end(function (err, res) {
         expect(res).to.have.status(200);
         expect(res.body.message).to.equal('Entry updated');
         done();
      });
  });
});


// Create entries
describe('test if user can create entries', () => {
  it('should create an entry', (done) => {
    chai.request(app)
      .post('/entries')
      .set('Authorization', testToken)
      .send({ title: 'New entry', text: 'New text' })
      .end(function (err, res) {
         expect(res).to.have.status(201);
         expect(res.body.details.title).to.equal('New entry');
         done();
      });
  });
});

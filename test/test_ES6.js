import chai from 'chai';
import { expect } from 'chai';
import app from '../server';

chai.use(require('chai-http'));


// POST an enrty
describe('post entry', () => {
  it('should create an entry', () => chai.request(app)
    .post('/api/v1/entries')
    .send({ title: 'Title', text: 'Text' })
    .then((res) => {
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal('An entry has been created');
      expect(res.body.details.title).to.equal('Title');
      expect(res.body.details.text).to.equal('Text');
    }));
});


// Get all entries
describe('get all entries', () => {
  it('should get all the entries in the database for a user', () => chai.request(app)
    .get('/api/v1/entries')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body[0].id).to.equal(0);
      expect(res.body[1].id).to.equal(1);
    }));
});


// Get a single entry
describe('get single entry', () => {
  it('should get a single entry based on it\'s id', () => chai.request(app)
    .get('/api/v1/entries/1')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(1);
    }));
});


// Get a single entry with id outside range, this should fail
describe('get entry that doesn\'t exist', () => {
  it('should get a single entry based on it\'s id that does not exist', () => chai.request(app)
    .get('/api/v1/entries/5')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal("Error, there's no entry with that id");
    }));
});


// Edit an entry
describe('put entry', () => {
  it('should edit an entry using it\'s id', () => chai.request(app)
    .put('/api/v1/entries/1')
    .send({ title: 'Changed title', text: 'Changed text' })
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.title).to.equal('Changed title');
      expect(res.body.text).to.equal('Changed text');
    }));
});


// Edit an entry that's not in the list
describe('put entry that doesn\'t exist', () => {
  it('should edit an entry based on it\'s id that does not exist', () => chai.request(app)
    .put('/api/v1/entries/5')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal("Error, there's no entry with that id");
    }));
});


// Test login with correct username and password
describe('test correct user details', () => {
  it('should test login api with correct details', () => chai.request(app)
    .post('/api/v1/login')
    .send({ username: 'username1', password: 'password1' })
    .then((res) => {
      expect(res).to.have.status(200);
      console.log(res.body);
    }));
});


// Test new user
describe('test if new user can create account', () => {
  it('should test if a user can create an account', () => chai.request(app)
    .post('/api/v1/register')
    .send({ username: 'username5', password: 'password5' ,name: 'user5'})
    .then((res) => {
      expect(res).to.have.status(200);
      console.log(res.body);
    }));
});

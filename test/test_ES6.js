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
    }));
});

// Get all entries
describe('get all entries', () => {
  it('should get all the entries in the database for a user', () => chai.request(app)
    .get('/api/v1/entries')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.length).to.not.equal(0);
    }));
});

// Get a single entry
describe('get single entry', () => {
  it('should get a single entry based on it\'s id', () => chai.request(app)
    .get('/api/v1/entries/1')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.length).to.equal(1);
    }));
});

// Get a single entry with id outside range, this should fail
describe('get entry that doesn\'t exist', () => {
  it('should get a single entry based on it\'s id that does not exist', () => chai.request(app)
    .get('/api/v1/entries/5')
    .then((res) => {
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal("You don't have an entry with that id");
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
describe('test correct login details', () => {
  it('should test login api with correct details', () => chai.request(app)
    .post('/api/v1/login')
    .send({ username: 'username1', password: 'password1' })
    .then((res) => {
      expect(res.body.message).to.equal("done");
    }));
});

// Test login with wrong username and password
describe('test wrong login details', () => {
  it('should test login api with wrong details', () => chai.request(app)
    .post('/api/v1/login')
    .send({ username: 'username1', password: 'wrongpassword' })
    .then((res) => {
      expect(res.body.message).to.equal("Details are not correct");
    }));
});

// Test register with new user
describe('test if new user can create account', () => {
  it('should test if a new user can create an account', () => chai.request(app)
    .post('/api/v1/register')
    .send({ username: 'username11', password: 'password11' ,name: 'user11'})
    .then((res) => {
      expect(res.body.message).to.equal("An account has been created");
    }));
});

// Test register with present user
describe('test if current user can create account', () => {
  it('should test if a current user can create an account', () => chai.request(app)
    .post('/api/v1/register')
    .send({ username: 'username1', password: 'password1' ,name: 'user1'})
    .then((res) => {
      expect(res.body.message).to.equal("This username is already taken");
    }));
});

import chai from 'chai';
import { expect } from 'chai';
import app from '../controllers/server';
chai.use(require('chai-http'));


describe('test', () => {
  it('should do', () => {
  chai.request(app)
    .put('/auth/login')
    .send({ username: 'username1', password: 'password1' })
    .then(function (res) {
       expect(res).to.have.status(200);
    })
    .catch(function (err) {
       throw err;
    });
  })
});

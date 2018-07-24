// import should from 'should';
// import assert from 'assert';
import request from 'supertest';
import {expect} from 'chai';
import app from '../server';

function ret() {
  return 1;
}

describe('Mocha and Travis are working', () => {
  it('is a simple test that checks if moha and travis were setup properly', () => {
    expect(ret()).to.equal(1);
  });
});


// Post tes to create and entry, POST /entries



// describe('Fetch all', () => {
//   it('Should fetch all entries', () => {
//     request(app)
//       .get('/api/v1/users/entries')
//       .expect(200, done);
//   });
// });

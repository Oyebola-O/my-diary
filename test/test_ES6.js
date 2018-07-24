// import should from 'should';
// import assert from 'assert';
import request from 'supertest';
import {expect} from 'chai';
import app from '../server';

function ret() {
  return 1;
}

describe('true', () => {
  it('is true', () => {
    expect(ret()).to.equal(1);
  });
});

// describe('Fetch all', () => {
//   it('Should fetch all entries', () => {
//     request(app)
//       .get('/api/v1/users/entries')
//       .expect(200, done);
//   });
// });

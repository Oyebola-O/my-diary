import chai from 'chai';
import {expect} from 'chai';
chai.use(require('chai-http'));
import app from '../server';


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
describe("Create an entry", () => {
  it("Should create an entry", () => {
    return chai.request(app)
      .post('/api/v1/entries')
      .send({title: "Title", text: "Text"})
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("An entry has been created");
        expect(res.body.details.title).to.equal("Title");
        expect(res.body.details.text).to.equal("Text");
      });
  });
});

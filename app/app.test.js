var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);
var expect = chai.expect;


describe('Application', function() {
	it('should be true', function() {
		expect(true).to.be.true;
	});
});

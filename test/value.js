var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var moment = require('moment');
var Value = require('../src/value');

// Times to play with
var now = moment();
var tomorrow = moment(now).add(1, 'day');

describe('Value', function() {
  describe('#get()', function() {
    it('should return the value that was set', function() {
      var value = new Value('test', tomorrow);
      return expect(value.get()).to.equal('test');
    });
  });

  describe('#getCreated()', function() {
    it('should return the time that this value was created', function() {
      var value = new Value('test', tomorrow);
      return expect(value.getCreated()).to.equal(tomorrow);
    });
  });

  describe('#getExpireAt()', function() {
    it('should return the expires value that was set', function() {
      var value = new Value('test', now);
      value.setExpireTTL(300);
      var expireMoment = moment(now).add(300, 'seconds');
      return expect(value.getExpireAt().isSame(expireMoment)).to.be.true;
    });

    it('should return undefined if expires was not set', function() {
      var value = new Value('test');
      return expect(value.getExpireAt()).to.be.undefined;
    });
  });

  describe('#getExpireTTL()', function() {
    it('should return the expire ttl value that was set', function() {
      var value = new Value('test', now);
      value.setExpireTTL(300);
      return expect(value.getExpireTTL()).to.equal(300);
    });

    it('should return undefined if expires was not set', function() {
      var value = new Value('test');
      return expect(value.getExpireTTL()).to.be.undefined;
    });
  });

  describe('#getStaleAt()', function() {
    it('should return the stale value that was set', function() {
      var value = new Value('test', now);
      value.setStaleTTL(300);
      var staleMoment = moment(now).add(300, 'seconds');
      return expect(value.getStaleAt().isSame(staleMoment)).to.be.true;
    });

    it('should return undefined if stale was not set', function() {
      var value = new Value('test');
      return expect(value.getStaleAt()).to.be.undefined;
    });
  });

  describe('#getStaleTTL()', function() {
    it('should return the stale ttl value that was set', function() {
      var value = new Value('test', now);
      value.setStaleTTL(300);
      return expect(value.getStaleTTL()).to.equal(300);
    });

    it('should return undefined if stale was not set', function() {
      var value = new Value('test');
      return expect(value.getStaleTTL()).to.be.undefined;
    });
  });

  describe('#set()', function() {
    it('should change the value', function() {
      var value = new Value('test', tomorrow);
      expect(value.get()).to.equal('test');
      value.set('test2');
      return expect(value.get()).to.equal('test2');
    });
  });

  describe('#expired()', function() {
    it('should return false for an object with no expire ttl', function() {
      var value = new Value('test');
      return expect(value.expired()).to.be.false;
    });

    it('should return false for an object with only stale ttl', function() {
      var value = new Value('test');
      value.setStaleTTL(0);
      return expect(value.expired()).to.be.false;
    });

    it('should return false for an object that is not expired', function() {
      var value = new Value('test');
      value.setExpireTTL(300);
      return expect(value.expired()).to.be.false;
    });

    it('should return true for an object that is expired', function() {
      var value = new Value('test');
      value.setExpireTTL(0);
      return expect(value.expired()).to.be.true;
    });
  });

  describe('#stale()', function() {
    it('should return false for an object with no ttl', function() {
      var value = new Value('test');
      return expect(value.stale()).to.be.false;
    });

    it('should return false for an object with only expire ttl', function() {
      var value = new Value('test');
      value.setExpireTTL(0);
      return expect(value.stale()).to.be.false;
    });

    it('should return false for an object that is not stale', function() {
      var value = new Value('test');
      value.setStaleTTL(300);
      return expect(value.stale()).to.be.false;
    });

    it('should return true for an object that is stale', function() {
      var value = new Value('test');
      value.setStaleTTL(0);
      return expect(value.stale()).to.be.true;
    });
  });

  describe('#setExpireTTL()', function() {
    it('should change the expires', function() {
      var value = new Value('test');
      expect(value.expired()).to.be.false;
      value.setExpireTTL(0);
      expect(value.expired()).to.be.true;
    });

    it('passing undefined should not expire the object', function() {
      var value = new Value('test');
      expect(value.expired()).to.be.false;
      value.setExpireTTL(undefined);
      expect(value.expired()).to.be.false;
    });
  });

  describe('#setStaleTTL()', function() {
    it('should change the stale', function() {
      var value = new Value('test');
      expect(value.stale()).to.be.false;
      value.setStaleTTL(0);
      expect(value.stale()).to.be.true;
    });

    it('passing undefined should not stale the object', function() {
      var value = new Value('test');
      expect(value.stale()).to.be.false;
      value.setStaleTTL(undefined);
      expect(value.stale()).to.be.false;
    });
  });
});

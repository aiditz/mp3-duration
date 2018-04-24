var assert = require('assert'),
  mp3Duration = require('../index.js'),
  fs = require('fs');

describe('mp3Duration', function() {

  it('returns a correct value for VBR duration', function(done) {
    mp3Duration('./tests/demo - vbr.mp3', function(err, {duration}) {
      if (err) console.log(err.stack);
      assert.equal(err, null, (err || {}).message);
      assert.equal(duration, 285.727, 'Length not as expected');
      done();
    });
  });

  it('returns a correct value for CBR duration without estimate', function(done) {
    mp3Duration('./tests/demo - cbr.mp3', function(err, {duration}) {
      assert.equal(err, null, (err || {}).message);
      assert.equal(duration, 285.78, 'Length not as expected');
      done();
    });
  });

  it('returns a correct value for VBR duration when passing a buffer instead of a filename', function(done) {
    const buffer = fs.readFileSync('./tests/demo - vbr.mp3');

    mp3Duration(buffer, function(err, {duration}) {
      if (err) console.log(err.stack);
      assert.equal(err, null, (err || {}).message);
      assert.equal(duration, 285.727, 'Length not as expected');
      done();
    });
  });

  it('return a correct value for CBR duration without estimate when passing a buffer instead of a filename', function(done) {
    const buffer = fs.readFileSync('./tests/demo - cbr.mp3');

    mp3Duration(buffer, function(err, {duration}) {
      assert.equal(err, null, (err || {}).message);
      assert.equal(duration, 285.78, 'Length not as expected');
      done();
    });
  });

  it('return a correct bitrate for CBR', function(done) {
    const buffer = fs.readFileSync('./tests/overwerk - reflect.mp3');

    mp3Duration(buffer, function(err, {bitRate}) {
      assert.equal(err, null, (err || {}).message);
      assert.equal(bitRate, 320, 'Bitrate not as expected');
      done();
    });
  });

  it('return a correct bitrate for VBR', function(done) {
    const buffer = fs.readFileSync('./tests/demo - vbr.mp3');

    mp3Duration(buffer, function(err, {bitRate}) {
      assert.equal(err, null, (err || {}).message);
      assert.equal(bitRate, 188, 'Bitrate not as expected');
      done();
    });
  });

});

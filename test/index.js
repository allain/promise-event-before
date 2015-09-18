var test = require('blue-tape');

var eventBefore = require('..');

var EventEmitter = require('events').EventEmitter;

test('rejects if after timeout', function(t) {
  var emitter = new EventEmitter();
  return eventBefore(emitter, 'ping', 50).catch(function(err) {
    t.ok(err instanceof Error);
  });
});

test('resolves if before timeout', function(t) {
  var emitter = new EventEmitter();

  setTimeout(function() {
    emitter.emit('ping', 'emitted');
  }, 10);

  return eventBefore(emitter, 'ping', 50).then(function(value) {
    t.equal(value, 'emitted');
  });
});
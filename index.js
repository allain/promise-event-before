var Promise = require('native-promise-only');

module.exports = function eventBefore(emitter, eventName, timeout) {
  if (!emitter || typeof emitter.once !== 'function') return Promise.reject(new Error('emitter is not an EventEmitter'));
  if (typeof eventName !== 'string') return Promise.reject(new Error('eventName must be a string'));
  if (typeof timeout !== 'number') return Promise.reject(new Error('timeout must be given'));

  return new Promise(function(resolve, reject) {
    emitter.once(eventName, callback);

    var timeoutId = setTimeout(function() {
      emitter.removeListener(eventName, callback);
      reject(new Error('timeout'));
    }, timeout);

    function callback(value) {
      clearInterval(timeoutId);
      emitter.removeListener(eventName, callback);
      resolve(value);
    }
  });
};
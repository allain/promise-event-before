# promise-event-before

A tool that returns a promise that resolves if an EventEmitter emits an event before the given timeout

## Installation

```bash
npm install promise-event-before
```

## Usage

```js
var diceRollEmitter = ...

var eventBefore = require('promise-event-before');

eventBefore(emitter, 'rolled', 1000).then(function(roll) {
  console.log('dice roll:', roll);
}, function(err) {
    console.error(err);
});
```

## API

### eventBefore(emitter, eventName, timeout) : Promise

#### emitter
an EventEmitter to inspect

#### eventName
the event name to wait for

#### timeout
the number of milliseconds to wait before declaring the Promise rejected

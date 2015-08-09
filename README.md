# mockaf

Mocks *AnimationFrame methods.

[![browser support](https://ci.testling.com/tanem/mockaf.png)](https://ci.testling.com/tanem/mockaf)
[![NPM version](https://badge.fury.io/js/mockaf.svg)](http://badge.fury.io/js/mockaf)

## Motivation

When unit testing, it can sometimes be useful to mock the *AnimationFrame methods if the code under test makes use of them. Using `mockaf` allows us to execute *AnimationFrame callbacks in the same tick of the event loop, making the tests a little easier to write.

## Installation

```
$ npm install mockaf
```

## Example

```js
var mockaf = require('mockaf');

// Mock all window *AnimationFrame methods.
mockaf.install();

// Schedule stuff.
window.requestAnimationFrame(function(){
  // ...
});

// Schedule more stuff.
var id = window.requestAnimationFrame(function(){
  // ...
});

// Cancel the last callback.
window.cancelAnimationFrame(id);

// Execute any callbacks stored since the last tick.
mockaf.tick();

// Restore original window.*AnimationFrame methods.
mockaf.uninstall();
```

## API

```js
var mockaf = require('mockaf');
```

### mockaf.install()

Install mock implementations of all *AnimationFrame methods available on the window object.

### mockaf.tick()

Execute any callbacks stored via the mocked *AnimationFrame methods since the last tick.

### mockaf.uninstall()

Restore original *AnimationFrame methods on the window object.

## Tests

```
$ npm test
```

## Credits

* [RAFPlugin.js](https://gist.github.com/ischenkodv/43934774f4509fcb5791)
* [raf.js](https://gist.github.com/rwaldron/1058681)

## License

MIT
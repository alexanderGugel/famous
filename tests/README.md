## Overview

* Filenames of tests have the format tests/tap-tests/**/*.spec.js
* utilities/**/*.js are helpers used for testing specific behavior

## Conventions

# General Notes

* each assertion **needs** a message
* try to be as specific as possible
* Use `t.plan(x)` for tests that contain assertions within callbacks,
  even if the tests should be synchronous (e.g. when dealing with
  events)

# Testing existence of methods

**good**

```javascript
    t.test('transpose method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.transpose, 'function', 'matrix.transpose should be a function');
        t.end();
    });
```

**bad**

```javascript
    t.test('transpose method', function(t) {
        t.equal(typeof Matrix.prototype.transpose, 'function', 'Matrix.transpose should be a function');
        t.end();
    });
```

Don't test if methods are on the prototype. The constructor *might*
(but shouldn't) modify the instance (e.g. on-the-fly mixins).

The second test is testing something different than what it
wants us to believe: `Matrix.transpose` is actually not being tested,
neither should it.

assert = require('assert');

util = require('util');

assertPrettyMuchEqual = function (obj1, obj2, message) {
  assert.equal(JSON.stringify(obj1), JSON.stringify(obj2), message);
}
var conflation = require('../');

var activity = [
  ['bob', 'commented on', 'led zeppelin'],
  ['jill', 'commented on', 'the doors'],
  ['bob', 'commented on', 'led zeppelin'],
  ['jane', 'commented on', 'the beatles'],
  ['jane', 'blogged about', 'the doors'],
  ['jill', 'commented on', 'the beatles']
];

var result = conflation.conflate(activity);

console.log(JSON.stringify(result, null, 2));
describe('basic test', function () {
  var conflation = require('../');

  var activity = [
    ['bob', 'commented on', 'led zeppelin'],
    ['jill', 'commented on', 'the doors'],
    ['bob', 'commented on', 'led zeppelin'],
    ['jane', 'commented on', 'the beatles'],
    ['jane', 'blogged about', 'the doors'],
    ['jill', 'commented on', 'the beatles']
  ];

  it('subject perspective', function () {
    var result = conflation.conflate(activity);
    assert.deepEqual(result.add, [
      [
        'jill',
        'commented on',
        [
          'the doors',
          'the beatles'
        ]
      ]
    ]);
    assert.deepEqual(result.remove, [ 0, 1, 5 ]);
  });

  it('object perspective', function () {
    var result = conflation.conflate(activity, 'object');
    assert.deepEqual(result.add, [
      [
        [
          'jane',
          'jill'
        ],
        'commented on',
        'the beatles'
      ]
    ]);
    assert.deepEqual(result.remove, [ 0, 3, 5 ]);
  });
});
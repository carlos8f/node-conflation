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
    assertPrettyMuchEqual(result.add, [
      [
        'jill',
        'commented on',
        [
          'the doors',
          'the beatles'
        ]
      ]
    ]);
    assertPrettyMuchEqual(result.remove, [ 1, 2, 5 ]);
  });

  it('object perspective', function () {
    var result = conflation.conflate(activity, 'object');
    assertPrettyMuchEqual(result.add, [
      [
        [
          'jane',
          'jill'
        ],
        'commented on',
        'the beatles'
      ]
    ]);
    assertPrettyMuchEqual(result.remove, [ 2, 3, 5 ]);
  });
});
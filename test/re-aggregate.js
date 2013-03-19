describe('re-aggregate', function () {
  var conflate = require('../').conflate;

  var activity = [
    ['bob', 'commented on', 'led zeppelin'],
    ['jill', 'commented on', 'the doors'],
    ['bob', 'commented on', 'led zeppelin'],
    ['jane', 'commented on', 'the beatles'],
    ['jane', 'blogged about', 'the doors'],
    ['jill', 'commented on', 'the beatles']
  ];

  it('subject perspective', function () {
    var result = conflate(activity);
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
    assert.deepEqual(result.remove, [ 1, 2, 5 ]);

    var removedCount = 0;
    result.remove.forEach(function (idx) {
      activity.splice(idx - removedCount++, 1);
    });
    result.add.forEach(function (item) {
      activity.unshift(item);
    });

   assertPrettyMuchEqual(activity, [
      [
        'jill',
        'commented on',
        [
          'the doors',
          'the beatles'
        ]
      ],
      [
        'bob',
        'commented on',
        'led zeppelin'
      ],
      [
        'jane',
        'commented on',
        'the beatles'
      ],
      [
        'jane',
        'blogged about',
        'the doors'
      ]
    ]);
  });

  it('re-aggregates', function () {
    activity.unshift(['bob', 'commented on', 'the doors']);
    activity.unshift(['jill', 'commented on', 'led zeppelin']);
    activity.unshift(['bob', 'blogged about', 'the doors']);
    var result = conflate(activity);
    console.log(JSON.stringify(result, null, 2));
  });
});
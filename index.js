module.exports.conflate = function (list, perspective) {
  var pairs = {}
    , add = []
    , remove = []
    , result = []
    , perspective

  switch (perspective) {
    case 'object': perspective = [0]; break;
    case 'predicate': perspective = [1]; break;
    case 'subject': perspective = [2]; break;
    default: perspective = [0, 2];
  }

  list.forEach(function (item, idx) {
    item._idx = idx;

    perspective.forEach(function (perspective) {
      var key = [];
      for (var partIdx = 0; partIdx < 3; partIdx++) {
        if (partIdx === perspective) key.push(null);
        else key.push(item[partIdx]);
      }
      key = key.join('\0');
      pairs[key] || (pairs[key] = []);
      pairs[key].push(item);
    });
  });

  function uniquePush (arr, item) {
    // item is already in the array
    if (~arr.indexOf(item)) return;

    if (Array.isArray(item)) {
      // primitive item appears aggregated in the array
      if (item.every(function (part) {
        return !Array.isArray(part);
      }) && arr.some(function (item2) {
        return item2.every(function (part, idx) {
          if (Array.isArray(part)) {
            return ~part.indexOf(item[idx]);
          }
          return part === item[idx];
        });
      })) return;
    }

    arr.push(item);
    return arr;
  }

  Object.keys(pairs).forEach(function (key) {
    if (pairs[key].length === 1) {
      uniquePush(result, pairs[key][0]);
      return;
    }

    var conflated = key.split('\0')
      , idx = conflated.indexOf('')

    conflated[idx] = [];
    pairs[key].forEach(function (item) {
      if (~conflated[idx].indexOf(item[idx])) {
        return;
      }
      uniquePush(conflated[idx], item[idx]);
      uniquePush(remove, item._idx);
    });

    if (conflated[idx].length > 1) {
      uniquePush(result, conflated);
      uniquePush(add, conflated);
    }
    else {
      uniquePush(result, pairs[key][0]);
    }
  });

  return {
    result: result,
    add: add,
    remove: remove
  };
};
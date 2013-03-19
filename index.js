module.exports.conflate = function (list, perspective) {
  var pairs = {}
    , add = []
    , remove = []
    , index = {}

  if (typeof perspective === 'undefined') {
    perspective = 'subject';
  }
  var wildcardIdx = perspective === 'object' ? 0 : 2

  function addItem (item, idx) {
    item._idx = idx;
    var key = [ null, item[1], null ];
    (perspective === 'object') ? (key[2] = item[2]) : (key[0] = item[0]);
    // ignore aggregated items of different perspective
    if (Array.isArray(key[ (perspective === 'object') ? 2 : 0 ])) return;
    key = key.join('\0');
    if (index[key]) {
      remove.push(idx);
      index[key]._active = true;
    }
    else {
      index[key] = [];
      index[key]._origIdx = idx;
    }
    if (Array.isArray(item[wildcardIdx])) {
      var allIncluded = true;
      item[wildcardIdx].forEach(function (value) {
        if (~index[key].indexOf(value)) return;
        index[key].push(value);
        allIncluded = false;
      });
      if (allIncluded && index[key].length === 1) {
        index[key]._active = false;
      }
    }
    else {
      if (!~index[key].indexOf(item[wildcardIdx])) {
        index[key].push(item[wildcardIdx]);
      }
      else if (index[key].length === 1) {
        index[key]._active = false;
      }
    }
  }

  list.forEach(addItem);

  Object.keys(index).forEach(function (key) {
    if (index[key]._active) {
      var item = key.split('\0');
      delete index[key]._active;
      item[wildcardIdx] = index[key];
      add.push(item);
      remove.push(index[key]._origIdx);
    }
  });

  return {
    add: add,
    remove: remove.sort(function (a, b) {
      if (a === b) return 0;
      return a > b ? 1 : -1;
    })
  };
};
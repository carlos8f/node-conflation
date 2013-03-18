conflation
==========

Helps aggregate subject-predicate-object triples into condensed &quot;digests&quot;

[![build status](https://secure.travis-ci.org/carlos8f/conflation.png)](http://travis-ci.org/carlos8f/conflation)

Usage
-----

Call `conflation.conflate(triples [, perspective ])`.

- `triples` should be an array of triples (3-element arrays). A triple is in the
  form of `[ subject, predicate, object ]`. Subjects and objects should be strings
  or numbers.
- `perspective` should equal either "subject" (default) or "object". In subject
  mode, the object part of the triples will be aggregated. In object mode, the
  subject part of the triples will be aggregated.

Returns: object containing `add` and `remove` keys. `add` will be an array of
new triples aggregated from the input, with either the subject or object portion
being an array (depending on the perspective). `remove` will be an array of
numeric indexes of the input array, of items which are redundant in light of the
new aggregated triples. Duplicate items in the input will also appear in the 
`remove` array.

## Example

```js
var conflation = require('conflation');

var activity = [
  ['bob', 'commented on', 'led zeppelin'],
  ['jill', 'commented on', 'the doors'],
  ['bob', 'commented on', 'led zeppelin'],
  ['jane', 'commented on', 'the beatles'],
  ['jane', 'blogged about', 'the doors'],
  ['jill', 'commented on', 'the beatles']
];

// from the "subject" perspective (default):

var result = conflation.conflate(activity);
console.log(JSON.stringify(result, null, 2));
/*
{
  "add": [
    [
      "jill",
      "commented on",
      [
        "the doors",
        "the beatles"
      ]
    ]
  ],
  "remove": [
    0,
    1,
    5
  ]
}
*/

// from the "object" perspective:

var result = conflation.conflate(activity, 'object');
console.log(JSON.stringify(result, null, 2));
/*
{
  "add": [
    [
      [
        "jane",
        "jill"
      ],
      "commented on",
      "the beatles"
    ]
  ],
  "remove": [
    0,
    3,
    5
  ]
}
*/
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2012 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2012 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
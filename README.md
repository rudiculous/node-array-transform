# @rdcl/array-transform

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Tools to lazily transform an array.

##  Installation
`npm install @rdcl/array-transform`

## Usage
```javascript
const ArrayTransform = require('@rdcl/array-transform')
let res = new ArrayTransform([1, 2, 3, 4, 5])
    .map(x => x + 3)
    .filter(x => x < 7)
    .toArray()
```

## Methods
The following methods are supported:
* *map* - Maps a function to every element in the array (lazy).
* *filter* - Filters the array (lazy).
* *forEach* - Loops over the elements of the result.
* *toArray* - Converts the result to an array.
* *reduce*/*reduceRight* - Reduces the result to a single element.
* *some*/*every* - Tests whether some/every element in the result passes a test.

## Tests
`npm test`


[npm-image]: https://img.shields.io/npm/v/@rdcl/array-transform.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@rdcl/array-transform
[travis-image]: https://img.shields.io/travis/rudiculous/node-array-transform/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/rudiculous/node-array-transform
[coveralls-image]: https://img.shields.io/coveralls/rudiculous/node-array-transform/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/rudiculous/node-array-transform?branch=master

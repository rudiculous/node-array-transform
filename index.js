'use strict'

const $break = Symbol('stop looping')
const $filter = Symbol('filter an element from the array')

class ArrayTransform {

  /**
   * @constructs
   * @param {Array} arr The array to transform.
   */
  constructor(arr) {
    this._array = arr
    this._actions = []
  }

  /**
   * Maps `fn` to every element in the array.
   *
   * @param {Function} fn The function to map to every element.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   *
   * @return {ArrayTransform}
   */
  map(fn, thisArg) {
    if (thisArg == null) thisArg = {}

    this._actions.push(function (el, index) {
      return fn.call(thisArg, el, index)
    })

    return this
  }

  /**
   * Filters the array using `fn`.
   *
   * @param {Function} fn The check to use for filtering.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   *
   * @return {ArrayTransform}
   */
  filter(fn, thisArg) {
    if (thisArg == null) thisArg = {}

    this._actions.push(function (el, index) {
      if (fn.call(thisArg, el, index)) {
        return el
      }
      else {
        return $filter
      }
    })

    return this
  }

  /**
   * Loops over the array and calls `fn` for every element.
   *
   * This method will execute all lazy methods (map, filter).
   *
   * @param {Function} fn The function to call for every element.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   * @param {Boolean} [reversed=false] (Optional) whether to loop from right to left.
   */
  forEach(fn, thisArg, reversed) {
    if (thisArg == null) thisArg = {}
    if (reversed == null) reversed = false

    let index, test, step
    if (reversed) {
      index = this._array.length - 1
      test = () => index >= 0
      step = -1
    }
    else {
      index = 0
      let len = this._array.length
      test = () => index < len
      step = 1
    }

    elementsLoop:
    for (; test(); index += step) {

      let el = this._array[index]

      for (let action of this._actions) {
        el = action(el, index)

        if (el === $filter) {
          continue elementsLoop
        }
      }

      let res = fn.call(thisArg, el, index)

      if (res === $break) {
        return
      }
    }
  }

  /**
   * Converts the result to an array.
   *
   * This method will execute all lazy methods (map, filter).
   *
   * @return {Array}
   */
  toArray() {
    let result = []

    this.forEach(el => result.push(el))

    return result
  }

  /**
   * Reduces the array to a single element.
   *
   * This method will execute all lazy methods (map, filter).
   *
   * @param {Function} fn The function that reduces the elements of the array.
   * @param {*} initial The initial value.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   *
   * @return {*}
   */
  reduce(fn, initial, thisArg) {
    if (thisArg == null) thisArg = {}

    this.forEach((el, index) => {
      initial = fn.call(thisArg, initial, el, index)
    })

    return initial
  }

  /**
   * Reduces the array to a single element, by looping from right to left.
   *
   * This method will execute all lazy methods (map, filter).
   *
   * @param {Function} fn The function that reduces the elements of the array.
   * @param {*} initial The initial value.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   *
   * @return {*}
   */
  reduceRight(fn, initial, thisArg) {
    if (thisArg == null) thisArg = {}

    this.forEach((el, index) => {
      initial = fn.call(thisArg, initial, el, index)
    }, undefined, true)

    return initial
  }

  /**
   * Tests whether some element in the array passes `fn`.
   *
   * This method will execute all lazy methods (map, filter).
   *
   * @param {Function} fn The test to run.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   *
   * @return {Boolean}
   */
  some(fn, thisArg) {
    if (thisArg == null) thisArg = {}
    let res = false

    this.forEach((el, index) => {
      if (fn.call(thisArg, el, index)) {
        res = true
        return $break
      }
    })

    return res
  }

  /**
   * Tests whether every element in the array passes `fn`.
   *
   * This method will execute all lazy methods (map, filter).
   *
   * @param {Function} fn The test to run.
   * @param {Object} [thisArg={}] (Optional) the context to use as `this`.
   *
   * @return {Boolean}
   */
  every(fn, thisArg) {
    if (thisArg == null) thisArg = {}
    let res = true

    this.forEach((el, index) => {
      if (!fn.call(thisArg, el, index)) {
        res = false
        return $break
      }
    })

    return res
  }

}

exports = module.exports = ArrayTransform

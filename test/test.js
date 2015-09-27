'use strict'

const expect = require('chai').expect
const ArrayTransform = require('..')

describe('#ArrayTransform', function () {
  it('should map a function to each element of the array', function () {
    let res = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .toArray()

    expect(res).to.deep.equal([2, 4, 6, 8, 10])
  })

  it('should call the callback for map with the correct arguments', function () {
    let i = 0
    let arr = [1, 2, 3, 4, 5]

    new ArrayTransform(arr)
      .map(function (el, index) {
        expect(index).to.equal(i)
        expect(el).to.equal(arr[i])

        i += 1

        return el
      })
      .toArray()
  })

  it('should allow you to pass a context to map', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .map(function (el) {
        expect(this).to.equal(ctx)

        return el
      }, ctx)
      .toArray()
  })

  it('should filter the array', function () {
    let res = new ArrayTransform([1, 2, 3, 4, 5])
      .filter(x => x%2 === 0)
      .toArray()

    expect(res).to.deep.equal([2, 4])
  })

  it('should call the callback for filter with the correct arguments', function () {
    let i = 0
    let arr = [1, 2, 3, 4, 5]

    new ArrayTransform(arr)
      .filter(function (el, index) {
        expect(index).to.equal(i)
        expect(el).to.equal(arr[i])

        i += 1

        return true
      })
      .toArray()
  })

  it('should allow you to pass a context to filter', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .filter(function (el) {
        expect(this).to.equal(ctx)

        return true
      }, ctx)
      .toArray()
  })

  it('should be able to combine map and filter', function () {
    let res = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 === 0)
      .map(x => 2*x)
      .toArray()

    expect(res).to.deep.equal([8, 16])
  })

  it('should allow you to loop over the result with forEach', function () {
    let i = 0
    let arr = [1, 2, 3, 4, 5]

    new ArrayTransform(arr)
      .forEach(function (el, index) {
        expect(index).to.equal(i)
        expect(el).to.equal(arr[i])

        i += 1
      })
  })

  it('should allow you to loop over the result in reverse order with forEach', function () {
    let arr = [1, 2, 3, 4, 5]
    let i = arr.length - 1

    new ArrayTransform(arr)
      .forEach(function (el, index) {
        expect(index).to.equal(i)
        expect(el).to.equal(arr[i])

        i -= 1
      }, undefined, true)
  })

  it('should allow you to pass a context to forEach', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .forEach(function () {
        expect(this).to.equal(ctx)
      }, ctx)
  })

  it('should be able to reduce the result to a single element', function () {
    let res = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 !== 0)
      .reduce((prev, cur) => prev + cur, 0)

    expect(res).to.equal(2 + 6 + 10)
  })

  it('should allow you to pass a context to reduce', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .reduce(function () {
        expect(this).to.equal(ctx)
      }, 0, ctx)
  })

  it('should be able to reduce the result to a single element, looping from right to left', function () {
    let res = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 !== 0)
      .reduceRight((prev, cur) => prev + cur, 0)

    expect(res).to.equal(10 + 6 + 2)
  })

  it('should allow you to pass a context to reduceRight', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .reduceRight(function () {
        expect(this).to.equal(ctx)
      }, 0, ctx)
  })

  it('should be able to test whether some element passes a test', function () {
    let res1 = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 !== 0)
      .some(el => el === 10)

    expect(res1).to.equal(true)

    let res2 = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 !== 0)
      .some(el => el === 8)

    expect(res2).to.equal(false)
  })

  it('should allow you to pass a context to some', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .some(function () {
        expect(this).to.equal(ctx)
      }, ctx)
  })

  it('should be able to test whether every element passes a test', function () {
    let res1 = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 !== 0)
      .every(el => el > 0)

    expect(res1).to.equal(true)

    let res2 = new ArrayTransform([1, 2, 3, 4, 5])
      .map(x => 2*x)
      .filter(x => x%4 !== 0)
      .every(el => el < 10)

    expect(res2).to.equal(false)
  })

  it('should allow you to pass a context to every', function () {
    let ctx = {x: 5}

    new ArrayTransform([1, 2, 3, 4, 5])
      .every(function () {
        expect(this).to.equal(ctx)
      }, ctx)
  })
})

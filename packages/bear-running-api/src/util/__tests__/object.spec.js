import {
  deepEqual,
  flattenObject,
  trimProperties,
  shallowEqual,
} from '../object'

describe('deepEqual', () => {
  it('should not equal', () => {
    expect(deepEqual({}, null)).toBe(false)
  })
  it('should not equal', () => {
    expect(deepEqual({ a: { b: 3 } }, { a: { b: 1 } })).toBe(false)
  })
  it('should not equal', () => {
    expect(deepEqual({ a: { b: 3, c: 4 } }, { a: { b: 3 } })).toBe(false)
  })
  it('should equal', () => {
    expect(deepEqual({ a: { b: 3 } }, { a: { b: 3 } })).toBe(true)
  })
})

describe('flattenObject', () => {
  it('should flatten', () => {
    expect(flattenObject({ a: { b: { c: 3 }, u: 5 } })).toEqual({
      'a.b.c': 3,
      'a.u': 5,
    })
  })
})

describe('trimProperties', () => {
  it('should trim on object', () => {
    expect(trimProperties(['b'])({ a: 12, b: 56 })).toEqual({ a: 12 })
  })
  it('should trim on object nested in array', () => {
    expect(trimProperties(['b'])({ a: 12, u: [3, { c: 5, b: 56 }] })).toEqual({
      a: 12,
      u: [3, { c: 5 }],
    })
  })
})

describe('shallowEqual', () => {
  it('should not equal', () => expect(shallowEqual(null, {})).toBe(false))
  it('should equal', () => expect(shallowEqual({}, {})).toBe(true))
  it('should not equal', () => {
    const a = { u: { k: 3 }, k: 3 }
    const b = { u: { k: 3 }, k: 3 }

    expect(shallowEqual(a, b)).toBe(false)
  })
  it('should equal', () => {
    const a = { u: { k: 3 }, k: 3 }
    const b = { u: a.u, k: 3 }

    expect(shallowEqual(a, b)).toBe(true)
  })
  it('should not equal', () => {
    const a = { u: { k: 3 }, k: 3 }
    const b = { u: a.u, k: 3, c: 0 }

    expect(shallowEqual(a, b)).toBe(false)
  })
})

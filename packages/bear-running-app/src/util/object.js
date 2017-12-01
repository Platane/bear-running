export const isObject = (x: any) => !!(x && typeof x === 'object')

export const deepEqual = (a: Object, b: Object) =>
  isObject(a)
    ? isObject(b) &&
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every(i => deepEqual(a[i], b[i]))
    : a === b

export const trimProperties = (toTrim: string) => (o: any) => {
  if (Array.isArray(o)) return o.map(trimProperties(toTrim))

  if (isObject(o)) {
    const copy = {}
    Object.keys(o)
      .filter(key => !toTrim.includes(key))
      .forEach(key => (copy[key] = trimProperties(toTrim)(o[key])))

    return copy
  }

  return o
}

export const shallowEqual = (a: any, b: any) =>
  isObject(a) === isObject(b) &&
  (!isObject(a)
    ? a === b
    : Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every(key => a[key] === b[key]))

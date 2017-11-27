export const removeDup = arr => arr.filter((x, i, arr) => arr.indexOf(x) === i)

export const removeDupEqual = equal => arr =>
  arr.filter((x, i, arr) => arr.findIndex(u => equal(u, x)) === i)

export const removeDupId = removeDupEqual((a, b) => a.id === b.id)

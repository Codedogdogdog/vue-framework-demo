const toString = Object.prototype.toString
export function getType (o) {
  return toString.call(o).slice(8, -1)
}

export function isPlainObject (o) {
  return getType(o) === 'Object'
}

export function isArray (o) {
  return getType(o) === 'Array'
}

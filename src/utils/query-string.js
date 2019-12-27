export function stringify(o, options = {}) {
  if (!o) return o;
  const {
    filter = false, // Filter value is [null, '', undefined]'s key
    sort = false, // Sort or not
    eq = '=', // Connector between key-value pairs
    sep = '&', // Separator between key-value pairs
  } = options;

  const ret = [];
  let keys = Object.keys(o);
  if (sort) {
    keys = keys.sort();
  }
  keys.forEach(key => {
    if (o[key] === '' || o[key] === null || o[key] === undefined) {
      if (!filter) ret.push(key);
    } else {
      ret.push(`${key}${eq}${o[key]}`);
    }
  });
  return ret.join(sep);
}

export function parse(query, reg = /([^=&\s]+)[=\s]([^=&\s]+)/g) {
  let obj = {};
  while (reg.exec(query)) {
    obj[decodeURIComponent(RegExp.$1)] = decodeURIComponent(RegExp.$2);
  }
  return obj;
}

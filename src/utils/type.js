let to_string = Object.prototype.toString;
export function get_type(o) {
  return to_string.call(o).slice(8, -1);
}

export function is_plain_Object(o) {
  return get_type(o) === 'Object';
}

export function is_Array(o) {
  return get_type(o) === 'Array';
}

import { parse } from './query-string';
import { is_Array } from './type';

class Cookie {
  set(name, value, exdays) {
    let date = new Date();
    const domain = document.domain.match(/(.[^.]*){2}$/)[0] || document.domain;
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};domain=${domain};path=/`;
    return document.cookie;
  }
  get(arr_name) {
    const arr_cookie = parse(document.cookie, /([^=;\s]+)[=\s]([^=;\s]+)/g);
    if (!arr_name) return arr_cookie;
    switch (Object.prototype.toString.call(arr_name)) {
      case '[object Array]':
        return arr_name.reduce((pre, name) => {
          if (typeof name === 'object') return pre;
          pre[name] = arr_cookie[name] ? arr_cookie[name] : null;
          return pre;
        }, {});
      case '[object Object]':
        return arr_name;
      default:
        return arr_cookie[arr_name];
    }
  }
  clear(key) {
    if (!key) {
      const all_cookie = this.get();
      for (let key in all_cookie) {
        this.set(key, '', -1);
      }
    } else {
      if (is_Array(key)) {
        key.forEach(val => {
          this.set(val, '', -1);
        });
      } else {
        this.set(key, '', -1);
      }
    }
  }
}

const cookie = new Cookie();
export default cookie;

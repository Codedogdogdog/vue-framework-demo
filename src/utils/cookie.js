import { parse } from './query-string'
import { isArray } from './type'

class Cookie {
  set (name, value, exdays) {
    const date = new Date()
    const domain = document.domain.match(/(.[^.]*){2}$/)[0] || document.domain
    date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${date.toUTCString()};domain=${domain};path=/`
    return document.cookie
  }

  get (name) {
    const cookies = parse(document.cookie, /([^=;\s]+)[=\s]([^=;\s]+)/g)
    if (!name) return cookies
    switch (Object.prototype.toString.call(name)) {
      case '[object Array]':
        return name.reduce((pre, name) => {
          if (typeof name === 'object') return pre
          pre[name] = cookies[name] ? cookies[name] : null
          return pre
        }, {})
      case '[object Object]':
        return name
      default:
        return cookies[name]
    }
  }

  clear (key) {
    if (!key) {
      const cookies = this.get()
      for (const key in cookies) {
        this.set(key, '', -1)
      }
    } else {
      if (isArray(key)) {
        key.forEach(val => {
          this.set(val, '', -1)
        })
      } else {
        this.set(key, '', -1)
      }
    }
  }
}

const cookie = new Cookie()
export default cookie

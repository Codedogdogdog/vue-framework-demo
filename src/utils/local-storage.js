function isQuotaExceeded (e) {
  let QuotaExceeded = false
  if (e.code) {
    switch (e.code) {
      case 22:
        QuotaExceeded = true
        break
      case 1014:
        // Firefox
        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          QuotaExceeded = true
        }
        break
    }
  } else if (e.number === -2147024882) {
    // Internet Explorer 8
    QuotaExceeded = true
  }
  return QuotaExceeded
}

class LocalStorage {
  set (key, value) {
    try {
      return localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      if (isQuotaExceeded(e)) {
        // Storage full, maybe notify user or do some clean-up
        console.warn(`[localStorage warn]: failed to storage ${key}, please check has enough space`)
      }
    }
  }

  get (key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
  }

  clear (key) {
    if (key) return localStorage.removeItem(key)
    return localStorage.clear()
  }
}

const localStorage = new LocalStorage()
export default localStorage

/**
 * 获取URL传参特定参数，忽略大小写
 * @param {String} URL
 * @param {String} name
 */
export const getParameter = (URL, name) => {
  if (!URL) return ''
  return URL.slice(URL.indexOf('?') + 1)
    .replace(/#/g, '&')
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=')
      key = key.toLowerCase()
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
      return params
    }, { })[name]
}

/**
 * 读取cookie值
 * @param {String} name
 */
export const readCookie = name => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return ''
}

/**
 * 创建表单并提交
 * @param {Object} form
 */
export const createForm = form => {
  let dlform = document.createElement('form');
  dlform.style = "display:none;";
  dlform.method = form.method;
  dlform.action = form.action;
  for (let key in form.data) {
    if (form.data.hasOwnProperty(key)) {
      let hdnFilePath = document.createElement('input');
      hdnFilePath.type = 'hidden';
      hdnFilePath.name = key;
      hdnFilePath.value = form.data[key];
      dlform.appendChild(hdnFilePath);
    }
  }
  document.body.appendChild(dlform);
  dlform.submit();
  document.body.removeChild(dlform);
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export const deepCopy = (obj, cache = []) => {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * 格式化字符串两端空格
 * @param {String} string
 */
export const trim = (string) => {
  return string.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, '')
}

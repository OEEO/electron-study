export default {
  set (key, data) {
    return localStorage.setItem(key, JSON.stringify(data))
  },
  get (key) {
    return JSON.parse(localStorage.getItem(key))
  }
}

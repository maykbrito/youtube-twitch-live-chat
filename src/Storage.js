const Storage = {
  get(name) {
    return JSON.parse(localStorage.getItem('tw:chat:' + name)) || []
  },
  set(name, data) {
    localStorage.setItem('tw:chat:' + name, JSON.stringify(data))
  },
}
export { Storage }
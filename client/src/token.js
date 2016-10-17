const getToken = () => localStorage.id_token
const setToken = token => localStorage.id_token = token
const deleteToken = () => delete localStorage.id_token

export {
  getToken,
  setToken,
  deleteToken
}


const getToken = () => localStorage.id_token
const setToken = token => localStorage.id_token = token

export {
  getToken,
  setToken
}


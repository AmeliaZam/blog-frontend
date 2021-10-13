import { getToken, removeToken, saveToken } from 'utils/helpers'
import instance from 'api'

export const login = async ({ email, password }) => {
  const { data } = await instance.post('/user/login', {
    email,
    password,
  })

  instance.defaults.headers.common['Authorization'] = data.token
  saveToken(data.token)

  return data
}

export const register = async ({ firstName, lastName, email, password }) => {
  await instance.post('/user/register', {
    firstname: firstName,
    lastname: lastName,
    email,
    password,
  })

  return login({ email, password })
}

export const getProfile = async() => {
  const { data } = await instance.get('/user/me')
  return data
}

export const logout = () => {
  delete instance.defaults.headers.common['Authorization']
  removeToken()
}

export const isUserLogin = () => {
  const token = getToken()
  if (token) {
    instance.defaults.headers.common['Authorization'] = token
    return true
  } else return false
}

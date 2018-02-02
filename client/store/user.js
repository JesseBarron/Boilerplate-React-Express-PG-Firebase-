import axios from 'axios'


/*
  Actions
*/
const GETUSER = 'GETUSER';
const REMOVEUSER = 'REMOVEUSER';
/*
Action Creators
*/
const getUser = (user) => ({type: GETUSER, user})
const removeUser = () => ({type: REMOVEUSER})
/*
Thunks
*/
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => res.data)
      .then(userID => dispatch(getUser(userID)))

export const auth = (method, email, password) =>
  dispatch =>
    axios.post(`/auth/${method}`, {email, password})
      .then(res => res.data)
      .then(data => console.log(data))

export const logout = (history) =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
/*
  Reducer
*/

const reducerMethods = {
  GETUSER(state, action) {
    return action.user
  },
  REMOVEUSER(state, action) {
    return {}
  }
}

export default (state = {}, action) => {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action)
  return state
}

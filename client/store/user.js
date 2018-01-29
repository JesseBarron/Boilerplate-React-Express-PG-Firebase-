import axios from 'axios'


/*
  Actions
*/
const GETUSER = 'GETUSER';

/*
Action Creators
*/

export const getUser = (user) => ({type: GETUSER, user})


/*
  Reducer
*/

const reducerMethods = {
  GETUSER(state, action) {
    console.log(action)
    return action.user
  },
}

export default (state = {}, action) => {
  if (reducerMethods[action.type]) return reducerMethods[action.type](state, action)
  return state
}

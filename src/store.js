import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  isLogin: false,
  isAdmin: true,
  username: "",
  theme: false,
  customNavBar: null
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store

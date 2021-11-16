import { createSlice } from '@reduxjs/toolkit'
import { auth} from '../firebase'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    value: ""
  },
  reducers: {
    login: state => {
      state.value = auth.currentUser.email
    },
    logout: state => {
      state.value =""
    }
  }
})

export const { login, logout } = counterSlice.actions

export default counterSlice.reducer
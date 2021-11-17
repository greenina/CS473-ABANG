import { configureStore } from '@reduxjs/toolkit'
import setUser from '../reducers/setUser'

export default configureStore({
  reducer: {
    set: setUser
  }
})
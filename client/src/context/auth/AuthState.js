import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user
  // Register user
  // Log in user
  // Log out user
  // Clear errors

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState

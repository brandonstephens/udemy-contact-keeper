import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer'
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
  const loadUser = () => {
    console.log('load user')
  }
  // Register user
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await axios.post('/api/users', formData, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      })
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      })
    }
  }

  // Log in user
  const logIn = () => {
    console.log('log in')
  }
  // Log out user
  const logOut = () => {
    console.log('log out')
  }
  // Clear errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        logIn,
        logOut,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState

export const requestSignIn = (login, password) => {

  return {
    type: 'SIGN_IN',
    payload: {
      login,
      password,
    }
  }
}

export const requestSignInSuccess = (tokens) => {

  return {
    type: 'SIGN_IN_SUCCESS',
    payload: {
      tokens
    }
  }
}

export const requestSignInError = (error) => {

  return {
    type: 'SIGN_IN_ERROR',
    error
  }
}

export const requestCurrentUser = (access_token) => {

  return {
    type: 'REQUEST_CURRENT_USER',
    payload: {
      access_token
    }
  }
}

export const requestCurrentUserSuccess = (user) => {

  return {
    type: 'REQUEST_CURRENT_USER_SUCCESS',
    payload: {
      user
    }
  }
}

export const requestCurrentUserError = (error) => {

  return {
    type: 'REQUEST_CURRENT_USER_ERROR',
    error
  }
}

export const logOut = () => {
  
  return {
    type: 'LOG_OUT',
  }
}

export const logOutSuccess = (response) => {
  
  return {
    type: 'LOG_OUT_SUCCESS',
    payload: {
      response
    }
  }
}

export const logOutError = (error) => {
  
  return {
    type: 'LOG_OUT_ERROR',
    error,
  }
}

export const changeSchoolId = (id) => {

  return {
    type: 'CHANGE_SCHOOL_ID',
    payload: {
      id
    }
  }
}

export const requestVerificationOfAuth = () => {

  return {
    type: 'REQUEST_VERIFICATION_OF_AUTH'
  }
}

export const requestVerificationOfAuthSuccess = (valid) => {

  return {
    type: 'REQUEST_VERIFICATION_OF_AUTH_SUCCESS',
    payload: {
      valid
    }
  }
}

export const requestVerificationOfAuthError = (error) => {

  return {
    type: 'REQUEST_VERIFICATION_OF_AUTH_ERROR',
    error
  }
}

export const requestUpdateToken = (refresh_token) => {

  return {
    type: 'REQUEST_UPDATE_TOKEN',
    payload: {
      refresh_token
    }
  }
}

export const requestUpdateTokenSuccess = () => {

  return {
    type: 'REQUEST_UPDATE_TOKEN_SUCCESS'
  }
}

export const requestUpdateTokenError = (error) => {

  return {
    type: 'REQUEST_UPDATE_TOKEN_ERROR',
    error
  }
}

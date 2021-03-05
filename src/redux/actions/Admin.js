export const requestAdmins = () => {

  return {
    type: 'REQUEST_ADMINS'
  }
}

export const requestAdminsSuccess = (response) => {

  return {
    type: 'REQUEST_ADMINS_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestAdminsError = (error) => {

  return {
    type: 'REQUEST_ADMINS_ERROR',
    error    
  }
}

export const requestCreateNewAdmin = (login, password) => {

  return {
    type: 'REQUEST_CREATE_NEW_ADMIN',
    payload: {
      login,
      password,
    }
  }
}

export const requestCreateNewAdminSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_NEW_ADMIN_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestCreateNewAdminError = (error) => {

  return {
    type: 'REQUEST_CREATE_NEW_ADMIN_ERROR',
    error    
  }
}

export const requestUpdateAdminUser = (admin_id, password) => {
  
  return {
    type: 'REQUEST_UPDATE_ADMIN_USER',
    payload: {
      admin_id,
      password,
    }
  }
}

export const requestUpdateAdminUserSuccess = (response) => {
  
  return {
    type: 'REQUEST_UPDATE_ADMIN_USER_SUCCESS',
    payload: {
      response
    }
  }
}

export const requestUpdateAdminUserError = (error) => {
  
  return {
    type: 'REQUEST_UPDATE_ADMIN_USER_ERROR',
    error
  }
}

export const requestDeleteAdmin = (admin_id) => {

  return {
    type: 'REQUEST_DELETE_ADMIN',
    payload: {
      admin_id
    }
  }
}

export const requestDeleteAdminSuccess = (response, admin_id) => {

  return {
    type: 'REQUEST_DELETE_ADMIN_SUCCESS',
    payload: {
      response,
      admin_id,
    }    
  }
}

export const requestDeleteAdminError = (error) => {

  return {
    type: 'REQUEST_DELETE_ADMIN_ERROR',
    error    
  }
}

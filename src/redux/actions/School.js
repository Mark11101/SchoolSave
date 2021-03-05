export const requestSchools = () => {

  return {
    type: 'REQUEST_SCHOOLS'
  }
}

export const requestSchoolsSuccess = (response) => {

  return {
    type: 'REQUEST_SCHOOLS_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestSchoolsError = (error) => {

  return {
    type: 'REQUEST_SCHOOLS_ERROR',
    error    
  }
}

export const requestUpdateSchool = (school_id, values) => {

  return {
    type: 'REQUEST_UPDATE_SCHOOL',
    payload: {
      school_id,
      values,
    }
  }
}

export const requestUpdateSchoolSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_SCHOOL_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestUpdateSchoolError = (error) => {

  return {
    type: 'REQUEST_UPDATE_SCHOOL_ERROR',
    error    
  }
}

export const requestCreateNewSchool = (values) => {

  return {
    type: 'REQUEST_CREATE_NEW_SCHOOL',
    payload: {
      values
    }
  }
}

export const requestCreateNewSchoolSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_NEW_SCHOOL_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestCreateNewSchoolError = (error) => {

  return {
    type: 'REQUEST_CREATE_NEW_SCHOOL_ERROR',
    error    
  }
}

export const requestDeleteSchool = (school_id) => {

  return {
    type: 'REQUEST_DELETE_SCHOOL',
    payload: {
      school_id,
    }
  }
}

export const requestDeleteSchoolSuccess = (response) => {

  return {
    type: 'REQUEST_DELETE_SCHOOL_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestDeleteSchoolError = (error) => {

  return {
    type: 'REQUEST_DELETE_SCHOOL_ERROR',
    error    
  }
}

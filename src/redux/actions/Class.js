export const requestClasses = (school_id) => {
  
  return {
    type: 'REQUEST_CLASSES',
    payload: {
      school_id
    }
  }
}

export const requestClassesSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_CLASSES_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestClassesError = (error) => {

  return {
    type: 'REQUEST_CLASSES_ERROR',
    error    
  }
}

export const requestUpdateClass = (classroom_id, values) => {
  
  return {
    type: 'REQUEST_UPDATE_CLASS',
    payload: {
      classroom_id,
      values,
    }
  }
}

export const requestUpdateClassSuccess = (response) => {

  return {
    type: 'REQUEST_UPDATE_CLASS_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestUpdateClassError = (error) => {

  return {
    type: 'REQUEST_UPDATE_CLASS_ERROR',
    error    
  }
}

export const requestCreateClass = (school_id, description) => {
  
  return {
    type: 'REQUEST_CREATE_CLASS',
    payload: {
      school_id,
      description,
    }
  }
}

export const requestCreateClassSuccess = (response) => {

  return {
    type: 'REQUEST_CREATE_CLASS_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestCreateClassError = (error) => {

  return {
    type: 'REQUEST_CREATE_CLASS_ERROR',
    error    
  }
}

export const requestDeleteClass = (classroom_id, school_id) => {
  
  return {
    type: 'REQUEST_DELETE_CLASS',
    payload: {
      classroom_id,
      school_id,
    }
  }
}

export const requestDeleteClassSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_DELETE_CLASS_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestDeleteClassError = (error) => {

  return {
    type: 'REQUEST_DELETE_CLASS_ERROR',
    error    
  }
}

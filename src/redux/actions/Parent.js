export const requestParents = (school_id) => {
  
  return {
    type: 'REQUEST_PARENTS',
    payload: {
      school_id
    }
  }
}

export const requestParentsSuccess = (response) => {

  return {
    type: 'REQUEST_PARENTS_SUCCESS',
    payload: {
      response,
    }    
  }
}

export const requestParentsError = (error) => {

  return {
    type: 'REQUEST_PARENTS_ERROR',
    error    
  }
}

export const requestCreateParent = (values, school_id) => {
  
  return {
    type: 'REQUEST_CREATE_PARENT',
    payload: {
      values,
      school_id,
    }
  }
}

export const requestCreateParentSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_CREATE_PARENT_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestCreateParentError = (error) => {

  return {
    type: 'REQUEST_CREATE_PARENT_ERROR',
    error    
  }
}

export const requestUpdateParent = (parent_id, values, schoolID) => {

  return {
    type: 'REQUEST_UPDATE_PARENT',
    payload: {
      parent_id, 
      values,
      schoolID,
    }
  }
}

export const requestUpdateParentSuccess = (response, schoolID) => {

  return {
    type: 'REQUEST_UPDATE_PARENT_SUCCESS',
    payload: {
      response,
      schoolID,
    }    
  }
}

export const requestUpdateParentError = (error) => {

  return {
    type: 'REQUEST_UPDATE_PARENT_ERROR',
    error    
  }
}

export const requestDeleteParent = (parent_id, school_id) => {
  
  return {
    type: 'REQUEST_DELETE_PARENT',
    payload: {
      parent_id, 
      school_id,
    }
  }
}

export const requestDeleteParentSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_DELETE_PARENT_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestDeleteParentError = (error) => {

  return {
    type: 'REQUEST_DELETE_PARENT_ERROR',
    error    
  }
}

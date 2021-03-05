export const requestPupils = (id) => {
  
  return {
    type: 'REQUEST_PUPILS',
    payload: {
      id
    }
  }
}

export const requestPupilsSuccess = (response) => {

  return {
    type: 'REQUEST_PUPILS_SUCCESS',
    payload: {
      response,
    }    
  }
}

export const requestPupilsError = (error) => {

  return {
    type: 'REQUEST_PUPILS_ERROR',
    error    
  }
}

export const requestAddPupil = (newPupil, id) => {
  
  return {
    type: 'REQUEST_ADD_PUPIL',
    payload: {
      newPupil,
      id,
    }
  }
}

export const requestAddPupilSuccess = (response, id) => {

  return {
    type: 'REQUEST_ADD_PUPIL_SUCCESS',
    payload: {
      response,
      id,
    }    
  }
}

export const requestAddPupilError = (error) => {

  return {
    type: 'REQUEST_ADD_PUPIL_ERROR',
    error    
  }
}

export const requestUpdatePupil = (pupil_id, values, id) => {
  
  return {
    type: 'REQUEST_UPDATE_PUPIL',
    payload: {
      pupil_id, 
      values,
      id,
    }
  }
}

export const requestUpdatePupilSuccess = (response, id) => {

  return {
    type: 'REQUEST_UPDATE_PUPIL_SUCCESS',
    payload: {
      response,
      id,
    }    
  }
}

export const requestUpdatePupilError = (error) => {

  return {
    type: 'REQUEST_UPDATE_PUPIL_ERROR',
    error    
  }
}

export const requestDeletePupil = (pupil_id, id) => {
  
  return {
    type: 'REQUEST_DELETE_PUPIL',
    payload: {
      pupil_id, 
      id,
    }
  }
}

export const requestDeletePupilSuccess = (response, id) => {

  return {
    type: 'REQUEST_DELETE_PUPIL_SUCCESS',
    payload: {
      response,
      id,
    }    
  }
}

export const requestDeletePupilError = (error) => {

  return {
    type: 'REQUEST_DELETE_PUPIL_ERROR',
    error    
  }
}

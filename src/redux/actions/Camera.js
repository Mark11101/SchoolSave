export const requestCameras = (school_id) => {
  
  return {
    type: 'REQUEST_CAMERAS',
    payload: {
      school_id
    }
  }
}

export const requestCamerasSuccess = (response) => {

  return {
    type: 'REQUEST_CAMERAS_SUCCESS',
    payload: {
      response
    }    
  }
}

export const requestCamerasError = (error) => {

  return {
    type: 'REQUEST_CAMERAS_ERROR',
    error    
  }
}

export const requestCreateCamera = (values, school_id) => {
  
  return {
    type: 'REQUEST_CREATE_CAMERA',
    payload: {
      values,
      school_id,
    }
  }
}

export const requestCreateCameraSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_CREATE_CAMERA_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestCreateCameraError = (error) => {

  return {
    type: 'REQUEST_CREATE_CAMERA_ERROR',
    error    
  }
}

export const requestUpdateCamera = (camera_id, values, school_id) => {
  
  return {
    type: 'REQUEST_UPDATE_CAMERA',
    payload: {
      camera_id, 
      values,
      school_id,
    }
  }
}

export const requestUpdateCameraSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_UPDATE_CAMERA_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestUpdateCameraError = (error) => {

  return {
    type: 'REQUEST_UPDATE_CAMERA_ERROR',
    error    
  }
}

export const requestDeleteCamera = (camera_id, school_id) => {
  
  return {
    type: 'REQUEST_DELETE_CAMERA',
    payload: {
      camera_id, 
      school_id,
    }
  }
}

export const requestDeleteCameraSuccess = (response, school_id) => {

  return {
    type: 'REQUEST_DELETE_CAMERA_SUCCESS',
    payload: {
      response,
      school_id,
    }    
  }
}

export const requestDeleteCameraError = (error) => {

  return {
    type: 'REQUEST_DELETE_CAMERA_ERROR',
    error    
  }
}

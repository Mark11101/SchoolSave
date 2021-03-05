export const requestDetections = (id) => {
  
  return {
    type: 'REQUEST_DETECTIONS',
    payload: {
      id
    }
  }
}

export const requestDetectionsSuccess = (response) => {

  return {
    type: 'REQUEST_DETECTIONS_SUCCESS',
    payload: {
      response,
    }    
  }
}

export const requestDetectionsError = (error) => {

  return {
    type: 'REQUEST_DETECTIONS_ERROR',
    error    
  }
}

export const requestUpdateDetection = (id, negative) => {
  
  return {
    type: 'REQUEST_UPDATE_DETECTION',
    payload: {
      id,
      negative,
    }
  }
}

export const requestUpdateDetectionSuccess = (response, negative) => {

  return {
    type: 'REQUEST_UPDATE_DETECTION_SUCCESS',
    payload: {
      response,
      negative,
    }    
  }
}

export const requestUpdateDetectionError = (error) => {

  return {
    type: 'REQUEST_UPDATE_DETECTION_ERROR',
    error    
  }
}

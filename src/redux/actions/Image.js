export const requestImages = (pupil_id) => {
  
  return {
    type: 'REQUEST_IMAGES',
    payload: {
      pupil_id
    }
  }
}

export const requestImagesSuccess = (response) => {

  return {
    type: 'REQUEST_IMAGES_SUCCESS',
    payload: {
      response,
    }    
  }
}

export const requestImagesError = (error) => {

  return {
    type: 'REQUEST_IMAGES_ERROR',
    error    
  }
}

export const requestCreateImage = (image, pupil_id) => {
  
  return {
    type: 'REQUEST_CREATE_IMAGE',
    payload: {
      image,
      pupil_id,
    }
  }
}

export const requestCreateImageSuccess = (response, pupil_id) => {

  return {
    type: 'REQUEST_CREATE_IMAGE_SUCCESS',
    payload: {
      response,
      pupil_id,
    }    
  }
}

export const requestCreateImageError = (error) => {

  return {
    type: 'REQUEST_CREATE_IMAGE_ERROR',
    error    
  }
}

export const requestDeleteImage = (id, pupil_id) => {
  
  return {
    type: 'REQUEST_DELETE_IMAGE',
    payload: {
      id,
      pupil_id,
    }
  }
}

export const requestDeleteImageSuccess = (response, pupil_id) => {

  return {
    type: 'REQUEST_DELETE_IMAGE_SUCCESS',
    payload: {
      response,
      pupil_id,
    }    
  }
}

export const requestDeleteImageError = (error) => {

  return {
    type: 'REQUEST_DELETE_IMAGE_ERROR',
    error    
  }
}

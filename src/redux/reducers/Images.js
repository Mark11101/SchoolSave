import {
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  images: [],
}

const ImagesReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_IMAGES_SUCCESS':
      return {
        ...state,
        images: action.payload.response
      }

    case 'REQUEST_CREATE_IMAGE_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    default:
      return state
  }
}

export default ImagesReducer

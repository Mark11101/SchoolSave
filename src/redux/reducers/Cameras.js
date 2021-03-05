import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  cameras: [],
}

const CamerasReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_CAMERAS_SUCCESS':
      return {
        ...state,
        cameras: action.payload.response
      }

    case 'REQUEST_UPDATE_CAMERA_SUCCESS':
      showSuccessMessage('Данные успешно сохранены')
      return state

    case 'REQUEST_UPDATE_CAMERA_ERROR':
      showErrorMessage('Произошла ошибка, попробуйт еще раз')
      return state   

    case 'REQUEST_CREATE_CAMERA_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    case 'REQUEST_DELETE_CAMERA_SUCCESS':
      showSuccessMessage('Камера удалена')
      return state

    default:
      return state
  }
}

export default CamerasReducer

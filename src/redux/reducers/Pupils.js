import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  pupils: [],
}

const PupilsReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_PUPILS_SUCCESS':
      return {
        ...state,
        pupils: action.payload.response
      }

    case 'REQUEST_UPDATE_PUPIL_SUCCESS':
      showSuccessMessage('Данные успешно сохранены')
      return state

    case 'REQUEST_UPDATE_PUPIL_ERROR':
      showErrorMessage('Произошла ошибка, попробуйт еще раз')
      return state  

    case 'REQUEST_CREATE_PUPIL_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    case 'REQUEST_DELETE_PUPIL_SUCCESS':
      showSuccessMessage('Ученик удален')
      return state

    default:
      return state
  }
}

export default PupilsReducer

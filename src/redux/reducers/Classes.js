import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  classes: [],
}

const ClassesReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_CLASSES_SUCCESS':
      return {
        ...state,
        classes: action.payload.response
      }

    case 'REQUEST_UPDATE_CLASS_SUCCESS':
      showSuccessMessage('Данные успешно сохранены')
      return state

    case 'REQUEST_UPDATE_CLASS_ERROR':
      showErrorMessage('Произошла ошибка, попробуйт еще раз')
      return state 

    case 'REQUEST_CREATE_CLASS_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    case 'REQUEST_DELETE_CLASS_SUCCESS':
      showSuccessMessage('Класс удален')
      return state

    default:
      return state
  }
}

export default ClassesReducer

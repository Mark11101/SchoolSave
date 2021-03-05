import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  schools: [],
}

const SchoolsReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_SCHOOLS_SUCCESS':
      return {
        ...state,
        schools: action.payload.response
      }

    case 'REQUEST_UPDATE_SCHOOL_SUCCESS':
      showSuccessMessage('Данные успешно сохранены')
      return state

    case 'REQUEST_UPDATE_SCHOOL_ERROR':
      showErrorMessage('Произошла ошибка, попробуйт еще раз')
      return state  

    case 'REQUEST_CREATE_NEW_SCHOOL_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    case 'REQUEST_DELETE_SCHOOL_SUCCESS':
      showSuccessMessage('Школа удалена')
      return state

    default:
      return state
  }
}

export default SchoolsReducer

import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  parents: [],
}

const ParentsReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_PARENTS_SUCCESS':
      return {
        ...state,
        parents: action.payload.response
      }

    case 'REQUEST_UPDATE_PARENT_SUCCESS':
      showSuccessMessage('Данные успешно сохранены')
      return state

    case 'REQUEST_UPDATE_PARENT_ERROR':
      showErrorMessage('Произошла ошибка, попробуйт еще раз')
      return state  

    case 'REQUEST_CREATE_PARENT_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    case 'REQUEST_DELETE_PARENT_SUCCESS':
      showSuccessMessage('Родитель удален')
      return state

    default:
      return state
  }
}

export default ParentsReducer

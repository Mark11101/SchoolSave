import {
  showSuccessMessage,
  showErrorMessage,
} from '../../utils/notifications/messages'

export const initialState = {
  admins: [],
}

const AdminsReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_ADMINS_SUCCESS':
      return {
        ...state,
        admins: action.payload.response
      }

    case 'REQUEST_UPDATE_ADMIN_USER_SUCCESS':
      showSuccessMessage('Пароль успешно сохранен')
      return state

    case 'REQUEST_UPDATE_ADMIN_USER_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state   

    case 'REQUEST_CREATE_NEW_ADMIN_ERROR':
      showErrorMessage('Произошла ошибка, попробуйте еще раз')
      return state 

    case 'REQUEST_DELETE_ADMIN_SUCCESS':
      showSuccessMessage('Администратор удален')
      return state

    default:
      return state
  }
}

export default AdminsReducer

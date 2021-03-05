import { showErrorMessage } from '../../utils/notifications/messages'

export const initialState = {
  isLogged: false,
  refresh_token: '',
  access_token: '',
  me: {},
  schoolID: '',
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        isLogged: true,
        access_token: action.payload.tokens.access_token,
        refresh_token: action.payload.tokens.refresh_token,
      }

    case 'SIGN_IN_ERROR':
      showErrorMessage('Неправильный логин или пароль, попробуйте еще раз')      
      return initialState

    case 'REQUEST_CURRENT_USER_SUCCESS':
      return {
        ...state,
        me: action.payload.user.me
      }

    case 'LOG_OUT_SUCCESS':
      return {
        ...initialState,
        me: {
          ...initialState.me
        }
      }

    case 'CHANGE_SCHOOL_ID':
      return {
        ...state,
        schoolID: action.payload.id,
      }

    case 'REQUEST_UPDATE_TOKEN_SUCCESS':
      window.location.reload()
      return state

    default:
      return state
  }
}

export default AuthReducer

import { showSuccessMessage } from '../../utils/notifications/messages'

export const initialState = {
  detections: [],
}

const ImagesReducer = (state = initialState, action) => {
  switch (action.type) {      
    case 'REQUEST_DETECTIONS_SUCCESS':
      return {
        ...state,
        detections: action.payload.response
      }

    case 'REQUEST_UPDATE_DETECTION_SUCCESS':
      action.payload.negative && showSuccessMessage('Ответ успешно отправлен')
      return state

    default:
      return state
  }
}

export default ImagesReducer

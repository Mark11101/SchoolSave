import getMatchedDeviceType from '../../utils/responsive/getMatchedDeviceType'

export const initialState = {
  deviceType: getMatchedDeviceType(window.innerWidth),
}

const UiReducer = (state = initialState, action) => {
  if (action.type === 'RESIZE') {

    return {
      ...state,
      deviceType: action.matchDeviceMedia,
    }

  } else {
    return state
  }
}

export default UiReducer

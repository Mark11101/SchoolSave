import getMatchedDeviceType from '../../utils/responsive/getMatchedDeviceType'

export const resize = (width) => {
  
  return {
    type: 'RESIZE',
    matchDeviceMedia: getMatchedDeviceType(width),
  }
}

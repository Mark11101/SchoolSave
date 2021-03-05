import { combineReducers } from 'redux'

import Auth from './Auth'
import Ui from './Ui'
import Admins from './Admins'
import Schools from './Schools'
import Classes from './Classes'
import Pupils from './Pupils'
import Parents from './Parents'
import Cameras from './Cameras'
import Images from './Images'
import Detections from './Detections'

const RootReducer = combineReducers({
  auth: Auth,
  ui: Ui,
  admins: Admins,
  schools: Schools,
  classes: Classes,
  pupils: Pupils,
  parents: Parents,
  cameras: Cameras,
  images: Images,
  detections: Detections,
})

export default RootReducer

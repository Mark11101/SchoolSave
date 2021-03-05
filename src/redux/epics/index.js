import { combineEpics, createEpicMiddleware, } from 'redux-observable'

import authEpics from './authEpics'
import uiEpics from './uiEpics'
import adminEpics from './adminEpics'
import schoolEpics from './schoolEpics'
import classEpics from './classEpics'
import pupilEpics from './pupilEpics'
import parentEpics from './parentEpics'
import cameraEpics from './cameraEpics'
import imageEpics from './imageEpics'
import detectionEpics from './detectionEpics'

export const rootEpic = combineEpics(
  ...Object.values(authEpics),
  ...Object.values(uiEpics),
  ...Object.values(adminEpics),
  ...Object.values(schoolEpics),
  ...Object.values(classEpics),
  ...Object.values(pupilEpics),
  ...Object.values(parentEpics),
  ...Object.values(cameraEpics),
  ...Object.values(imageEpics),
  ...Object.values(detectionEpics),
);

export const epicMiddleware = createEpicMiddleware();

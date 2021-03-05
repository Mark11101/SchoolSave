import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'

import rootReducer from '../reducers/Root'
import { epicMiddleware, rootEpic } from '../epics'
import * as localStorage from './localStorage'
import rehydrate from '../rehydrate'
import { initialState } from './initialState.js'

const persistedState = rehydrate(localStorage.loadState(initialState))

export const store = createStore(rootReducer, persistedState, composeWithDevTools(
  applyMiddleware(epicMiddleware),
))

store.subscribe(throttle(() => {
  const state = store.getState()

  localStorage.saveState(
    {
      auth: {
        isLogged: state.auth.isLogged,
        access_token: state.auth.access_token,
        refresh_token: state.auth.access_token,
        me: state.auth.me,
        schoolID: state.auth.schoolID,
      },
      admins: state.admins,
      schools: state.schools,
      classes: state.classes,
      pupils: state.pupils,
      parents: state.parents,
      cameras: state.cameras,
      images: state.images,
      detections: state.detections,
      ui: {
        deviceType: state.ui.deviceType,
      },
    },
  )
}, 1000))

epicMiddleware.run(rootEpic)

store.dispatch({ 
  type: 'APP_INIT' 
})

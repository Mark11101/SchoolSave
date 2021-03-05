import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestCameras,
  requestCamerasSuccess,
  requestCamerasError,
  requestCreateCameraSuccess,
  requestCreateCameraError,
  requestUpdateCameraSuccess,
  requestUpdateCameraError,
  requestDeleteCameraSuccess,
  requestDeleteCameraError,
} from '../actions/Camera'

const baseUrl = config.baseUrl;

export const requestCamerasEpic = (action$) => action$.pipe(
  ofType('REQUEST_CAMERAS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/cameras', {
        school_id: action.payload.school_id
      })
    ).pipe(
      map((result) => 
        result.data
        ?
          requestCamerasSuccess(result.data)
        :
          requestCamerasError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCamerasError(error))
      }),
    ),
  ),
)

export const requestCreateCameraEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_CAMERA'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/cameras/create', {
        school_id: action.payload.values.school_id,
        stream: action.payload.values.stream,
        description: action.payload.values.description,
        width: Number(action.payload.values.width),
        height: Number(action.payload.values.height),
        fps: Number(action.payload.values.fps),
        overview: [
          [Number(action.payload.values.overview.firstValue), Number(action.payload.values.overview.secondValue)],
          [Number(action.payload.values.overview.thirdValue), Number(action.payload.values.overview.fourthValue)]
        ]
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateCameraSuccess(result.data, action.payload.school_id)
        :
          requestCreateCameraError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateCameraError(error))
      }),
    ),
  ),
)

export const requestCreateCameraSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_CAMERA_SUCCESS'),
  switchMap((action) => of(requestCameras(action.payload.school_id)))
)

export const requestUpdateCameraEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_CAMERA'),
  switchMap(action =>
    from(
      axios.patch(baseUrl + '/api/v1/cameras/' + action.payload.camera_id, {
        stream: action.payload.values.stream,
        description: action.payload.values.description,
        width: Number(action.payload.values.width),
        height: Number(action.payload.values.height),
        fps: Number(action.payload.values.fps),
        overview: [
          [Number(action.payload.values.overview.firstValue), Number(action.payload.values.overview.secondValue)],
          [Number(action.payload.values.overview.thirdValue), Number(action.payload.values.overview.fourthValue)]
        ]
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateCameraSuccess(result.data, action.payload.school_id)
        :
          requestUpdateCameraError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateCameraError(error))
      }),
    ),
  ),
)

export const requestUpdateCameraSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_CAMERA_SUCCESS'),
  switchMap((action) => of(requestCameras(action.payload.school_id)))
)

export const requestDeleteCameraEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_CAMERA'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/cameras/' + action.payload.camera_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeleteCameraSuccess(result.data, action.payload.school_id)
        :
          requestDeleteCameraError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteCameraError(error))
      }),
    ),
  ),
)

export const requestDeleteCameraSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_CAMERA_SUCCESS'),
  switchMap((action) => of(requestCameras(action.payload.school_id)))
)

export default [
  requestCamerasEpic,
  requestCreateCameraEpic,
  requestCreateCameraSuccessEpic,
  requestUpdateCameraEpic,
  requestUpdateCameraSuccessEpic,
  requestDeleteCameraEpic,
  requestDeleteCameraSuccessEpic,
]

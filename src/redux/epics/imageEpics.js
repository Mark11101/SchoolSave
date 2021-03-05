import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestImages,
  requestImagesSuccess,
  requestImagesError,
  requestCreateImageSuccess,
  requestCreateImageError,
  requestDeleteImageSuccess,
  requestDeleteImageError,
} from '../actions/Image'

const baseUrl = config.baseUrl;

export const requestImagesEpic = (action$) => action$.pipe(
  ofType('REQUEST_IMAGES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/child_images', {
        child_id: action.payload.pupil_id,
      })
    ).pipe(
      map((result) => 
        result.data
        ?
          requestImagesSuccess(result.data)
        :
          requestImagesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestImagesError(error))
      }),
    ),
  ),
)

export const requestCreateImageEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_IMAGE'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/child_images/create', action.payload.image)
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateImageSuccess(result.data, action.payload.pupil_id)
        :
          requestCreateImageError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateImageError(error))
      }),
    ),
  ),
)

export const requestCreateImageSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_IMAGE_SUCCESS'),
  switchMap((action) => of(requestImages(action.payload.pupil_id)))
)

export const requestDeleteImageEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_IMAGE'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/child_images/' + action.payload.id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeleteImageSuccess(result.data, action.payload.pupil_id)
        :
          requestDeleteImageError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteImageError(error))
      }),
    ),
  ),
)

export const requestDeleteImageSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_IMAGE_SUCCESS'),
  switchMap((action) => of(requestImages(action.payload.school_id)))
)

export default [
  requestImagesEpic,
  requestCreateImageEpic,
  requestCreateImageSuccessEpic,
  requestDeleteImageEpic,
  requestDeleteImageSuccessEpic,
]

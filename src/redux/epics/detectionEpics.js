import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestDetectionsSuccess,
  requestDetectionsError,
  requestUpdateDetectionSuccess,
  requestUpdateDetectionError,
} from '../actions/Detection'

const baseUrl = config.baseUrl;

export const requestDetectionsEpic = (action$) => action$.pipe(
  ofType('REQUEST_DETECTIONS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/child_detections', action.payload.id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDetectionsSuccess(result.data)
        :
          requestDetectionsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDetectionsError(error))
      }),
    ),
  ),
)

export const requestUpdateDetectionEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_DETECTION'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/child_detections/' + action.payload.id, action.payload.negative)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestUpdateDetectionSuccess(result.data, action.payload.negative)
        :
          requestUpdateDetectionError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateDetectionError(error))
      }),
    ),
  ),
)

export default [
  requestDetectionsEpic,
  requestUpdateDetectionEpic,
]

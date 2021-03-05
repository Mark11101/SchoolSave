import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestClasses,
  requestClassesSuccess,
  requestClassesError,
  requestUpdateClassSuccess,
  requestUpdateClassError,
  requestCreateClassSuccess,
  requestCreateClassError,
  requestDeleteClassSuccess,
  requestDeleteClassError,
} from '../actions/Class'

const baseUrl = config.baseUrl;

export const requestClassesEpic = (action$) => action$.pipe(
  ofType('REQUEST_CLASSES'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/classrooms', {
        school_id: action.payload.school_id
      })
    ).pipe(
      map((result) => 
        result.data
        ?
          requestClassesSuccess(result.data)
        :
          requestClassesError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestClassesError(error))
      }),
    ),
  ),
)

export const requestUpdateClassEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_CLASS'),
  switchMap((action) => 
    from(
      axios.patch(baseUrl + '/api/v1/classrooms/' + action.payload.classroom_id, action.payload.values)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestUpdateClassSuccess(result.data)
        :
          requestUpdateClassError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateClassError(error))
      }),
    ),
  ),
)

export const requestUpdateClassSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_CLASS_SUCCESS'),
  switchMap(() => of(requestClasses()))
)

export const requestCreateClassEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_CLASS'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/classrooms/create', {
        school_id: action.payload.school_id,
        description: action.payload.description,
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateClassSuccess(result.data, action.payload.school_id)
        :
          requestCreateClassError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateClassError(error))
      }),
    ),
  ),
)

export const requestCreateClassSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_CLASS_SUCCESS'),
  switchMap((action) => of(requestClasses(action.payload.school_id)))
)

export const requestDeleteClassEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_CLASS'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/classrooms/' + action.payload.classroom_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeleteClassSuccess(result.data, action.payload.school_id)
        :
          requestDeleteClassError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteClassError(error))
      }),
    ),
  ),
)

export const requestDeleteClassSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_CLASS_SUCCESS'),
  switchMap((action) => of(requestClasses(action.payload.school_id)))
)

export default [
  requestClassesEpic,
  requestUpdateClassEpic,
  requestUpdateClassSuccessEpic,
  requestCreateClassEpic,
  requestCreateClassSuccessEpic,
  requestDeleteClassEpic,
  requestDeleteClassSuccessEpic,
]

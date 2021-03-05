import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestSchools,
  requestSchoolsSuccess,
  requestSchoolsError,
  requestUpdateSchoolSuccess,
  requestUpdateSchoolError,
  requestCreateNewSchoolSuccess,
  requestCreateNewSchoolError,
  requestDeleteSchoolSuccess,
  requestDeleteSchoolError,
} from '../actions/School'

import {
  requestCurrentUser
} from '../actions/Auth'

const baseUrl = config.baseUrl;

export const requestSchoolsEpic = (action$) => action$.pipe(
  ofType('REQUEST_SCHOOLS'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/schools')
    ).pipe(
      map((result) => 
        result.data
        ?
          requestSchoolsSuccess(result.data)
        :
          requestSchoolsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestSchoolsError(error))
      }),
    ),
  ),
)

export const requestSchoolsErrorEpic = (action$) => action$.pipe(
  ofType('REQUEST_SCHOOLS_ERROR'),
  switchMap(() => of(requestCurrentUser()))
)

export const requestUpdateSchoolEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_SCHOOL'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/schools/' + action.payload.school_id, {
        password: action.payload.values.password,
        name: action.payload.values.name,
        address: action.payload.values.address,
        lat: action.payload.values.lat,
        long: action.payload.values.long,
      })
    ).pipe(
      map((result) => 
        result.data
        ?
          requestUpdateSchoolSuccess(result.data)
        :
          requestUpdateSchoolError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateSchoolError(error))
      }),
    ),
  ),
)

export const requestUpdateSchoolSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_SCHOOL_SUCCESS'),
  switchMap(() => of(requestSchools()))
)

export const requestCreateNewSchoolEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_NEW_SCHOOL'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/schools/create', {
        login: action.payload.values.login,
        password: action.payload.values.password,
        name: action.payload.values.name,
        address: action.payload.values.address,
        lat: action.payload.values.lat,
        long: action.payload.values.long,
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateNewSchoolSuccess(result.data)
        :
          requestCreateNewSchoolError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateNewSchoolError(error))
      }),
    ),
  ),
)

export const requestCreateNewSchoolSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_NEW_SCHOOL_SUCCESS'),
  switchMap(() => of(requestSchools()))
)

export const requestDeleteSchoolEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_SCHOOL'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/schools/' + action.payload.school_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeleteSchoolSuccess(result.data)
        :
          requestDeleteSchoolError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteSchoolError(error))
      }),
    ),
  ),
)

export const requestDeleteSchoolSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_SCHOOL_SUCCESS'),
  switchMap(() => of(requestSchools()))
)

export default [
  requestSchoolsEpic,
  requestSchoolsErrorEpic,
  requestUpdateSchoolEpic,
  requestUpdateSchoolSuccessEpic,
  requestCreateNewSchoolEpic,
  requestCreateNewSchoolSuccessEpic,
  requestDeleteSchoolEpic,
  requestDeleteSchoolSuccessEpic,
]

import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestParents,
  requestParentsSuccess,
  requestParentsError,
  requestCreateParentSuccess,
  requestCreateParentError,
  requestUpdateParentSuccess,
  requestUpdateParentError,
  requestDeleteParentSuccess,
  requestDeleteParentError,
} from '../actions/Parent'

import { requestCurrentUser } from '../actions/Auth'

const baseUrl = config.baseUrl;

export const requestParentsEpic = (action$) => action$.pipe(
  ofType('REQUEST_PARENTS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/parents', action.payload.school_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestParentsSuccess(result.data)
        :
          requestParentsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestParentsError(error))
      }),
    ),
  ),
)

export const requestParentsErrorEpic = (action$) => action$.pipe(
  ofType('REQUEST_PARENTS_ERROR'),
  switchMap(() => of(requestCurrentUser()))
)

export const requestCreateParentEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_PARENT'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/parents/create', {
        login: action.payload.values.login,
        password: action.payload.values.password,
        school_id: action.payload.values.school_id,
        contract: action.payload.values.contract,
        name: action.payload.values.name,
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateParentSuccess(result.data, action.payload.school_id)
        :
          requestCreateParentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateParentError(error))
      }),
    ),
  ),
)

export const requestCreateParentSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_PARENT_SUCCESS'),
  switchMap((action) => of(requestParents(action.payload.school_id)))
)

export const requestUpdateParentEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_PARENT'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/parents/' + action.payload.parent_id, {
        password: action.payload.values.password,
        contract: action.payload.values.contract,
        name: action.payload.values.name,
      })
    ).pipe(
      map((result) => 
        result.data
        ?
          requestUpdateParentSuccess(result.data, action.payload.schoolID)
        :
          requestUpdateParentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateParentError(error))
      }),
    ),
  ),
)

export const requestUpdateParentSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_PARENT_SUCCESS'),
  switchMap((action) => of(requestParents(action.payload.schoolID)))
)

export const requestDeleteParentEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_PARENT'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/parents/' + action.payload.parent_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeleteParentSuccess(result.data, action.payload.school_id)
        :
          requestDeleteParentError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteParentError(error))
      }),
    ),
  ),
)

export const requestDeleteParentSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_PARENT_SUCCESS'),
  switchMap((action) => of(requestParents(action.payload.school_id)))
)

export default [
  requestParentsEpic,
  requestCreateParentEpic,
  requestCreateParentSuccessEpic,
  requestUpdateParentEpic,
  requestUpdateParentSuccessEpic,
  requestDeleteParentEpic,
  requestDeleteParentSuccessEpic,
  requestParentsErrorEpic,
]

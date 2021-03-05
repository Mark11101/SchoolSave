import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestAdmins,
  requestAdminsSuccess,
  requestAdminsError,
  requestUpdateAdminUserSuccess,
  requestUpdateAdminUserError,
  requestCreateNewAdminSuccess,
  requestCreateNewAdminError,
  requestDeleteAdminSuccess,
  requestDeleteAdminError,
} from '../actions/Admin'

import {
  logOut,
  logOutError,
} from '../actions/Auth'

const baseUrl = config.baseUrl;

export const requestAdminsEpic = (action$) => action$.pipe(
  ofType('REQUEST_ADMINS'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/admins')
    ).pipe(
      map((result) => 
        result.data
        ?
          requestAdminsSuccess(result.data)
        :
          requestAdminsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAdminsError(error))
      }),
    ),
  ),
)

export const requestUpdateAdminUserEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_ADMIN_USER'),
  switchMap(action =>
    from(
      axios.patch(baseUrl + '/api/v1/admins/' + action.payload.admin_id, {
        password: action.payload.password
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateAdminUserSuccess(result.data)
        :
          requestUpdateAdminUserError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateAdminUserError(error))
      }),
    ),
  ),
)

export const requestCreateNewAdminEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_NEW_ADMIN'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/admins/create', {
        login: action.payload.login,
        password: action.payload.password,
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCreateNewAdminSuccess(result.data)
        :
          requestCreateNewAdminError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCreateNewAdminError(error))
      }),
    ),
  ),
)

export const requestCreateNewAdminSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CREATE_NEW_ADMIN_SUCCESS'),
  switchMap(() => of(requestAdmins()))
)

export const requestDeleteAdminEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_ADMIN'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/admins/' + action.payload.admin_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeleteAdminSuccess(result.data, action.payload.admin_id)
        :
          requestDeleteAdminError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeleteAdminError(error))
      }),
    ),
  ),
)

export const requestDeleteAdminSuccessEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_DELETE_ADMIN_SUCCESS'),
  switchMap((action) => {
    if (action.payload.admin_id === state$.value.auth.me.id) {
      return of(logOut())
    } else {
      return of(logOutError())
    }
  })
)

export default [
  requestAdminsEpic,
  requestUpdateAdminUserEpic,
  requestCreateNewAdminEpic,
  requestCreateNewAdminSuccessEpic,
  requestDeleteAdminEpic,
  requestDeleteAdminSuccessEpic,
]

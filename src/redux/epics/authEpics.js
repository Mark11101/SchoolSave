import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of, timer } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestSignInSuccess,
  requestSignInError,
  requestCurrentUser,
  requestCurrentUserSuccess,
  requestCurrentUserError,
  logOutSuccess,
  logOutError,
  requestVerificationOfAuthSuccess,
  requestVerificationOfAuthError,
  requestUpdateToken,
  requestUpdateTokenSuccess,
  requestUpdateTokenError,
  requestVerificationOfAuth,
} from '../actions/Auth'

const baseUrl = config.baseUrl;

export const requestSignInEpic = (action$) => action$.pipe(
  ofType('SIGN_IN'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/auth', action.payload)
    ).pipe(
      map((result) =>
        result.data
        ?
          requestSignInSuccess(result.data)
        :
          requestSignInError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestSignInError(error))
      }),
    ),
  ),
)

export const requestSignInSuccessEpic = (action$) => action$.pipe(
  ofType('SIGN_IN_SUCCESS'),  
  switchMap(() => of(requestCurrentUser()))
)

export const requestCurrentUserSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_CURRENT_USER_SUCCESS'),  
  switchMap(() => timer(0, 1000 * 60 * 60)),
  switchMap(() => of(requestVerificationOfAuth())),
)

export const requestVerificationOfAuthEpic = (action$) => action$.pipe(
  ofType('REQUEST_VERIFICATION_OF_AUTH'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/auth/verify')
    ).pipe(
      map((result) =>
        result.data
        ?
          requestVerificationOfAuthSuccess(result.data)
        :
          requestVerificationOfAuthError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestVerificationOfAuthError(error))
      }),
    ),
  ),
)

export const requestVerificationOfAuthErrorEpic = (action$, state$) => action$.pipe(
  ofType('REQUEST_VERIFICATION_OF_AUTH_ERROR'),
  switchMap(() => of(requestUpdateToken(state$.value.auth.refresh_token))), 
)

export const requestUpdateTokenEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_TOKEN'),
  switchMap((action) =>
    from(
      axios.post(baseUrl + '/api/v1/auth/refresh', action.payload.refresh_token)
    ).pipe(
      map((result) =>
        result.data
        ?
          requestUpdateTokenSuccess(result.data)
        :
          requestUpdateTokenError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdateTokenError(error))
      }),
    ),
  ),
)

export const requestCurrentUserEpic = (action$) => action$.pipe(
  ofType('REQUEST_CURRENT_USER'),
  switchMap(() =>
    from(
      axios.get(baseUrl + '/api/v1/auth/me')
    ).pipe(
      map((result) =>
        result.data
        ?
          requestCurrentUserSuccess(result.data)
        :
          requestCurrentUserError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestCurrentUserError(error))
      }),
    ),
  ),
)

export const logOutEpic = (action$) => action$.pipe(
  ofType('LOG_OUT'),
  switchMap(() =>
    from(
      axios.post(baseUrl + '/api/v1/auth/logout')
    ).pipe(
      map((result) =>
        result.data
        ?
          logOutSuccess(result.data)
        :
          logOutError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(logOutError(error))
      }),
    ),
  ),
)

export default [
  requestSignInEpic,
  requestSignInSuccessEpic,
  requestCurrentUserEpic,
  requestCurrentUserSuccessEpic,
  logOutEpic,
  requestVerificationOfAuthEpic,
  requestUpdateTokenEpic,
  requestVerificationOfAuthErrorEpic,
]

import axios from '../../utils/axios/axios'
import { map, catchError, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { ofType } from 'redux-observable'

import config from '../../config/Config'

import {
  requestPupils,
  requestPupilsSuccess,
  requestPupilsError,
  requestAddPupilSuccess,
  requestAddPupilError,
  requestUpdatePupilSuccess,
  requestUpdatePupilError,
  requestDeletePupilSuccess,
  requestDeletePupilError,
} from '../actions/Pupil'

const baseUrl = config.baseUrl;

export const requestPupilsEpic = (action$) => action$.pipe(
  ofType('REQUEST_PUPILS'),
  switchMap((action) => 
    from(
      axios.get(baseUrl + '/api/v1/childs', action.payload.id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestPupilsSuccess(result.data)
        :
          requestPupilsError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestPupilsError(error))
      }),
    ),
  ),
)

export const requestAddPupilEpic = (action$) => action$.pipe(
  ofType('REQUEST_ADD_PUPIL'),
  switchMap(action =>
    from(
      axios.post(baseUrl + '/api/v1/childs/create', {
        parent_id: action.payload.newPupil.parent_id,
        classroom_id: action.payload.newPupil.classroom_id,
        name: action.payload.newPupil.name,
      })
    ).pipe(
      map((result) =>
        result.data
        ?
          requestAddPupilSuccess(result.data, action.payload.id)
        :
          requestAddPupilError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestAddPupilError(error))
      }),
    ),
  ),
)

export const requestAddPupilSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_ADD_PUPIL_SUCCESS'),
  switchMap((action) => of(requestPupils(action.payload.id)))
)

export const requestUpdatePupilEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_PUPIL'),
  switchMap((action) =>
    from(
      axios.patch(baseUrl + '/api/v1/childs/' + action.payload.pupil_id, {
        classroom_id: action.payload.values.classroom_id,
        name: action.payload.values.name,
      })
    ).pipe(
      map((result) => 
        result.data
        ?
          requestUpdatePupilSuccess(result.data, action.payload.id)
        :
          requestUpdatePupilError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestUpdatePupilError(error))
      }),
    ),
  ),
)

export const requestUpdatePupilSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_UPDATE_PUPIL_SUCCESS'),
  switchMap((action) => of(requestPupils(action.payload.id)))
)

export const requestDeletePupilEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_PUPIL'),
  switchMap((action) =>
    from(
      axios.delete(baseUrl + '/api/v1/childs/' + action.payload.pupil_id)
    ).pipe(
      map((result) => 
        result.data
        ?
          requestDeletePupilSuccess(result.data, action.payload.id)
        :
          requestDeletePupilError(result.error)
      ),
      catchError((error) => {
        console.error(error)
        return of(requestDeletePupilError(error))
      }),
    ),
  ),
)

export const requestDeletePupilSuccessEpic = (action$) => action$.pipe(
  ofType('REQUEST_DELETE_PUPIL_SUCCESS'),
  switchMap((action) => of(requestPupils(action.payload.id)))
)

export default [
  requestPupilsEpic,
  requestAddPupilEpic,
  requestAddPupilSuccessEpic,
  requestUpdatePupilEpic,
  requestUpdatePupilSuccessEpic,
  requestDeletePupilEpic,
  requestDeletePupilSuccessEpic,
]

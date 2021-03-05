import { initialState as AuthInitialState } from '../reducers/Auth'
import { initialState as UiInitialState } from '../reducers/Ui'
import { initialState as AdminsInitialState } from '../reducers/Admins'
import { initialState as SchoolsInitialState } from '../reducers/Schools'
import { initialState as ClassesInitialState } from '../reducers/Classes'
import { initialState as PupilsInitialState } from '../reducers/Pupils'
import { initialState as ParentsInitialState } from '../reducers/Parents'
import { initialState as CamerasInitialState } from '../reducers/Cameras'
import { initialState as ImagesInitialState } from '../reducers/Images'
import { initialState as DetectionsInitialState } from '../reducers/Detections'

export const initialState = {
  auth:  AuthInitialState,
  ui:    UiInitialState,
  admins: AdminsInitialState,
  schools: SchoolsInitialState,
  classes: ClassesInitialState,
  pupils: PupilsInitialState,
  parents: ParentsInitialState,
  cameras: CamerasInitialState,
  images: ImagesInitialState,
  detections: DetectionsInitialState,
}

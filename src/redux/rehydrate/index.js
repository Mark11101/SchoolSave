import rehydrateAuth from './Auth'
import rehydrateUi from './Ui'
import rehydrateAdmins from './Admins'
import rehydrateSchools from './Schools'
import rehydrateClasses from './Classes'
import rehydratePupils from './Pupils'
import rehydrateParents from './Parents'
import rehydrateCameras from './Cameras'
import rehydrateImages from './Images'
import rehydrateDetections from './Detections'

const rehydrate = (state) => {
  if (!state) {
    return state
  }

  return {
    ...state,
    auth:  rehydrateAuth({...state.auth}),
    ui:    rehydrateUi({...state.ui}),
    admins: rehydrateAdmins({...state.admins}),
    schools: rehydrateSchools({...state.schools}),
    classes: rehydrateClasses({...state.classes}),
    pupils: rehydratePupils({...state.pupils}),
    parents: rehydrateParents({...state.parents}),
    cameras: rehydrateCameras({...state.cameras}),
    images: rehydrateImages({...state.images}),
    detections: rehydrateDetections({...state.detections}),
  }
}

export default rehydrate

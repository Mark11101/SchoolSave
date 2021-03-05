import { connect } from 'react-redux'

import Camera from './Camera'

import {
  requestUpdateCamera,
  requestDeleteCamera,
} from '../../redux/actions/Camera'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    cameras: state.cameras.cameras,
    schoolID: state.auth.schoolID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdateCamera: (camera_id, values, school_id) => dispatch(requestUpdateCamera(camera_id, values, school_id)),
    requestDeleteCamera: (camera_id, schoolID) => dispatch(requestDeleteCamera(camera_id, schoolID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera)

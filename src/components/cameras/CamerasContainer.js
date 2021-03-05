import { connect } from 'react-redux'

import Cameras from './Cameras'

import {
  requestCameras,
  requestCreateCamera,
} from '../../redux/actions/Camera'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    camerasArray: state.cameras.cameras,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestCameras: (school_id) => dispatch(requestCameras(school_id)),
    requestCreateCamera: (values, school_id) => dispatch(requestCreateCamera(values, school_id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cameras)

import { connect } from 'react-redux'

import PupilDetections from './PupilDetections'

import {
  requestDetections,
  requestUpdateDetection,
} from '../../redux/actions/Detection'

const mapStateToProps = (state) => {
  return {
    detectionsArray: state.detections.detections
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestDetections: (id) => dispatch(requestDetections(id)),
    requestUpdateDetection: (id, negative) => dispatch(requestUpdateDetection(id, negative)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PupilDetections)

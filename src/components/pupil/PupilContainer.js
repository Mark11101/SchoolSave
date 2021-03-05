import { connect } from 'react-redux'

import Pupil from './Pupil'

import {
  requestUpdatePupil,
  requestDeletePupil,
} from '../../redux/actions/Pupil'

import {
  requestCreateImage,
} from '../../redux/actions/Image'

const mapStateToProps = (state) => {
  return {
    pupils: state.pupils.pupils,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdatePupil: (pupil_id, values, id) => dispatch(requestUpdatePupil(pupil_id, values, id)),
    requestDeletePupil: (pupil_id, id) => dispatch(requestDeletePupil(pupil_id, id)),
    requestCreateImage: (image, pupil_id) => dispatch(requestCreateImage(image, pupil_id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pupil)

import { connect } from 'react-redux'

import PupilImages from './PupilImages'

import {
  requestImages,
  requestDeleteImage,
} from '../../redux/actions/Image'

const mapStateToProps = (state) => {
  return {
    imagesArray: state.images.images,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestImages: (pupil_id) => dispatch(requestImages(pupil_id)),
    requestDeleteImage: (id, pupil_id) => dispatch(requestDeleteImage(id, pupil_id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PupilImages)

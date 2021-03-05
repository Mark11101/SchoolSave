import { connect } from 'react-redux'

import Classroom from './Classroom'

import {
  requestUpdateClass,
  requestDeleteClass,
} from '../../redux/actions/Class'

import {
  requestPupils,
  requestAddPupil,
} from '../../redux/actions/Pupil'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    classes: state.classes.classes,
    schoolID: state.auth.schoolID,
    pupilsArray: state.pupils.pupils,
    parentsArray: state.parents.parents,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdateClass: (classroom_id, values) => dispatch(requestUpdateClass(classroom_id, values)),
    requestDeleteClass: (id, school_id) => dispatch(requestDeleteClass(id, school_id)),
    requestPupils: (id) => dispatch(requestPupils(id)),
    requestAddPupil: (newPupil, id) => dispatch(requestAddPupil(newPupil, id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Classroom)

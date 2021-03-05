import { connect } from 'react-redux'

import Parent from './Parent'

import {
  requestPupils,
  requestAddPupil,
} from '../../redux/actions/Pupil'

import {
  requestUpdateParent,
  requestDeleteParent,
} from '../../redux/actions/Parent'

import { 
  changeSchoolId,
  requestCurrentUser,
} from '../../redux/actions/Auth'

const mapStateToProps = (state) => {
  return {
    me: state.auth.me,
    role: state.auth.me.role,
    parents: state.parents.parents,
    schoolID: state.auth.schoolID,
    pupilsArray: state.pupils.pupils,
    classesArray: state.classes.classes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSchoolId: (id) => dispatch(changeSchoolId(id)),
    requestPupils: (id) => dispatch(requestPupils(id)),
    requestUpdateParent: (parent_id, values, schoolID) => dispatch(requestUpdateParent(parent_id, values, schoolID)),
    requestDeleteParent: (parent_id, school_id) => dispatch(requestDeleteParent(parent_id, school_id)),
    requestAddPupil: (values, id) => dispatch(requestAddPupil(values, id)),
    requestCurrentUser: () => dispatch(requestCurrentUser()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Parent)

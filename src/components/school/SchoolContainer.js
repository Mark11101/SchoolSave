import { connect } from 'react-redux'

import School from './School'

import {
  requestUpdateSchool,
  requestDeleteSchool,
} from '../../redux/actions/School'

import { changeSchoolId } from '../../redux/actions/Auth'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    schools: state.schools.schools,
    me: state.auth.me,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdateSchool: (school_id, values) => dispatch(requestUpdateSchool(school_id, values)),
    requestDeleteSchool: (id) => dispatch(requestDeleteSchool(id)),
    changeSchoolId: (id) => dispatch(changeSchoolId(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(School)

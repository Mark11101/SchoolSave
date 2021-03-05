import { connect } from 'react-redux'

import Classes from './Classes'

import {
  requestClasses,
  requestCreateClass,
} from '../../redux/actions/Class'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    classrooms: state.classes.classes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestClasses: (school_id) => dispatch(requestClasses(school_id)),
    requestCreateClass: (id, desc) => dispatch(requestCreateClass(id, desc)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Classes)

import { connect } from 'react-redux'

import Parents from './Parents'

import {
  requestParents,
  requestCreateParent,
} from '../../redux/actions/Parent'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    parentsArray: state.parents.parents,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestParents: (school_id) => dispatch(requestParents(school_id)),
    requestCreateParent: (values, school_id) => dispatch(requestCreateParent(values, school_id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Parents)

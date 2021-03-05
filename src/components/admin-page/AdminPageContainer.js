import { connect } from 'react-redux'

import AdminPage from './AdminPage'

import { 
  requestUpdateAdminUser, 
  requestDeleteAdmin,
} from '../../redux/actions/Admin'

const mapStateToProps = (state) => {
  return {
    admins: state.admins.admins,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestUpdateAdminUser: (id, password) => dispatch(requestUpdateAdminUser(id, password)),
    requestDeleteAdmin: (id) => dispatch(requestDeleteAdmin(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPage)

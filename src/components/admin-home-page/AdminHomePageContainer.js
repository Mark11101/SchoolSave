import { connect } from 'react-redux'

import AdminHomePage from './AdminHomePage'

import { 
  requestAdmins,
  requestUpdateAdminUser,
  requestCreateNewAdmin, 
  requestDeleteAdmin,
} from '../../redux/actions/Admin'

import { 
  requestSchools, 
  requestCreateNewSchool,
} from '../../redux/actions/School'

import { changeSchoolId } from '../../redux/actions/Auth'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
    admin: state.auth.me,
    admins: state.admins.admins,
    schools: state.schools.schools,
    isLogged: state.auth.isLogged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestAdmins: () => dispatch(requestAdmins()),
    requestUpdateAdminUser: (admin_id, password) => dispatch(requestUpdateAdminUser(admin_id, password)),
    requestCreateNewAdmin: (login, password) => dispatch(requestCreateNewAdmin(login, password)),
    requestDeleteAdmin: (id) => dispatch(requestDeleteAdmin(id)),
    requestSchools: () => dispatch(requestSchools()),
    requestCreateNewSchool: (values) => dispatch(requestCreateNewSchool(values)),
    changeSchoolId: (id) => dispatch(changeSchoolId(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminHomePage)

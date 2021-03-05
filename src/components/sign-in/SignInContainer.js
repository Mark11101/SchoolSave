import { connect } from 'react-redux'

import SignIn from './SignIn'
import { requestSignIn } from '../../redux/actions/Auth'

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    role: state.auth.me.role,
    id: state.auth.me.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSignIn: (login, password) => dispatch(requestSignIn(login, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn)

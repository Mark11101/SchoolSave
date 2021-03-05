import { connect } from 'react-redux'

import LogOutHandler from './LogOutHandler'

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogOutHandler)

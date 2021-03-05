import { connect } from 'react-redux'

import App from './App'

const mapStateToProps = (state) => {
  return {
    role: state.auth.me.role,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

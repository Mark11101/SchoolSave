import React from 'react'
import { Redirect } from 'react-router-dom'

const LogOutHandler = (props) => {
  const {
    isLogged
  } = props;
  
  if (!isLogged) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }

  return (
    <React.Fragment />
  )
}

export default LogOutHandler

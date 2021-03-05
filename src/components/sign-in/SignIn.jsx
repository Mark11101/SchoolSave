import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from 'react-bootstrap/Container'
import { Redirect } from 'react-router-dom'

import logo from '../../images/logo.png'

import './SignIn.css'

const SignIn = (props) => {
  const {
    id,
    role,
    isLogged,
    requestSignIn,
  } = props;

  const [authValues, setAuthValues] = useState({
    login: '',
    password: '',
  });

  const onAuthPageOpen = () => {
    document.body.classList.add('auth-page')
  }
  
  const onAuthPageClose = () => {
    document.body.classList.remove('auth-page')
  }

  React.useEffect(() => {
    onAuthPageOpen()

    return onAuthPageClose
  }, []) 
  
  if (isLogged) {
    switch (role) {
      case 'admin':
        return (
          <Redirect
            to={{
              pathname: '/home-page',
            }}
          />
        )
      case 'school':
        return (
          <Redirect
            to={{
              pathname: '/school/' + id,
            }}
          />
        )
      case 'parent':
        return (
          <Redirect
            to={{
              pathname: '/parent/' + id,
            }}
          />
        )
      default:
        return ''
    }
  }

  const handleInputChange = (event) => {

    setAuthValues({
      ...authValues,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    requestSignIn(authValues.login.replace(/\s/g, '').toLocaleLowerCase(), authValues.password)
  }

  return (
    <Container className='b-sign-in'>
      <img 
        src={logo} 
        alt='' 
        className='b-sign-in__logo'
      />
      <div className='b-sign-in__form b-card'>
        <form 
          onSubmit={(event) => handleSubmit(event)}
          autoComplete="off"
          noValidate 
        >
          <TextField 
            label="Логин" 
            type='text'
            name='login'
            className='b-sign-in__input'
            onChange={handleInputChange}
          />
          <TextField
            label="Пароль"
            type="password"
            name='password'
            className='b-sign-in__input'
            onChange={handleInputChange}
          />
          <Button 
            type='submit'
            className='b-button b-button--secondary b-sign-in__submit-btn'
            disabled={authValues.login === '' || authValues.password === ''}
          >
            Войти
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignIn

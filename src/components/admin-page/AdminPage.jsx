import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import NavigationBar from '../navigation-bar/NavigationBarContainer'

import './AdminPage.css'

const AdminPage = (props) => {
  const {
    match,
    admins,
    requestUpdateAdminUser,
    requestDeleteAdmin,
  } = props;

  const admin = admins.filter((adminUnit) => adminUnit.id === match.params.id)[0];  
  
  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  
  const [editedValues, setEditedValues] = useState({
    password: '',
  })

  const onAdminPageOpen = () => {
    document.body.classList.add('admin-page')
  }
  
  const onAdminPageClose = () => {
    document.body.classList.remove('admin-page')
  }

  React.useEffect(() => {
    onAdminPageOpen()

    return onAdminPageClose
  }, []) 

  const handleEditInputsToggle = () => {

    setIsEditInputsVisible(!isEditInputsVisible)
  }

  const handleEditInputChange = (event) => {

    setEditedValues({
      ...editedValues,
      [event.target.name]: event.target.value,
    })
  }

  const handleEditValuesSubmit = (event) => {
    event.preventDefault()

    handleEditInputsToggle()
    requestUpdateAdminUser(match.params.id, editedValues.password)
  }

  const handleDeleteAdmin = () => {

    requestDeleteAdmin(admin.id)
    window.history.back()
  }

  return (
    <NavigationBar tabs={['Администратор']}>
      <Container className='b-admin-page'>
        <div className='b-panel b-admin-page__panel'>
          <div className='b-admin-page__header'>
            <h1 className='b-admin-page__header-title'>
              Учетная запись администратора
            </h1>
            <div>
              <Button
                className='b-button b-button--main b-admin-page__edit-btn'
                onClick={handleEditInputsToggle}
              >
                Сменить пароль
              </Button>
              <Button 
                className='b-button b-button--danger'
                onClick={handleDeleteAdmin}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
          {
            isEditInputsVisible
            ?
              <form className='b-admin-page__edit-form' onSubmit={handleEditValuesSubmit}>
                <TextField 
                  label="Пароль" 
                  type='password'
                  name='password'
                  value={editedValues.password}
                  onChange={handleEditInputChange}
                />
                <Button 
                  type='submit'
                  className='b-button b-button--secondary b-admin-page__edit-form-save-btn'
                  disabled={editedValues.password === ''}
                >
                  Сохранить
                </Button>
              </form>
            :
              <div className='b-admin-page__data'>
                <div>
                  <span>Логин:</span>
                  <span>{admin.login}</span>
                </div>
              </div>  
          }
        </div>
      </Container>
    </NavigationBar>
  )
}

export default AdminPage

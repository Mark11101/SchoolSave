import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import AddIcon from '@material-ui/icons/Add'

import NavigationBar from '../navigation-bar/NavigationBarContainer'
import AdditionModal from '../subcomponents/addition-modal/AdditionModal'

import './AdminHomePage.css'

const AdminHomePage = (props) => {
  const {
    admin,
    admins,
    schools,
    isLogged,
    requestAdmins,
    requestUpdateAdminUser,
    requestCreateNewAdmin,
    requestDeleteAdmin,
    requestSchools,
    requestCreateNewSchool,
    changeSchoolId,
  } = props;

  React.useEffect(() => {

    if (isLogged) {
      requestAdmins()
      requestSchools()
    }
  }, [])
 
  const [searchedAdmin, setSearchedAdmin] = useState('');
  const [searchedName, setSearchedName] = React.useState('');  
  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  const [isAdminAdditionModalVisible, setIsAdminAdditionModalVisible] = useState(false);
  const [isSchoolAdditionModalVisible, setIsSchoolAdditionModalVisible] = useState(false);

  const [editedValues, setEditedValues] = useState({
    password: '',
  })

  const [newAdmin, setNewAdmin] = useState({
    login: '',
    password: '',
  })

  const [newSchool, setNewSchool] = useState({
    login: '',
    password: '',
    name: '',
    address: '',
    lat: '',
    long: '',
  })

  const onAdminHomePageOpen = () => {
    document.body.classList.add('admin-home-page')
  }
  
  const onAdminHomePageClose = () => {
    document.body.classList.remove('admin-home-page')
  }

  React.useEffect(() => {      
    onAdminHomePageOpen()

    return onAdminHomePageClose
  }, []) 
  
  if (!isLogged) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }
  
  const handleSearchedAdminChange = (event) => {

    setSearchedAdmin(event.target.value.toLowerCase())
  }

  const handleSearchedNameChange = (event) => {

    setSearchedName(event.target.value.toLowerCase())
  }

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

    requestUpdateAdminUser(admin.id, editedValues.password)
    handleEditInputsToggle()
  }

  const handleDeleteAdmin = () => {

    requestDeleteAdmin(admin.id)
  }

  const handleOpenAdminAdditionModal = () => {

    setIsAdminAdditionModalVisible(true)
  }

  const handleCloseAdminAdditionModal = () => {

    setIsAdminAdditionModalVisible(false)
  }

  const handleAddAdminInputChange = (event) => {

    setNewAdmin({
      ...newAdmin,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddAdmin = (event) => {
    event.preventDefault()

    handleCloseAdminAdditionModal()
    requestCreateNewAdmin(newAdmin.login, newAdmin.password)
  }

  const handleOpenSchoolAdditionModal = () => {

    setIsSchoolAdditionModalVisible(true)
  }

  const handleCloseSchoolAdditionModal = () => {

    setIsSchoolAdditionModalVisible(false)
  }

  const handleAddSchoolInputChange = (event) => {

    setNewSchool({
      ...newSchool,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddSchool = (event) => {
    event.preventDefault()

    handleCloseSchoolAdditionModal()
    requestCreateNewSchool(newSchool)
  }

  const setSchoolID = (id) => {

    changeSchoolId(id)
  }

  return (
    <React.Fragment>
      <div className='b-admin-home-page'>
        <NavigationBar tabs={['Школы', 'Личный кабинет']}>
          <Container className='b-admin-home-page__account'>   
            {
              schools.length !== 0
              ?
                <React.Fragment>
                  <div className='b-admin-home-page__account-control-menu'>
                    <Button
                      className='b-button b-button--main b-admin-home-page__add-btn'
                      onClick={handleOpenSchoolAdditionModal}
                    >
                      <AddIcon />
                    </Button>      
                    <TextField 
                      label="Поиск по школам" 
                      type='text'
                      variant='outlined'
                      className='b-admin-home-page__search'
                      onChange={handleSearchedNameChange}
                    />
                  </div>
                  <ul className='b-list b-admin-home-page__list'>
                    {
                      schools.map((school) => {
                        if (searchedName === '' || (searchedName && school.name.toLowerCase().includes(searchedName))) {
                          return (
                            <li key={school.id}>
                              <Link
                                to={`/home-page/school/${school.id}`}
                                onClick={() => setSchoolID(school.id)}
                              >
                                {school.name}
                              </Link>
                            </li>
                          )
                        } else {
                          return null
                        }
                      })
                    }
                  </ul>
                </React.Fragment>
              :
                <div className='b-admin-home-page__account-control-menu'>
                  <Button
                    className='b-button b-button--main b-admin-home-page__add-btn'
                    onClick={handleOpenSchoolAdditionModal}
                  >
                    <AddIcon />
                  </Button>      
                  <div className='b-panel b-admin-home-page__no-data'>
                    Школы не найдены
                  </div>
                </div>                
            } 
          </Container>
          <Container className='b-admin-home-page__container-normalize'>
            <div className='b-panel b-admin-home-page__account'>
              <div className='b-admin-home-page__header'>
                <h1 className='b-admin-home-page__header-title'>
                  Учетная запись
                </h1>
                <div className="b-admin-home-page__btn-container">
                  <Button
                    className='b-button b-button--main b-admin-home-page__edit-btn'
                    onClick={handleEditInputsToggle}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className='b-button b-button--danger b-admin-home-page__delete-btn'
                    onClick={handleDeleteAdmin}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
              {
                isEditInputsVisible
                ?
                  <form className='b-admin-home-page__edit-form' onSubmit={handleEditValuesSubmit}>
                    <TextField 
                      label="Пароль" 
                      type='password'
                      name='password'
                      value={admin.password}
                      onChange={handleEditInputChange}
                    />
                    <Button 
                      type='submit'
                      className='b-button b-button--secondary b-admin-home-page__edit-form-save-btn'
                      disabled={editedValues.login === ''}
                    >
                      Сохранить
                    </Button>
                  </form>
                :
                  <div className='b-admin-home-page__data'>
                    <div>
                      <span>Логин:</span>
                      <span>{admin.login}</span>
                    </div>
                  </div>  
              }            
            </div>
            <div className='b-panel b-admin-home-page__admins'>
              <div className='b-admin-home-page__admins-header'>
                <h1>Список администраторов</h1>
                <Button
                  className='b-button b-button--main b-admin-home-page__admins-header-add-btn'
                  onClick={handleOpenAdminAdditionModal}
                >
                  <AddIcon />
                </Button>
              </div>
              {
                admins.length !== 0
                ?
                  <React.Fragment>
                    <TextField 
                      label="Поиск" 
                      type='text'
                      variant='outlined'
                      className='b-admin-home-page__search'
                      onChange={handleSearchedAdminChange}
                    />
                    <ul className='b-list b-admin-home-page__list'>
                      {
                        admins.map((adminUnit) => {
                          if ((searchedAdmin === '' || (searchedAdmin && adminUnit.login.toLowerCase().includes(searchedAdmin))) && adminUnit.id !== admin.id) {
                            return (
                              <li key={adminUnit.id}>
                                <Link
                                  to={'/home-page/admin/' + adminUnit.id}
                                >
                                  {adminUnit.login}
                                </Link>
                              </li>
                            )
                          } else {
                            return null
                          }
                        })
                      }
                    </ul>
                  </React.Fragment>
                :    
                  <div>
                    Администраторы не найдены
                  </div>
              }
            </div>
          </Container>
        </NavigationBar>
      </div>
      {
        isAdminAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseAdminAdditionModal}>
            <form className='b-admin-home-page__edit-form' onSubmit={(event) => handleAddAdmin(event)}>
              <TextField 
                label="Логин" 
                type='text'
                name='login'
                onChange={handleAddAdminInputChange}
              />
              <TextField 
                label="Пароль" 
                type='password'
                name='password'
                onChange={handleAddAdminInputChange}
              />
              <Button 
                type='submit'
                className='b-button b-button--secondary b-admin-home-page__modal-save-btn'
                disabled={newAdmin.login === '' || newAdmin.password === ''}
              >
                Добавить
              </Button>
            </form>
          </AdditionModal>
      }
      {
        isSchoolAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseSchoolAdditionModal}>
            <form 
              className='b-admin-home-page__edit-form' 
              onSubmit={(event) => handleAddSchool(event)}
            >
              <TextField 
                label="Логин" 
                type='text'
                name='login'
                onChange={handleAddSchoolInputChange}
              />
              <TextField 
                label="Пароль" 
                type='password'
                name='password'
                onChange={handleAddSchoolInputChange}
              />
              <TextField 
                label="Название" 
                type='text'
                name='name'
                onChange={handleAddSchoolInputChange}
              />
              <TextField 
                label="Адрес" 
                type='text'
                name='address'
                onChange={handleAddSchoolInputChange}
              />
              <TextField 
                label="Широта" 
                type='number'
                name='lat'
                value={newSchool.lat}
                onChange={handleAddSchoolInputChange}
              />
              <TextField 
                label="Долгота" 
                type='number'
                name='long'
                value={newSchool.long}
                onChange={handleAddSchoolInputChange}
              />
              <Button 
                type='submit'
                className='b-button b-button--secondary b-admin-home-page__modal-save-btn'
                disabled={
                  newSchool.login === ''    || newSchool.password === '' ||
                  newSchool.name  === ''    || newSchool.address  === '' ||
                  newSchool.lat   === ''  || newSchool.long       === ''
                }
              >
                Добавить
              </Button>
            </form>
          </AdditionModal>
      }
    </React.Fragment>
  )
}

export default AdminHomePage

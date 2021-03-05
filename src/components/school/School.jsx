import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { YMaps, Map } from "react-yandex-maps"
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import './School.css'

const School = (props) => {
  const {
    me,
    role,
    schools,
    schoolID,
    changeSchoolId,
    requestUpdateSchool,
    requestDeleteSchool,
  } = props;

  let school
  
  if (role === 'admin') {
    school = schools.filter((schoolUnit) => schoolUnit.id === schoolID)[0];
  } else if (role === 'school') {
    school = me;  
    changeSchoolId(school.id)
  }
  
  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  
  const [editedValues, setEditedValues] = useState({
    password: '',
    name: school.name,
    address: school.address,
    lat: school.lat,
    long: school.long,
  })

  const onSchoolPageOpen = () => {
    document.body.classList.add('school-page')
  }
  
  const onSchoolPageClose = () => {
    document.body.classList.remove('school-page')
  }

  React.useEffect(() => {
    onSchoolPageOpen()

    return onSchoolPageClose
  }, []) 

  if (!school) {
    if (role === 'school') {
      return (
        <Redirect
          to={{
            pathname: '/home-page',
          }}
        />
      )
    } else if (role === 'school') {
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )
    }
  }

  const mapData = {
    center: [school.lat, school.long],
    zoom: 16.5,
  };

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
    requestUpdateSchool(schoolID, editedValues)
  }

  const handleDeleteSchool = () => {

    requestDeleteSchool(schoolID)
  }

  return (
    <Container className='b-school'>
      <div className='b-panel b-school__panel'>
        <div className='b-school__header'>
          <h1 className='b-school__header-title'>
            Учетная запись школы
          </h1>
          <div className="b-school__btn-container">
            <Button
              className='b-button b-button--main b-school__edit-btn'
              onClick={handleEditInputsToggle}
            >
              <EditIcon />
            </Button>
            {
              role === 'admin'
              &&
                <Button
                  className='b-button b-button--danger b-school__delete-btn'
                  onClick={handleDeleteSchool}
                >
                  <DeleteIcon />
                </Button>
            }
          </div>
        </div>
        {
          isEditInputsVisible
          ?
            <form className='b-school__edit-form' onSubmit={handleEditValuesSubmit}>
              <TextField 
                label="Пароль" 
                type='password'
                name='password'
                value={editedValues.password}
                onChange={handleEditInputChange}
              />
              <TextField 
                label="Название" 
                type='text'
                name='name'
                value={editedValues.name}
                onChange={handleEditInputChange}
              />
              <TextField 
                label="Адрес" 
                type='text'
                name='address'
                value={editedValues.address}
                onChange={handleEditInputChange}
              />
              <TextField 
                label="Широта" 
                type='number'
                name='lat'
                value={editedValues.lat}
                onChange={handleEditInputChange}
              />
              <TextField 
                label="Долгота" 
                type='number'
                name='long'
                value={editedValues.long}
                onChange={handleEditInputChange}
              />
              <Button 
                type='submit'
                className='b-button b-button--secondary b-school__edit-form-save-btn'
                disabled={
                  editedValues.password === '' || editedValues.name === '' || 
                  editedValues.address  === '' || editedValues.lat  === '' || 
                  editedValues.long     === ''
                }
              >
                Сохранить
              </Button>
            </form>
          :
            <div className='b-school__data'>
              <div>
                <span>Название:</span>
                <span>{school.name}</span>
              </div>
              <div>
                <span>Адрес:</span>
                <span>{school.address}</span>
              </div>
              <div>
                <span>Широта:</span>
                <span>{school.lat}</span>
              </div>
              <div>
                <span>Долгота:</span>
                <span>{school.long}</span>
              </div>
            </div>  
        }
      </div>
      <div className='b-school__map'>
        <YMaps>
          <Map 
            defaultState={mapData} 
            width="100%" 
            height='60vh'
          />
        </YMaps>
      </div>
    </Container>    
  )
}

export default School

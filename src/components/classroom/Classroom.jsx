import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import Autocomplete from '@material-ui/lab/Autocomplete'

import NavigationBar from '../navigation-bar/NavigationBarContainer'
import AdditionModal from '../subcomponents/addition-modal/AdditionModal'
import { showInformationMessage } from '../../utils/notifications/messages'

import './Classroom.css'

const Classroom = (props) => {
  const {
    role,
    match,
    classes,
    schoolID,
    parentsArray,
    pupilsArray,
    requestUpdateClass,
    requestDeleteClass,
    requestPupils,
    requestAddPupil,
  } = props;

  const class_id = match.params.id;
  const classroom = classes.filter((classUnit) => classUnit.id === class_id)[0];
  const pupils = pupilsArray.filter((pupil) => pupil.classroom_id === class_id); 
  const parents = parentsArray.filter((parent) => parent.school_id === schoolID);
  
  if (!classroom) {
    window.history.back()
    return null
  }

  React.useEffect(() => {

    requestPupils({ classroom_id: class_id })
  }, [])  

  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  
  const [editedValues, setEditedValues] = useState({
    description: classroom.description,
  })
  
  const [searhedName, setSearchedName] = useState('');

  const onClassroomPageOpen = () => {
    document.body.classList.add('classroom-page')
  }
  
  const onClassroomPageClose = () => {
    document.body.classList.remove('classroom-page')
  }

  React.useEffect(() => {
    onClassroomPageOpen()

    return onClassroomPageClose
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
    requestUpdateClass(class_id, editedValues)
  }

  const handleSearchedNameChange = (event) => {

    setSearchedName(event.target.value.toLowerCase())
  }

  const handleDeleteClass = () => {

    requestDeleteClass(class_id, classroom.school_id)
  }
  
  const [isAdditionModalVisible, setIsAdditionModalVisible] = useState(false);
  
  const [newPupil, setNewPupil] = useState({
    parent_id: '',
    classroom_id: class_id,
    name: '',
  })

  const handleOpenAdditionModal = () => {
    
    parents.length !== 0
    ?
      setIsAdditionModalVisible(true)
    :
      showInformationMessage('Добавьте как минимум одного родителя')
  }

  const handleCloseAdditionModal = () => {

    setIsAdditionModalVisible(false)
  }

  const handleAddInputChange = (event) => {
    
    setNewPupil({
      ...newPupil,
      [event.target.name]: event.target.value,
    })
  }

  const handleParentIdChange = (event, values) => {
    
    setNewPupil({
      ...newPupil,
      parent_id: values.id,
    })
  }

  const handleAddPupil = (event) => {
    event.preventDefault()

    handleCloseAdditionModal()
    requestAddPupil(newPupil, class_id)
  }

  return (
    <React.Fragment>
      <NavigationBar tabs={['Класс']}>
        <Container className='b-classroom'>
          <div className='b-panel b-classroom__panel'>
            <div className='b-classroom__header'>
              <h1 className='b-classroom__header-title'>
                Учетная запись класса
              </h1>
              <div className="b-classroom__btn-container">
                <Button
                  className='b-button b-button--main b-classroom__edit-btn'
                  onClick={handleEditInputsToggle}
                >
                  <EditIcon />
                </Button>
                <Button
                  className='b-button b-button--danger b-school__delete-btn'
                  onClick={handleDeleteClass}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
            {
              isEditInputsVisible
              ?
                <form className='b-classroom__edit-form' onSubmit={handleEditValuesSubmit}>
                  <TextField 
                    label="Номер" 
                    type='text'
                    name='description'
                    value={editedValues.description}
                    onChange={handleEditInputChange}
                  />
                  <Button 
                    type='submit'
                    className='b-button b-button--secondary b-classroom__edit-form-save-btn'
                    disabled={editedValues.description === ''}
                  >
                    Сохранить
                  </Button>
                </form>
              :
                <div className='b-classroom__data'>
                  <div>
                    <span>Номер:</span>
                    <span>{classroom.description}</span>
                  </div>
                </div>  
            }
          </div>
          <div className='b-classroom-pupils'>
            {
              pupils.length !== 0
              ?
                <React.Fragment>
                  <div className='b-classroom-pupils__control-panel'>
                    <Button
                      className='b-button b-button--main b-classroom-pupils__add-btn'
                      onClick={handleOpenAdditionModal}
                    >
                      <AddIcon />
                    </Button>
                    <TextField 
                      label="Поиск ученика" 
                      type='text'
                      variant='outlined'
                      className='b-classroom-pupils__search'
                      onChange={handleSearchedNameChange}
                    />
                  </div>
                  <ul className='b-list b-classroom-pupils__list'>
                    {
                      pupils.map((pupil) => {
                        if (searhedName === '' || (searhedName && pupil.name.toLowerCase().includes(searhedName))) {
                          return (
                            <li key={pupil.id}>
                              <Link
                                to={
                                  role === 'admin'
                                  ?
                                    '/home-page/school/' + classroom.school_id + '/class/' + classroom.id + '/pupil/' + pupil.id
                                  :
                                    '/school/' + classroom.school_id + '/class/' + classroom.id + '/pupil/' + pupil.id
                                }  
                              >
                                {pupil.name}
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
                <div className='b-classroom__no-pupils'>
                  <Button
                    className='b-button b-button--main b-classroom__add-btn'
                    onClick={handleOpenAdditionModal}
                  >
                    <AddIcon />
                  </Button>  
                  <div className='b-panel b-classroom__no-pupils-panel'>
                    Ученики не найдены
                  </div>
                </div>
            }
          </div>
        </Container>
      </NavigationBar>
      {
        isAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseAdditionModal}>
            <form className='b-admin-home-page__edit-form' onSubmit={(event) => handleAddPupil(event)}>
              <Autocomplete
                options={parents}
                getOptionLabel={(option) => option.name}
                onChange={handleParentIdChange}                
                renderInput={
                  (params) => (
                    <TextField 
                      label="Имя родителя"       
                      {...params} 
                    />
                  )
                }
              />
              <TextField 
                label="Имя ученика" 
                type='text'
                name='name'
                onChange={handleAddInputChange}
              />
              <Button 
                type='submit'
                className='b-button b-button--secondary b-admin-home-page__modal-save-btn'
                disabled={newPupil.parent_id === '' || newPupil.name === ''}
              >
                Добавить
              </Button>
            </form>
          </AdditionModal>
      }
    </React.Fragment>
  )
}

export default Classroom

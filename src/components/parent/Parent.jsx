import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import AddIcon from '@material-ui/icons/Add'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TelegramIcon from '@material-ui/icons/Telegram'

import NavigationBar from '../navigation-bar/NavigationBarContainer'
import AdditionModal from '../subcomponents/addition-modal/AdditionModal'
import { showInformationMessage } from '../../utils/notifications/messages'

import './Parent.css'

const Parent = (props) => {
  const {
    me,
    role,
    match,
    parents,
    schoolID,
    pupilsArray,
    classesArray,
    requestPupils,
    changeSchoolId,
    requestUpdateParent,
    requestDeleteParent,
    requestAddPupil,
    requestCurrentUser,
  } = props;

  const parent_id = match.params.id;
  const pupils = pupilsArray.filter((pupil) => pupil.parent_id === parent_id);
  const classes = classesArray.filter((classroom) => classroom.school_id === schoolID);

  let parent
  
  if (role === 'admin' || role === 'school') {
    parent = parents.filter((parent) => parent.id === parent_id)[0];
  } else if (role === 'parent') {
    parent = me;  
    changeSchoolId(parent.school_id)
  }
  
  if (!parent) {
    window.history.back()
    return null
  }

  React.useEffect(() => {

    requestPupils({ parent_id: parent_id})

    role === 'parent' && requestCurrentUser()
  }, [])

  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  const [isAdditionModalVisible, setIsAdditionModalVisible] = useState(false);
  
  const [editedValues, setEditedValues] = useState({
    password: '',
    contract: parent.contract,
    name:     parent.name,
  })    

  const [newPupil, setNewPupil] = useState({
    parent_id: parent_id,
    classroom_id: '',
    name: '',
  })
  
  const onParentPageOpen = () => {
    document.body.classList.add('parent-page')
  }
  
  const onParentPageClose = () => {
    document.body.classList.remove('parent-page')
  }

  React.useEffect(() => {
    onParentPageOpen()

    return onParentPageClose
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
    requestUpdateParent(parent_id, editedValues, schoolID)
  }

  const handleDeleteParent = () => {

    requestDeleteParent(parent_id, schoolID)
  }

  const handleOpenAdditionModal = () => {

    classes.length !== 0
    ?
      setIsAdditionModalVisible(true)
    :
      showInformationMessage('Добавьте как минимум один класс')
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

  const handleClassIdChange = (event, values) => {
    
    setNewPupil({
      ...newPupil,
      classroom_id: values.id,
    })
  }

  const handleAddPupil = (event) => {
    event.preventDefault()

    handleCloseAdditionModal()
    requestAddPupil(newPupil, { parent_id })
  }
  
  const setPathname = (pupilID) => {
    
    switch (role) {
      case 'admin':
        return '/home-page/school/' + schoolID + '/parent/' + parent.id + '/pupil/' + pupilID
      case 'school':
        return '/school/' + schoolID + '/parent/' + parent.id + '/pupil/' + pupilID
      case 'parent':
        return '/parent/' + parent.id + '/pupil/' + pupilID
      default:
        return ''
    }
  }

  return (
    <React.Fragment>
      <NavigationBar tabs={['Родитель']}>
        <Container className='b-parent'>
          <div className='b-panel b-parent__panel'>
            <div className='b-parent__header'>
              <h1 className='b-parent__header-title'>
                Учетная запись родителя
              </h1>
              <div className="b-parent__btn-container">
                <Button
                  className='b-button b-button--main b-parent__edit-btn'
                  onClick={handleEditInputsToggle}
                >
                  <EditIcon />
                </Button>
                {
                  role !== 'parent'
                  &&
                    <Button
                      className='b-button b-button--danger b-parent__delete-btn'
                      onClick={handleDeleteParent}
                    >
                      <DeleteIcon />
                    </Button>
                }
              </div>
            </div>
            {
              isEditInputsVisible
              ?
                <form className='b-parent__edit-form' onSubmit={handleEditValuesSubmit}>
                  <TextField 
                    label="Пароль" 
                    type='password'
                    name='password'
                    value={editedValues.password}
                    onChange={handleEditInputChange}
                  />
                  <TextField 
                    label="Номер договора" 
                    type='text'
                    name='contract'
                    value={editedValues.contract}
                    onChange={handleEditInputChange}
                  />
                  <TextField 
                    label="Имя" 
                    type='text'
                    name='name'
                    value={editedValues.name}
                    onChange={handleEditInputChange}
                  />
                  <Button 
                    type='submit'
                    className='b-button b-button--secondary b-parent__edit-form-save-btn'
                    disabled={editedValues.description === ''}
                  >
                    Сохранить
                  </Button>
                </form>
              :
                <div className='b-parent__data'>
                  <div>
                    <span>Номер договора:</span>
                    <span>{parent.contract}</span>
                  </div>
                  <div>
                    <span>Имя:</span>
                    <span>{parent.name}</span>
                  </div>
                  <div>
                    <span>Логин:</span>
                    <span>{parent.login}</span>
                  </div>
                  <div className='b-parent__telegram'>
                    <a href='https://t.me/@save_school_bot'>Открыть уведомления</a>
                    <TelegramIcon />
                  </div>
                </div>  
            }
          </div>
          <div className='b-parent-pupils b-panel'>
            <div className='b-parent-pupils__header'>
              <h1>Дети</h1>   
              <Button
                className='b-button b-button--main b-parent-pupils__header-add-btn'
                onClick={handleOpenAdditionModal}
              >
                <AddIcon />
              </Button>
            </div>
            {
              pupils.length !== 0
              ?
                <ul className='b-list b-parent-pupils__list'>
                  {
                    pupils.map((pupil) => 
                      <li key={pupil.id}>
                        <Link
                          to={setPathname(pupil.id)}
                        >
                          {pupil.name}
                        </Link>
                      </li>
                    )
                  }
                </ul>
              :
                <div className='b-parent-pupils__no-children'>
                  Дети не найдены
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
                options={classes}
                getOptionLabel={(option) => option.description}
                onChange={handleClassIdChange}                
                renderInput={
                  (params) => (
                    <TextField 
                      label="Номер класса"       
                      {...params} 
                    />
                  )
                }
              />
              <TextField 
                label="Имя" 
                type='text'
                name='name'
                onChange={handleAddInputChange}
              />
              <Button 
                type='submit'
                className='b-button b-button--secondary b-admin-home-page__modal-save-btn'
                disabled={
                  newPupil.classroom_id === '' || newPupil.name  === ''
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

export default Parent

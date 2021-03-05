import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form' 
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import NavigationBar from '../navigation-bar/NavigationBarContainer'
import PupilImages from '../pupil-images/PupilImagesContainer'
import PupilDetections from '../pupil-detections/PupilDetectionsContainer'
import AdditionModal from '../subcomponents/addition-modal/AdditionModal'
import { showErrorMessage } from '../../utils/notifications/messages'

import './Pupil.css'

const Pupil = (props) => {
  const {
    match,
    pupils,
    requestUpdatePupil,
    requestDeletePupil,
    requestCreateImage,
  } = props;

  const pupil_id = match.params.id;
  const pupil = pupils.filter((pupil) => pupil.id === pupil_id)[0];

  if (!pupil) {
    window.history.back()
    return null
  }

  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  const [isAdditionModalVisible, setIsAdditionModalVisible] = useState(false);
  const [isImageInputValid, setIsImageInputValid] = useState(false);
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState('');
  
  const [editedValues, setEditedValues] = useState({
    classroom_id: pupil.classroom_id,
    name: pupil.name,
  })

  const onPupilPageOpen = () => {
    document.body.classList.add('pupil-page')
  }
  
  const onPupilPageClose = () => {
    document.body.classList.remove('pupil-page')
  }

  React.useEffect(() => {
    onPupilPageOpen()

    return onPupilPageClose
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
    requestUpdatePupil(pupil_id, editedValues, editedValues.classroom_id)
  }

  const handleDeletePupil = () => {

    requestDeletePupil(pupil_id, pupil.classroom_id)
  }

  const handleOpenAdditionModal = () => {

    setIsAdditionModalVisible(true)
  }

  const handleCloseAdditionModal = () => {

    setIsAdditionModalVisible(false)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    setImage(file)
    setImageName(file.name)

    if (file.type.split('/')[0] !== 'image') {
      setIsImageInputValid(false)
      showErrorMessage('Неверный формат файла')
    } else {
      setIsImageInputValid(true)
    }
  }

  const handleNewImageSubmit = (event) => {
    event.preventDefault()
    
    let formData = new FormData();
    
    formData.append('image', image)
    formData.append('child_id', pupil_id)
    
    handleCloseAdditionModal()
    requestCreateImage(formData, pupil_id)
  }

  return (
    <React.Fragment>
      <NavigationBar tabs={['Ученик']}>
        <Container className='b-pupil'>
          <div className='b-panel b-pupil__panel'>
            <div className='b-pupil__header'>
              <h1 className='b-pupil__header-title'>
                Учетная запись ученика
              </h1>
              <div className='b-pupil__btn-container'>
                <Button
                  className='b-button b-button--main b-pupil__edit-btn'
                  onClick={handleEditInputsToggle}
                >
                  <EditIcon />
                </Button>
                <Button
                  className='b-button b-button--danger'
                  onClick={handleDeletePupil}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
            {
              isEditInputsVisible
              ?
                <form className='b-pupil__edit-form' onSubmit={handleEditValuesSubmit}>
                  <TextField 
                    label="Имя" 
                    type='text'
                    name='name'
                    value={editedValues.name}
                    onChange={handleEditInputChange}
                  />
                  <Button 
                    type='submit'
                    className='b-button b-button--secondary b-pupil__edit-form-save-btn'
                    disabled={editedValues.classroom_id === '' || editedValues.name === ''}
                  >
                    Сохранить
                  </Button>
                </form>
              :
                <div className='b-pupil__data'>
                  <div>
                    <span>Имя:</span>
                    <span>{pupil.name}</span>
                  </div>
                </div>  
            }
          </div>
          <div className='b-panel b-pupil__table'>
            <div className='b-pupil__table-header'>
              <h1 className='b-pupil__table-header-title'>
                Изображения
              </h1>
              <Button
                className='b-button b-button--main'
                onClick={handleOpenAdditionModal}
              >
                <AddIcon />
              </Button>
            </div>
            <PupilImages pupilID={pupil_id} />
          </div>
          <div className='b-panel b-pupil__table'>
            <h1 className='b-pupil__table-header'>
              История посещений
            </h1>
            <PupilDetections id={{ child_id: pupil_id }} />
          </div>          
        </Container>
      </NavigationBar>
      {
        isAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseAdditionModal}>
            <Form className='b-pupil__add-image-form' onSubmit={handleNewImageSubmit}>
              <Form.File 
                id="custom-file"
                label={(imageName && imageName) || 'Выбрать изображение'}
                data-browse='Обзор'
                custom
                className='b-pupil__input-image'
                onChange={handleImageChange}
                feedback='Загрузите изображение'
              />
              <Button 
                type="submit"
                className='b-button b-button--secondary b-pupil__add-img-btn'
                disabled={!isImageInputValid}
              >
                Добавить
              </Button>
            </Form>
          </AdditionModal>
      }
    </React.Fragment>
  )
}

export default Pupil

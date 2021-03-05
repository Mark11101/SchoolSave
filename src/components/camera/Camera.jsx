import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteForever'

import NavigationBar from '../navigation-bar/NavigationBarContainer'
import PupilDetections from '../pupil-detections/PupilDetectionsContainer'

import './Camera.css'

const Camera = (props) => {
  const {
    role,
    match,
    cameras,
    schoolID,
    requestUpdateCamera,
    requestDeleteCamera,
  } = props;

  const camera_id = match.params.id;
  const camera = cameras.filter((camera) => camera.id === camera_id)[0];
  
  if (!camera) {
    window.history.back()
    return null
  }

  const [isEditInputsVisible, setIsEditInputsVisible] = useState(false);
  
  const [editedValues, setEditedValues] = useState({
    stream: camera.stream,
    description: camera.description,
    width: camera.width,
    height: camera.height,
    fps: camera.fps,
    overview: {
      firstValue: camera.overview[0][0],
      secondValue: camera.overview[0][1],
      thirdValue: camera.overview[1][0],
      fourthValue: camera.overview[1][1],
    },
  })

  const onCameraPageOpen = () => {
    document.body.classList.add('camera-page')
  }
  
  const onCameraPageClose = () => {
    document.body.classList.remove('camera-page')
  }

  React.useEffect(() => {
    onCameraPageOpen()

    return onCameraPageClose
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
    
    requestUpdateCamera(camera_id, editedValues, schoolID)
  }

  const handleOverviewValueChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    switch (name) {
      case 'firstValue':
        setEditedValues({
          ...editedValues,
          overview: {
            ...editedValues.overview,
            firstValue: value,
          }
        })
        break
      case 'secondValue':
        setEditedValues({
          ...editedValues,
          overview: {
            ...editedValues.overview,
            secondValue: value,
          }
        })
        break
      case 'thirdValue':
        setEditedValues({
          ...editedValues,
          overview: {
            ...editedValues.overview,
            thirdValue: value,
          }
        })
        break
      case 'fourthValue':
        setEditedValues({
          ...editedValues,
          overview: {
            ...editedValues.overview,
            fourthValue: value,
          }
        })
        break
      default:
        return null
    }
  }

  const handleDeleteCamera = () => {

    requestDeleteCamera(camera_id, schoolID)
  }

  return (
    <NavigationBar tabs={['Камера']}>
      <Container className='b-camera'>
        <div className='b-panel b-camera__panel'>
          <div className='b-camera__header'>
            <h1 className='b-camera__header-title'>
              Учетная запись камеры
            </h1>
            {
              role === 'admin'
              &&
                <div className="b-camera__btn-container">
                  <Button
                    className='b-button b-button--main b-camera__edit-btn'
                    onClick={handleEditInputsToggle}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className='b-button b-button--danger'
                    onClick={handleDeleteCamera}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
            }
          </div>
          {
            isEditInputsVisible
            ?
              <form className='b-camera__edit-form' onSubmit={handleEditValuesSubmit}>
                <TextField 
                  label="Поток" 
                  type='text'
                  name='stream'
                  value={editedValues.stream}
                  onChange={handleEditInputChange}
                />
                <TextField 
                  label="Название" 
                  type='text'
                  name='description'
                  value={editedValues.description}
                  onChange={handleEditInputChange}
                />
                <TextField 
                  label="Ширина" 
                  type='number'
                  name='width'
                  value={editedValues.width}
                  onChange={handleEditInputChange}
                />
                <TextField 
                  label="Высота" 
                  type='number'
                  name='height'
                  value={editedValues.height}
                  onChange={handleEditInputChange}
                />
                <TextField 
                  label="FPS" 
                  type='number'
                  name='fps'
                  value={editedValues.fps}
                  onChange={handleEditInputChange}
                />
                <small className='b-camera__overview-label'>
                  Обзор
                </small>
                <div className='b-cameras__overview-input'>
                  <TextField 
                    type='number'
                    name='firstValue'
                    value={editedValues.overview.firstValue}
                    onChange={(event) => handleOverviewValueChange(event)}
                  />
                  <span className='b-cameras__overview-input-divider'>
                    -
                  </span>
                  <TextField 
                    type='number'
                    name='secondValue'
                    value={editedValues.overview.secondValue}
                    onChange={(event) => handleOverviewValueChange(event)}
                  />
                </div>
                <div className='b-cameras__overview-input'>
                  <TextField 
                    type='number'
                    name='thirdValue'
                    value={editedValues.overview.thirdValue}
                    onChange={(event) => handleOverviewValueChange(event)}
                  />
                  <span className='b-cameras__overview-input-divider'>
                    -
                  </span>
                  <TextField 
                    type='number'
                    name='fourthValue'
                    value={editedValues.overview.fourthValue}
                    onChange={(event) => handleOverviewValueChange(event)}
                  />
                </div>
                <Button 
                  type='submit'
                  className='b-button b-button--secondary b-camera__edit-form-save-btn'
                  disabled={
                    editedValues.stream === '' || editedValues.description === '' ||
                    editedValues.width  === '' || editedValues.height      === ''  ||
                    editedValues.fps    === '' || editedValues.overview.firstValue === '' ||
                    editedValues.overview.secondValue === '' || editedValues.overview.thirdValue === '' ||
                    editedValues.overview.fourthValue === ''
                  }
                >
                  Сохранить
                </Button>
              </form>
            :
              <div className='b-camera__data'>
                <div>
                  <span>Название:</span>
                  <span>{camera.description}</span>
                </div>
                <div>
                  <span>Поток:</span>
                  <span>{camera.stream}</span>
                </div>
                <div>
                  <span>Ширина:</span>
                  <span>{camera.width}</span>
                </div>
                <div>
                  <span>Высота:</span>
                  <span>{camera.height}</span>
                </div>
                <div>
                  <span>FPS:</span>
                  <span>{camera.fps}</span>
                </div>
                <div>
                  <span>Обзор:</span>
                  <span>{camera.overview[0][0]},</span>
                  <span className='b-camera__overview-second-value'>
                    {camera.overview[0][1]}
                  </span>
                  <span>{camera.overview[1][0]},</span>
                  <span>{camera.overview[1][1]}</span>
                </div>
              </div>  
          }
        </div>
        <div className='b-panel b-camera__table'>
          <h1 className='b-camera__table-header'>
            История посещений
          </h1>
          <PupilDetections id={{ camera_id}} />
        </div>
      </Container>
    </NavigationBar>
  )
}

export default Camera

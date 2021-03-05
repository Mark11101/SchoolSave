import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

import AdditionModal from '../subcomponents/addition-modal/AdditionModal'

import './Cameras.css'

const Cameras = (props) => {
  const {
    role,
    schoolID,
    camerasArray,
    requestCameras,
    requestCreateCamera,
  } = props;

  const cameras = camerasArray.filter((camera) => camera.school_id === schoolID);

  React.useEffect(() => {

    requestCameras(schoolID)
  }, [])

  const [searhedCamera, setSearchedCamera] = useState('');
  const [isAdditionModalVisible, setIsAdditionModalVisible] = useState(false);

  const [newCamera, setNewCamera] = useState({
    school_id: schoolID,
    stream: '',
    description: '',
    width: '',
    height: '',
    fps: '',
    overview: {
      firstValue: '',
      secondValue: '',
      thirdValue: '',
      fourthValue: '',
    },
  })

  const handleOpenAdditionModal = () => {

    setIsAdditionModalVisible(true)
  }

  const handleCloseAdditionModal = () => {

    setIsAdditionModalVisible(false)
  }

  const handleAddInputChange = (event) => {

    setNewCamera({
      ...newCamera,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddCamera = (event) => {
    event.preventDefault()

    handleCloseAdditionModal()
    requestCreateCamera(newCamera, schoolID)
  }

  const handleSearchedCameraChange = (event) => {

    setSearchedCamera(event.target.value.toLowerCase())
  }  

  const handleOverviewValueChange = (event) => {
    const value = event.target.value;
    const name  = event.target.name;

    switch (name) {
      case 'firstValue':
        setNewCamera({
          ...newCamera,
          overview: {
            ...newCamera.overview,
            firstValue: value,
          }
        })
        break
      case 'secondValue':
        setNewCamera({
          ...newCamera,
          overview: {
            ...newCamera.overview,
            secondValue: value,
          }
        })
        break
      case 'thirdValue':
        setNewCamera({
          ...newCamera,
          overview: {
            ...newCamera.overview,
            thirdValue: value,
          }
        })
        break
      case 'fourthValue':
        setNewCamera({
          ...newCamera,
          overview: {
            ...newCamera.overview,
            fourthValue: value,
          }
        })
        break
      default:
        return null
    }
  }
  
  return (
    <React.Fragment>
      <Container className='b-cameras'>
        {
          cameras.length !== 0
          ?
            <React.Fragment>
              <div className='b-cameras__control-panel'>
                {
                  role === 'admin'
                  &&
                    <Button
                      className='b-button b-button--main b-cameras__control-panel-add-btn'
                      onClick={handleOpenAdditionModal}
                    >
                      <AddIcon />
                    </Button>
                }
                <TextField 
                  label="Поиск камеры" 
                  type='text'
                  variant='outlined'
                  className='b-cameras__search'
                  onChange={handleSearchedCameraChange}
                />
              </div>
              <ul className='b-list b-cameras__list'>
                {
                  cameras.map((camera) => {
                    if (searhedCamera === '' || (searhedCamera && camera.description.toLowerCase().includes(searhedCamera))) {
                      return (
                        <li key={camera.id}>
                          <Link
                            to={
                              role === 'admin'
                              ?
                                '/home-page/school/' + schoolID + '/camera/' + camera.id
                              :
                                '/school/' + schoolID + '/camera/' + camera.id
                            }
                          >
                            {camera.description}
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
            <div className='b-cameras__no-cameras'>
              {
                role === 'admin'
                &&
                  <Button
                    className='b-button b-button--main b-cameras__add-btn'
                    onClick={handleOpenAdditionModal}
                  >
                    <AddIcon />
                  </Button>  
              }
              <div className='b-panel b-cameras__no-cameras-panel'>
                Камеры не найдены
              </div>
            </div>
        }
      </Container>
      {
        isAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseAdditionModal}>
            <form className='b-admin-home-page__edit-form' onSubmit={(event) => handleAddCamera(event)}>
              <TextField 
                label="Поток" 
                type='text'
                name='stream'
                onChange={handleAddInputChange}
              />
              <TextField 
                label="Описание" 
                type='text'
                name='description'
                onChange={handleAddInputChange}
              />
              <TextField 
                label="Ширина" 
                type='number'
                name='width'
                onChange={handleAddInputChange}
              />
              <TextField 
                label="Высота" 
                type='number'
                name='height'
                onChange={handleAddInputChange}
              />
              <TextField 
                label="ФПС" 
                type='number'
                name='fps'
                onChange={handleAddInputChange}
              />
              <small className='b-cameras__overview-label'>
                Обзор
              </small>
              <div className='b-cameras__overview-input'>
                <TextField 
                  type='number'
                  name='firstValue'
                  onChange={(event) => handleOverviewValueChange(event)}
                />
                <span className='b-cameras__overview-input-divider'>
                  -
                </span>
                <TextField 
                  type='number'
                  name='secondValue'
                  onChange={(event) => handleOverviewValueChange(event)}
                />
              </div>
              <div className='b-cameras__overview-input'>
                <TextField 
                  type='number'
                  name='thirdValue'
                  onChange={(event) => handleOverviewValueChange(event)}
                />
                <span className='b-cameras__overview-input-divider'>
                  -
                </span>
                <TextField 
                  type='number'
                  name='fourthValue'
                  onChange={(event) => handleOverviewValueChange(event)}
                />
              </div>
              <Button 
                type='submit'
                className='b-button b-button--secondary b-admin-home-page__modal-save-btn'
                disabled={
                  newCamera.stream === '' || newCamera.description === '' || 
                  newCamera.width  === '' || newCamera.height      === ''  || 
                  newCamera.fps    === '' || newCamera.overview.firstValue === '' || 
                  newCamera.overview.secondValue === '' || newCamera.overview.thirdValue === '' || 
                  newCamera.overview.fourthValue === ''
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

export default Cameras

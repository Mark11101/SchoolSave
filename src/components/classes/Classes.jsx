import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import TextField from '@material-ui/core/TextField'
import GridList from '@material-ui/core/GridList'
import Button from '@material-ui/core/Button'
import GridListTile from '@material-ui/core/GridListTile'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

import useDevice from '../../hooks/use-device/useDevice'
import DeviceTypes from '../../constants/DeviceTypes'
import AdditionModal from '../subcomponents/addition-modal/AdditionModal'

import './Classes.css'

const Classes = (props) => {
  const {
    role,
    schoolID,
    classrooms,
    requestClasses,
    requestCreateClass,
  } = props;

  const classes = classrooms.filter((classroom) => classroom.school_id === schoolID); 
  
  React.useEffect(() => {
    
    requestClasses(schoolID)
  }, [])

  const [searhedClass, setSearchedClass] = useState('');  
  const [isAdditionModalVisible, setIsAdditionModalVisible] = useState(false);

  const [newClass, setNewClass] = useState({
    description: '',
  })

  const handleOpenAdditionModal = () => {

    setIsAdditionModalVisible(true)
  }

  const handleCloseAdditionModal = () => {

    setIsAdditionModalVisible(false)
  }

  const handleAddInputChange = (event) => {

    setNewClass({
      ...newClass,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddClass = (event) => {
    event.preventDefault()

    handleCloseAdditionModal()
    requestCreateClass(schoolID, newClass.description)
  }

  const deviceType = useDevice();

  const handleSearchedClassChange = (event) => {

    setSearchedClass(event.target.value.toLowerCase())
  }
  
  return (
    <React.Fragment>
      <Container className='b-classes'>
        {
          classes.length !== 0
          ?
            <React.Fragment>
              <div className='b-classes__control-panel'>
                <Button
                  className='b-button b-button--main b-classes__add-btn'
                  onClick={handleOpenAdditionModal}
                >
                  <AddIcon />
                </Button> 
                <TextField 
                  label="Поиск по классу" 
                  type='text'
                  variant='outlined'
                  className='b-classes__search'
                  onChange={handleSearchedClassChange}
                />
              </div>
              <GridList 
                className='b-classes__grid-list' 
                cols={deviceType === DeviceTypes.MOBILE ? 2 : 5} 
                spacing={20}
              >
                {
                  classes.map((classroom) => {
                    if (searhedClass === '' || (searhedClass && classroom.description.toLowerCase().includes(searhedClass))) {
                      return (
                        <GridListTile key={classroom.id}>
                          <Card>
                            <Card.Body>
                              <Link
                                className='b-card b-classes__class-btn'
                                to={
                                  role === 'admin'
                                  ?
                                    `/home-page/school/${schoolID}/class/${classroom.id}`
                                  :
                                    `/school/${schoolID}/class/${classroom.id}`
                                }
                              >
                                {classroom.description}
                              </Link>
                            </Card.Body>
                          </Card>
                        </GridListTile>
                      )
                    } else {
                      return null
                    }
                  })
                }
              </GridList>
            </React.Fragment>
          :
            <div className='b-classes__no-classes'>
              <Button
                className='b-button b-button--main b-classes__add-btn'
                onClick={handleOpenAdditionModal}
              >
                <AddIcon />
              </Button>  
              <div className='b-panel b-classes__no-classes-panel'>
                Классы не найдены
              </div>
            </div>
        }
      </Container>
      {
        isAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseAdditionModal}>
            <form className='b-admin-home-page__edit-form' onSubmit={(event) => handleAddClass(event)}>
              <TextField 
                label="Номер (11А)" 
                type='text'
                name='description'
                onChange={handleAddInputChange}
              />
              <Button 
                type='submit'
                className='b-button b-button--secondary b-admin-home-page__modal-save-btn'
                disabled={newClass.description === ''}
              >
                Добавить
              </Button>
            </form>
          </AdditionModal>
      }
    </React.Fragment>
  )
}

export default Classes

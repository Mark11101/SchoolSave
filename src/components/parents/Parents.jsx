import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import AdditionModal from '../subcomponents/addition-modal/AdditionModal'

import './Parents.css'

const Parents = (props) => {
  const {
    role,
    schoolID,
    parentsArray,
    requestParents,
    requestCreateParent,
  } = props;

  const parents = parentsArray.filter((parent) => parent.school_id === schoolID);

  const [searhedParent, setSearchedParent] = useState('');
  const [isAdditionModalVisible, setIsAdditionModalVisible] = useState(false);

  const [newParent, setNewParent] = useState({
    login: '',
    password: '',
    school_id: schoolID,
    contract: '',
    name: '',
  })

  React.useEffect(() => {

    requestParents(schoolID)
  }, [])

  const handleSearchedParentChange = (event) => {

    setSearchedParent(event.target.value.toLowerCase())
  }  

  const handleOpenAdditionModal = () => {

    setIsAdditionModalVisible(true)
  }

  const handleCloseAdditionModal = () => {

    setIsAdditionModalVisible(false)
  }

  const handleAddInputChange = (event) => {

    setNewParent({
      ...newParent,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddParent = (event) => {
    event.preventDefault()

    handleCloseAdditionModal()
    requestCreateParent(newParent, schoolID)
  }

  return (
    <React.Fragment>
      <Container className='b-parents'>
        {
          parents.length !== 0
          ?
            <React.Fragment>
              <div className='b-parents__control-panel'>
                <Button
                  className='b-button b-button--main b-parents__control-panel-add-btn'
                  onClick={handleOpenAdditionModal}
                >
                  <AddIcon />
                </Button>
                <TextField 
                  label="Поиск родителя" 
                  type='text'
                  variant='outlined'
                  className='b-parents__search'
                  onChange={handleSearchedParentChange}
                />
              </div>
              <ul className='b-list b-parents__list'>
                {
                  parents.map((parent) => {
                    if (searhedParent === '' || (searhedParent && parent.name.toLowerCase().includes(searhedParent))) {
                      return (
                        <li key={parent.id}>
                          <Link
                            to={
                              role === 'admin'
                              ?
                                '/home-page/school/' + schoolID + '/parent/' + parent.id
                              :
                                '/school/' + schoolID + '/parent/' + parent.id
                            }                    
                          >
                            {parent.name}
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
            <div className='b-parents__no-parents'>
              <Button
                className='b-button b-button--main b-parents__add-btn'
                onClick={handleOpenAdditionModal}
              >
                <AddIcon />
              </Button>  
              <div className='b-panel b-parents__no-parents-panel'>
                Родители не найдены
              </div>
            </div>
        }
      </Container>
      {
        isAdditionModalVisible
        &&
          <AdditionModal onHide={handleCloseAdditionModal}>
            <form className='b-admin-home-page__edit-form' onSubmit={(event) => handleAddParent(event)}>
              <TextField 
                label="Логин" 
                type='text'
                name='login'
                onChange={handleAddInputChange}
              />
              <TextField 
                label="Пароль" 
                type='password'
                name='password'
                onChange={handleAddInputChange}
              />
              <TextField 
                label="Номер договора" 
                type='text'
                name='contract'
                onChange={handleAddInputChange}
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
                  newParent.login     === '' || newParent.password === '' ||
                  newParent.contract  === '' || newParent.name     === ''
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

export default Parents

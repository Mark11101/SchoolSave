import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { useLocation } from 'react-router-dom'

import useDevice from '../../hooks/use-device/useDevice'
import DeviceTypes from '../../constants/DeviceTypes'
import SchoolIcon from '../../images/school.png'
import ClassRoomIcon from '../../images/classroom.png'
import ParentsIcon from '../../images/parents.png'
import CameraIcon from '../../images/camera.png'
import appendClassName from '../../utils/string/appendClassName'
import modifyClassName from '../../utils/string/modifyClassName'

import './NavigationBar.css'

const NavigationBar = (props) => {
  const {
    tabs,
    className,
    controlButtons = true,
    children,
    logOut,
  } = props;

  const [index, setIndex] = useState(0);

  const location   = useLocation();
  const deviceType = useDevice();
  
  const handleTabChange = (event, value) => {

    setIndex(value)
  }

  const handleIndexChange = (index) => {

    setIndex(index)
  }

  const handleLogOutButtonClick = (event) => {
    event.preventDefault()

    logOut()
  }

  const handleGoBackButtonClick = () => {
    
    window.history.back()
  }

  const outputIconTab = (tab) => {

    switch (tab) {
      case 'Школа':
        return <img src={SchoolIcon} alt='' />
      
      case 'Классы':
        return <img src={ClassRoomIcon} alt='' />

      case 'Родители':
        return <img src={ParentsIcon} alt='' />

      case 'Камеры':
        return <img src={CameraIcon} alt='' />
            
      default:
        break;
    }
  }

  const outputTabs = (tabs) => {
    
    return tabs.map((tab, index) => 
      <Tab 
        icon={
          deviceType !== DeviceTypes.DESKTOP && tabs.length > 3
          ?
            outputIconTab(tab)
          :
            tab
        } 
        key={index}
        className='b-nav-bar__item' 
        onClick={() => window.scrollTo(0, 0)}
      />
    )
  }

  // переписать хуйню  location.pathname.split('/')[1] !== 'parent'
  // через состояние redux

  const isParentOnParentPage = () => {

    const splitedPathname = location.pathname.split('/');

    return splitedPathname[1] === 'parent' && splitedPathname.length === 3
  }
  
  return (
    <div className={appendClassName('b-nav-bar', className)}>
      <div className={
        controlButtons
        ?
          modifyClassName('b-nav-bar__header', 'fixed-bottom-on-mobile')
        :
          'b-nav-bar__header'
      }>
        {
          location.pathname !== '/home-page' && !isParentOnParentPage() && controlButtons
          &&
            <Button 
              className='b-button b-button--blue b-nav-bar__go-back-btn'
              onClick={handleGoBackButtonClick}
            >
              <ArrowBackIcon />
            </Button>
        }
        <Tabs 
          value={index} 
          className='b-nav-bar__tabs'
          onChange={handleTabChange}
        >
          {outputTabs(tabs)}
        </Tabs>
        {
          controlButtons
          &&
            <Button 
              className='b-button b-button--secondary b-nav-bar__log-out-btn'
              onClick={(e) => handleLogOutButtonClick(e)}
            >
              <ExitToAppIcon />
            </Button>
        }
      </div>
      {
        controlButtons
        ?
          <SwipeableViews 
            index={index} 
            disabled={true}
            onChangeIndex={handleIndexChange}
          >
            {children}
          </SwipeableViews>
        :
          <div>
            {children}
          </div>
      }
    </div>
  )
}

export default NavigationBar

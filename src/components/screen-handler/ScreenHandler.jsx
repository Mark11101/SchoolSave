import React from 'react'

import NavigationBar from '../navigation-bar/NavigationBarContainer'
import School from '../school/SchoolContainer'
import Classes from '../classes/ClassesContainer'
import Parents from '../parents/ParentsContainer'
import Cameras from '../cameras/CamerasContainer'

const ScreenHandler = (props) => {
  const {
    match
  } = props;
  
  return (
    <NavigationBar tabs={['Школа', 'Классы', 'Родители', 'Камеры']}>
      <School  schoolID={match.params.id} />
      <Classes schoolID={match.params.id} />
      <Parents schoolID={match.params.id} />
      <Cameras schoolID={match.params.id} />
    </NavigationBar>
  )
}

export default ScreenHandler

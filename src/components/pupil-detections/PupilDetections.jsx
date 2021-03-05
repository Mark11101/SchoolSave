import React, { useState } from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import Checkbox from '@material-ui/core/Checkbox'
import moment from 'moment'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'

import './PupilDetections.css'

const PupilDetections = (props) => {
  const {
    id,
    detectionsArray,
    requestDetections,
    requestUpdateDetection,
  } = props;

  React.useEffect(() => {

    requestDetections(id)
  }, [])

  const [firstSelectedDate, setFirstSelectedDate]   = useState(moment().startOf('month').format('YYYY-MM-DD hh:mm'));
  const [secondSelectedDate, setSecondSelectedDate] = useState(moment().endOf('month').format('YYYY-MM-DD hh:mm'));

  const handleFirstDateChange = (date) => {
    
    setFirstSelectedDate(date);
  };

  const handleSecondDateChange = (date) => {
    
    setSecondSelectedDate(date);
  };
  
  const handleIsDetectionNotCorrectChange = (event, id) => {
    
    requestUpdateDetection(id, event.target.checked)
  }

  const idKey   = Object.keys(id)[0];
  const idValue = Object.values(id)[0];

  const filteredDetectionsById = detectionsArray.filter((detection) => {
    
    if (idKey === 'child_id') {
      return detection.child_id === idValue
    } else if (idKey === 'camera_id') {
      return detection.camera_id === idValue
    } else {
      return null
    }
  })

  return (
    <div className='b-pupil-detections'>
      <div className='b-pupil-detections__dates'>
        <small>С</small>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            format="dd/MM/yyyy"
            value={firstSelectedDate}
            onChange={handleFirstDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <small>По</small>
        <span className='b-pupil-detections__horizon-divider'>-</span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            format="dd/MM/yyyy"
            value={secondSelectedDate}
            onChange={handleSecondDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      {
        filteredDetectionsById.length !== 0
        ?
          <CardColumns className='b-pupil-detections'>
            {
              filteredDetectionsById.map((detection) => {

                const detectionDate = moment(detection.create_datetime).format('YYYY-MM-DD');
                const firstDate     = moment(firstSelectedDate).format('YYYY-MM-DD');
                const secondDate    = moment(secondSelectedDate).format('YYYY-MM-DD');

                if (moment(detectionDate).isBetween(firstDate, secondDate, null, '[]')) {
                  return (
                    <Card className='b-pupil-detections__card' key={detection.id}>
                      <Card.Img variant="top" src={detection.face_rect_image} />
                      <Card.Body>
                        <p>
                          <span>Дата: </span>
                          <span>{moment(detection.create_datetime).format('YYYY-MM-DD HH:MM:SS')}</span>
                        </p>
                        <p>
                          <span>Вероятность: </span>
                          <span>{detection.threshold}</span>
                        </p>
                        <p>
                          <span>Детекция некорректна: </span>
                            <Checkbox
                            checked={detection.isDetectionNotCorrect}
                            onChange={(event) => handleIsDetectionNotCorrectChange(event, detection.id)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </p>
                      </Card.Body>
                    </Card>
                  )
                }
              })
            }
          </CardColumns>   
        :          
          <div className='b-pupil-detections__no-detections'>
            Детекции не найдены
          </div>
      }
    </div>
  )
}

export default PupilDetections

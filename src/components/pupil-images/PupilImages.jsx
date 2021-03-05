import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card'

import './PupilImages.css'

const PupilImages = (props) => {
  const {
    pupilID,
    imagesArray,
    requestImages,
    requestDeleteImage,
  } = props;

  const images = imagesArray.filter((image) => image.child_id === pupilID);

  React.useEffect(() => {

    requestImages(pupilID)
  }, [])

  const handleDeleteImage = (id) => {
    
    requestDeleteImage(id, pupilID)
  }

  return (
    <React.Fragment>
      {
        images.length !== 0
        ?
          <CardColumns className='b-pupil-images'>
            {
              images.map((image) => 
                <Card className='b-pupil-images__card' key={image.id}>
                  <Card.Img variant="top" src={image.image} />
                  <Button
                      className='b-button b-button--danger b-pupil-images__delete-btn'
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <DeleteIcon />  
                    </Button>
                </Card>
              )
            }
          </CardColumns>          
        :
          <div className='b-pupil-images__no-images'>
            Изображения не найдены
          </div>
      }
    </React.Fragment>
  )
}

export default PupilImages

import { Card, Image } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { IPlace } from '../../types/reservation.interface'

type PlaceCardProps = {
  placeName: string;
}

const PlaceInformationCard = ({ placeName }: PlaceCardProps) => {
  const [placeInfo, setPlaceInfo] = useState<IPlace>({
    uuid: '',
    name: '',
    region: '',
    description: '',
    location: '',
    imageName: ''
  })
  const isPlaceImgExist = (placeInfo && placeInfo.imageName)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/place/name/${placeName}`).
      then(res => setPlaceInfo(res.data))
  }, [placeName])

  return (
    <Card fluid>
      <Image
        wrapped ui={false}
        src={isPlaceImgExist
          ? `${process.env.NEXT_PUBLIC_API}/place/image/${placeInfo.imageName}`
          : 'https://react.semantic-ui.com/images/wireframe/image.png'}
        alt={'place_image'}/>
      <Card.Content>
        <Card.Header>{placeInfo.name}</Card.Header>
        <Card.Meta>{placeInfo.location}</Card.Meta>
        <Card.Description>{placeInfo.description}</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default PlaceInformationCard;

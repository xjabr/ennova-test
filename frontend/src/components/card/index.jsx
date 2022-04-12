import React from 'react';
import { STORAGE_ENDPOINT } from '../../constants/ENDPOINTS';

import { CardBody, CardDescription, CardImage, CardName, CardPrice, CardWrapper } from './card.style';

const Card = ({
  _id,
  title,
  description,
  imagePath,
  lower,
  user,
  status,
  winnerUser
}) => {
  return (
    <CardWrapper as="a" href={`/collectible/${_id}`}>
      <CardImage src={`${STORAGE_ENDPOINT}/${imagePath.split('/').pop()}`} alt={title} />
      <CardBody>
        <CardName>{title} by {`${user[0].firstName} ${user[0].lastName}`}</CardName>
        <CardDescription>{description}</CardDescription>
        <CardPrice>
          {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(lower.price)}
        </CardPrice>
      </CardBody>
      {
        status === '1' && winnerUser.length !== 0 ?
        <>
          <hr />

          <p style={{ color: '#444', fontSize: 14}}>Vinta da {`${winnerUser[0].firstName} ${winnerUser[0].lastName}`}</p>
        </>
        : null
      }
    </CardWrapper>
  )
};

export default Card;
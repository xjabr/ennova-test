import React from 'react';
import moment from 'moment';

import { SingleCollectibleBid, SingleCollectibleBids, SingleCollectibleDescription, SingleCollectibleTitle, SingleCollectibleWrapper } from './single-collectible.style';

const SingleCollectible = ({
  title,
  description,
  bids,
  dateEnd,
  winnerUser,
  status,
  lower
}) => {
  return (
    <SingleCollectibleWrapper>
      <SingleCollectibleTitle>{title}</SingleCollectibleTitle>
      <SingleCollectibleDescription>{description}</SingleCollectibleDescription>
      <SingleCollectibleDescription>{moment(dateEnd) > moment() ? `Scade il: ${moment(dateEnd).format('DD/MM/YYYY hh:mm')}` : 'Asta chiusa'}</SingleCollectibleDescription>

      <hr />

      <h4>Lista delle offerte</h4>
      <SingleCollectibleBids>
        {
          bids.map((item, index) => {
            return (
              <SingleCollectibleBid key={index}>
                <h5>Mario Rossi - <span>{moment(item.date).fromNow()}</span></h5>
                <p>&euro; {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(item.price)}</p>
              </SingleCollectibleBid>
            )
          })
        }
      </SingleCollectibleBids>

      {
        status === '1' && winnerUser !== null ?
          <>
            <hr />

            <h4>Acquistata da</h4>
            <SingleCollectibleBids>
              <SingleCollectibleBid>
                <h5>{`${winnerUser[0].firstName} ${winnerUser[0].lastName}`} - <span>{moment(lower.date).fromNow()}</span></h5>
                <p>&euro; {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(lower.price)}</p>
              </SingleCollectibleBid>
            </SingleCollectibleBids>
          </>
          : null
      }
    </SingleCollectibleWrapper>
  )
};

export default SingleCollectible;
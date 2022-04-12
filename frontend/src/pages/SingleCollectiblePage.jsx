import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleCollectible from '../components/single-collectible';
import { STORAGE_ENDPOINT } from '../constants/ENDPOINTS';
import { useAuth } from '../contexts/auth.context';

import { useCollectible } from '../contexts/collectible.context';
import { errorsHandler } from '../utils';

const SingleCollectiblePage = () => {
  const { id } = useParams();
  
  const { user } = useAuth();
  const { getSingleCollectible, makeBid } = useCollectible();
  const [item, setItem] = useState(null);
  const [price, setPrice] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [canIMakeBid, setCanIMakeBid] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data, error } = await getSingleCollectible(id);
      if (error) return errorsHandler(error);
      setItem(data.result);

      setCanIMakeBid(
        data.result.status === '0' && data.result.userId !== user.id && data.result.lower.user !== user.id
      )
    }

    fetchData();
  }, [refresh]);

  const handleMakeBid = async () => {
    if (price === null || price === 0) return alert('Il prezzo inserito non è valido.');

    const { error } = await makeBid(id, price);
    if (error) return errorsHandler(error);

    setRefresh(x => x + 1);
  }

  return (
    <div className="container mt-5">
      {
        item ?
          <div className="row">
            <div className="col-md-5">
              <img className='w-100' src={`${STORAGE_ENDPOINT}/${item.imagePath.split('/').pop()}`} alt={item.title} />

              {
                canIMakeBid &&
                <>
                  <hr />

                  <h4 className='mb-3'>Fai un'offerta</h4>
                  <input className='form-control' placeholder='0.00' type='number' step='0.01' max={item.lower.price - (item.lower.price * 0.02)} onChange={e => setPrice(e.target.value)} />
                  <input onClick={handleMakeBid} type="button" value="Conferma" className='btn btn-dark mt-2' />
                </>
              }
            </div>
            <div className="col-md-7">
              <SingleCollectible {...item} />
            </div>
          </div>
          : 'Caricamento...'
      }
    </div>
  )
};

export default SingleCollectiblePage;
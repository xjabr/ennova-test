import React, { useEffect, useState } from 'react';

import Card from '../components/card';
import { useCollectible } from '../contexts/collectible.context';
import { errorsHandler } from '../utils';
import Dropdown from '../ui-components/dropdown';

const Home = () => {
  const { getCollectibles } = useCollectible();
  const [items, setItems] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getCollectibles({ status });
      if (error) return errorsHandler(error);
      setItems(data.result);
      console.log(data);
    }

    fetchData();
  }, [status]);


  return (
    <div className="container mt-5">
      <Dropdown
        options={
          [
            { name: 'Tutte', value: null },
            { name: 'Attive', value: 0 },
            { name: 'Scadute', value: 1 },
          ]
        }
        onChange={i => setStatus(i.value)}
        defaultValue={null}
        placeholder="Mostra" />

      <hr />

      <div className='row'>
        {
          items && items.map((item, index) => {
            return (
              <div className='col-md-4 mb-5'>
                <Card key={index} {...item} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default Home;
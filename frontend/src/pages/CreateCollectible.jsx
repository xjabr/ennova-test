import React, { useState } from 'react';

import { useCollectible } from '../contexts/collectible.context';
import { errorsHandler } from '../utils';

const CreateCollectible = () => {
  const { createCollectible } = useCollectible();

  const [data, setData] = useState({
    title: null,
    description: null,
    startPrice: 0,
    dateEnd: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('startPrice', data.startPrice);
    formData.append('dateEnd', data.dateEnd);
    formData.append('image', e.target[0].files[0]);

    const { error } = await createCollectible(formData);
    if (error) return errorsHandler(error);

    window.location.href = '/';
  }

  return (
    <div className="container mt-5">
      <h1>Crea un'asta</h1>

      <form className='form-min' encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-12 mb-3">
            <label htmlFor="image" className='mb-1'>Immagine</label>
            <input id="image" name="image" className='form-control' type="file" accept="image/*" />
          </div>

          <div className="col-md-6">
            <label htmlFor="title" className='mb-1'>Titolo</label>
            <input id="title" name="title" className='form-control' type="text" onChange={e => setData({ ...data, title: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label htmlFor="description" className='mb-1'>Descrizione</label>
            <input id="description" name="description" className='form-control' type="text" onChange={e => setData({ ...data, description: e.target.value })} />
          </div>

          <div className="col-md-6 mt-2">
            <label htmlFor="start-price" className='mb-1'>Prezzo iniziale</label>
            <input id="start-price" name="startPrice" className='form-control' type="number" step="0.01" onChange={e => setData({ ...data, startPrice: e.target.value })} />
          </div>

          <div className="col-md-6 mt-2">
            <label htmlFor="date-end" className='mb-1'>Data scadenza</label>
            <input id="date-end" name="dateEnd" className='form-control' type="datetime-local" onChange={e => setData({ ...data, dateEnd: e.target.value })} />
          </div>

          <div className="col-md-6">
            <input type="submit" value="Conferma" className='btn btn-dark mt-3' />
          </div>
        </div>
      </form>
    </div>
  )
};

export default CreateCollectible;
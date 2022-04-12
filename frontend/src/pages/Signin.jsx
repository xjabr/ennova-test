import React, { useState } from 'react';

import { useAuth } from '../contexts/auth.context';
import { errorsHandler } from '../utils';

const Signin = () => {
  const { signin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await signin({ email, password });
    if (error) return errorsHandler(error);

    localStorage.setItem('access_token', data.token);
    window.location.href = '/';
  }

  return (
    <div className="container mt-5">
      <h1>Accedi</h1>
      <form className='form-min' onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="email" className='mb-1'>Email</label>
            <input id="email" className='form-control' type="text" onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className='mb-1'>Password</label>
            <input id="password" className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
          </div>

          <div className="col-md-6">
            <input type="submit" value="Accedi" className='btn btn-dark mt-3' />
          </div>
        </div>
      </form>
    </div>
  )
};

export default Signin;
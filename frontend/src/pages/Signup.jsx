import React, { useState } from 'react';

import { useAuth } from '../contexts/auth.context';
import { errorsHandler } from '../utils';

const Signup = () => {
  const { signup } = useAuth();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signup({ firstName, lastName, email, password });
    if (error) return errorsHandler(error);

    window.location.href = '/signin';
  }

  return (
    <div className="container mt-5">
      <h1>Accedi</h1>
      <form className='form-min' onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="first-name" className='mb-1'>Nome</label>
            <input id="first-name" className='form-control' type="text" onChange={e => setFirstName(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="last-name" className='mb-1'>Cognome</label>
            <input id="last-name" className='form-control' type="text" onChange={e => setLastName(e.target.value)} />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className='mb-1'>Email</label>
            <input id="email" className='form-control' type="email" onChange={e => setEmail(e.target.value)} />
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

export default Signup;
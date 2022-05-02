import React from 'react';
import './index.css';

export default function Index({ name, email, body }) {
  return (
    <div className='wrap'>
      <div className='top'>
        <h3>{name}</h3>
        <h5>{email}</h5>
      </div>
      <div className='bottom'>{body}</div>
    </div>
  );
}

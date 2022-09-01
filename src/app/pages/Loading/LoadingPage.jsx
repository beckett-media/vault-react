import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

export const Loading = () => (
  <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
    <LoadingSpinner></LoadingSpinner>
  </div>
);

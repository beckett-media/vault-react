import React from 'react';
import { Button } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className='page-wrapper'>
      <div className='d-flex flex-column align-items-center'>
        <Link to='/admin/submission'>
          <Button variant='link'>Submissions</Button>
        </Link>
        <Link to='/admin/vaulting'>
          <Button variant='link'>Vaulting</Button>
        </Link>
        <Link to='/admin/create-account'>
          <Button variant='link'>Create User Account</Button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;

import React, { useEffect, useState } from 'react';
import { Col, Row, Carousel } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import SubmitButton from '../../components/Generic/SubmitButton';

const AdminPage = () => {
  const navigate = useNavigate();
  const handleOpenSubmissionsClick = () => {
    navigate('/admin/submission');
  };

  const handleOpenVaultingClick = () => {
    navigate('/admin/vaulting');
  };

  return (
    <div className='page-wrapper'>
      <Row>
        <SubmitButton bg="link" func={handleOpenSubmissionsClick} title='Submissions' />
        <SubmitButton bg="link" func={handleOpenVaultingClick} title='Valuting' />
      </Row>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;

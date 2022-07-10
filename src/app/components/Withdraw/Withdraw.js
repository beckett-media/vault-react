import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import './Withdraw.scss';
import { getItem } from '../../services/items';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitButton from '../Generic/SubmitButton';
import { AuthStatus, AuthContext } from '../../contexts/auth';

const Withdraw = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      TODO
    </div>
  );
};

export default Withdraw;

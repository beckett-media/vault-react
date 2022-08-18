import { Input, FormControl, Button} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendCode } from '../../libs/cognito';
import { useValidEmail } from './SignIn';
import './SignIn.scss'

const ForgotPassword = ({showForgotPWModal, dismissModal, codeSent, setCodeSent}) => {
  const { email, setEmail, emailIsValid } = useValidEmail('');
  const [error, setError] = useState('')
  const submitPasswordResetForm = () => {
    if (emailIsValid) {
      sendCode('email')
      setCodeSent(true)
    }
    else setError('Email is Invalid')
  }
  const dismiss = () => {
    dismissModal(true)
  }

  return (
    <Modal show={showForgotPWModal} dismiss={dismissModal}>
      <Modal.Header>
        <div className='signin_heading'>Reset Password</div>
        <CloseButton onClick={() => dismiss()} />
      </Modal.Header>
      {!codeSent && <Modal.Body className='forgot-pw-modal-body'>
        <FormControl>
          <Input
            id='email'
            type='email'
            placeholder='Email Address*'
            h={12}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        {error && <div className='signin_error'>{error}</div>}
        <div onClick={()=>submitPasswordResetForm()} className='signin_button'>
          Send Code
        </div>
        <div className='signin_modal'>
          <Button
            className='signin_link'
            variant='link'
            color='#BDBDBD'
            fontWeight='400'
            fontSize='14px'
            _focus={{ boxShadow: 'none' }}
            onClick={() => {
              setCodeSent(true);
              dismissModal(true);
            }}>
            I already have a code.
          </Button>
          </div>
      </Modal.Body>}
      {codeSent && <Modal.Body><div className='code-sent'>Code sent to {email}</div></Modal.Body>}
    </Modal>
  );
};

export default ForgotPassword;

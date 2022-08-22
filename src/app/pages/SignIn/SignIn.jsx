import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { Button, FormControl, Checkbox, Input } from '@chakra-ui/react';

import './SignIn.scss';

import { AuthContext, AuthStatus } from '../../contexts/auth';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { ReactComponent as SigninBg } from '../../assets/bg-sphere--large.svg';
import ForgotPassword from './ForgotPassword';
import { CloseButton, Modal, Spinner } from 'react-bootstrap';
import { forgotPassword, resendConfirmationCode } from '../../libs/cognito';

export const useValidEmail = (initialValue) => {
  const [email, setEmail] = useState(initialValue);
  const [emailIsValid, setEmailIsValid] = useState(true);

  useEffect(() => {
    const emailSchema = yup.object().shape({
      email: yup.string().email().required(),
    });

    if (email.length === 0) {
      setEmailIsValid(true);
      return;
    }

    const isValid = emailSchema.isValidSync({
      email,
    });

    setEmailIsValid(isValid);
  }, [email]);

  return {
    email,
    setEmail,
    emailIsValid,
  };
};

export const useValidPassword = (initialValue) => {
  const [password, setPassword] = useState(initialValue);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  useEffect(() => {
    const passwordSchema = yup.object().shape({
      password: yup.string().min(8).required(),
    });

    if (password.length === 0) {
      setPasswordIsValid(true);
      return;
    }

    const isValid = passwordSchema.isValidSync({
      password,
    });

    setPasswordIsValid(isValid);
  }, [password]);

  return {
    password,
    setPassword,
    passwordIsValid,
  };
};

export const useValidUsername = (initialValue) => {
  const [username, setUsername] = useState(initialValue);
  const [usernameIsValid, setUsernameIsValid] = useState(true);

  useEffect(() => {
    const usernameSchema = yup.object().shape({
      username: yup.string().min(8).required(),
    });

    if (username.length === 0) {
      setUsernameIsValid(true);
      return;
    }

    const isValid = usernameSchema.isValidSync({
      username,
    });

    setUsernameIsValid(isValid);
  }, [username]);

  return {
    username,
    setUsername,
    usernameIsValid,
  };
};

export const useValidCode = (initialValue) => {
  const [code, setCode] = useState(initialValue);
  const [codeIsValid, setCodeIsValid] = useState(true);

  useEffect(() => {
    const codeSchema = yup.object().shape({
      code: yup.string().min(6).required(),
    });

    if (code.length === 0) {
      setCodeIsValid(true);
      return;
    }

    const isValid = codeSchema.isValidSync({
      code,
    });

    setCodeIsValid(isValid);
  }, [code]);

  return {
    code,
    setCode,
    codeIsValid,
  };
};

const SignIn = () => {
  const { email, setEmail, emailIsValid } = useValidEmail('');
  const { password, setPassword, passwordIsValid } = useValidPassword('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = useState('');
  const { msg } = useLocation();
  const [message, setMessage] = useState(msg);
  const [showForgotPassword, toggleForgotPassword] = useState(false);
  const dismissModal = () => toggleForgotPassword(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');

  const isValid = !emailIsValid || email.length === 0 || !passwordIsValid || password.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    setMessage('Loading');
    try {
      await authContext.signInWithEmail(email, password);
    } catch (err) {
      setMessage('')
      if (err.code === 'NotAuthorizedException') {
        setError('Verify username/password or check confirmation email');
      } else if (err.code === 'UserNotConfirmedException') {
        setError('Check email for verification.');
      } else {
        setError(err.message);
      }
    }
  };
  const checkPassword = () => {
    return newPassword === confirmPassword;
  };

  const createNewPasswordClicked = async () => {
    try {
      if (!checkPassword()) {
        throw Error('Passwords do not match!');
      }
      await authContext.signInWithEmail(email, password, newPassword);
    } catch (err) {
      setError(err.message);
    }
  };

  const submitForgotPassword = async () => {
    await forgotPassword(email, code, confirmPassword)
      .then((res) => {
        if(res === 'password updated'){
          setMessage('Password reset success!');
        }
      })
      .catch((err) => {
        if (err.code === 'ExpiredCodeException') {
          setError('Expired Validation Code - try again.');
        } else if (err.code === 'LimitExceededException') {
          setError('Request Limit Exceeded - Try again later');
        } else {
          setError('Error occurred.');
        }
      });
  };
  const confirmPasswordMatch = (pw) => {
    if(pw !== password){
      setError("Passwords don't match")
    } else setError('')
    setConfirmPassword(pw)
  }
  const dismissPasswordReset = () => {
    setMessage('')
    setCodeSent(false)
  }

  return (
    <div className='page-wrapper vh-100'>
      <section className='section_signin'>
        <SigninBg className='signin_bg'></SigninBg>
        <div className='signin_modal'>
          <div className='signin_heading'>Login</div>
          {!(authContext.authStatus === AuthStatus.SetPassword) && !codeSent && (
            <>
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
              <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <>
                <div className='signin_error'>{error}</div>
                <div className='signin_reverify' onClick={()=>resendConfirmationCode(email) }>Resend Validation Email</div>
              </>}
              {message === 'Loading' && <><Spinner animation="border" role="status"/><span>Loading...</span></>}
              <Checkbox marginTop='12px' alignSelf='start' size='sm' colorScheme='gray' className='signin_checkbox'>
                Remember me
              </Checkbox>
            </>
          )}
          {authContext.authStatus === AuthStatus.SetPassword && (
            <>
              <PasswordField
                label={authContext.authStatus === AuthStatus.SetPassword ? 'New password' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <NewPasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </>
          )}
          {codeSent && (
            <>
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
              <FormControl>
                <Input
                  id='code'
                  type='code'
                  placeholder='Code'
                  h={12}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </FormControl>
              <PasswordField
                value={password}
                placeholder='New Password**'
                onChange={(e) => setPassword(e.target.value)}
              /> <FormControl>
              <PasswordField
                placeholder='Confirm Password**'
                value={confirmPassword}
                onChange={(e) => confirmPasswordMatch(e.target.value)}
              />
            </FormControl>
            {error && <div className='signin_error'>{error}</div>}
           {error ?
            <div className='signin_muted'>
              Continue
            </div> :
            <div onClick={() => submitForgotPassword()} className='signin_button'>
              Continue
            </div>}
            </>
          )}
          {codeSent && (
            <Modal show={message === 'Password reset success!'}>
              <Modal.Header>
                <CloseButton onClick={() => dismissPasswordReset()} />
              </Modal.Header>
              <Modal.Body>
                <div className='code-sent'>Password reset successful!</div>
              </Modal.Body>
            </Modal>
          )}
          {!(authContext.authStatus === AuthStatus.SetPassword) && !codeSent && (
            <div onClick={signInClicked} className='signin_button'>
              Continue
            </div>
          )}
          {authContext.authStatus === AuthStatus.SetPassword && (
            <Button
              onClick={() => {
                createNewPasswordClicked();
              }}
              my={6}
              borderRadius={100}
              w={200}
              h={12}
              background='linear-gradient(to right, #C1F8E3, #6CD7D4)'
              color={'black'}
              fontWeight={'bold'}
              _focus={{ boxShadow: 'none' }}
              isLoading={authContext.authStatus === AuthStatus.Loading}
            >
              Create Password
            </Button>
          )}
          {!codeSent && (
            <Button
              className='signin_link'
              variant='link'
              color='#BDBDBD'
              fontWeight='400'
              fontSize='14px'
              _focus={{ boxShadow: 'none' }}
              onClick={() => {
                toggleForgotPassword(true);
              }}
            >
              Forgot Password
            </Button>
          )}
          <ForgotPassword
            showForgotPWModal={showForgotPassword}
            dismissModal={dismissModal}
            codeSent={codeSent}
            setCodeSent={setCodeSent}
          />
          <div>
            <Link to='/signup' className='signin_link'>
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;

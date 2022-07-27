import React, { useState, useContext, useEffect } from 'react';
import * as yup from 'yup';
import { Button, FormControl, Checkbox, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import './SignIn.scss';

import { AuthContext, AuthStatus } from '../../contexts/auth';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { ReactComponent as SigninBg } from '../../assets/bg-sphere--large.svg';

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

  const isValid = !emailIsValid || email.length === 0 || !passwordIsValid || password.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(email, password);
    } catch (err) {
      console.log(err);
      if (err.code === 'UserNotConfirmedException') {
        navigate('/verify');
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

  const passwordResetClicked = async () => {
    navigate('requestcode');
  };

  return (
    <div className='page-wrapper vh-100'>
      <section className='section_signin'>
        <SigninBg className='signin_bg'></SigninBg>
        <div className='signin_modal'>
          <div className='signin_heading'>Login</div>
          <div className='signin_sub-heading'>{`Don't have an account?`}</div>
          <Button
            className='signin_link'
            variant='link'
            colorScheme='blue'
            textDecoration='underline'
            marginBottom='32px'
            _focus={{ boxShadow: 'none' }}
            onClick={() => {
              window.location.replace('https://www.beckettvault.com/');
            }}
          >
            Join the early access
          </Button>
          {error && (
            <Text color='red.500' fontSize='sm'>
              {error}
            </Text>
          )}
          {!(authContext.authStatus === AuthStatus.SetPassword) && (
            <>
              <FormControl>
                <Input
                  borderRadius='2'
                  borderColor='#C5C5C5'
                  id='email'
                  type='email'
                  placeholder='Email Address*'
                  h={12}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
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
          {!(authContext.authStatus === AuthStatus.SetPassword) && (
            <Button
              onClick={signInClicked}
              mt={6}
              mb={4}
              borderRadius={4}
              w={'100%'}
              h={12}
              background='linear-gradient(to right, #C1F8E3, #6CD7D4)'
              color={'black'}
              fontWeight={'bold'}
              _focus={{ boxShadow: 'none' }}
              isLoading={authContext.authStatus === AuthStatus.Loading}
            >
              Continue
            </Button>
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
          <Button
            className='signin_link'
            variant='link'
            textDecoration='underline'
            color='#BDBDBD'
            fontWeight='400'
            fontSize='14px'
            _focus={{ boxShadow: 'none' }}
            onClick={() => {
              console.log('success!');
            }}
          >
            Forgot Password
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SignIn;

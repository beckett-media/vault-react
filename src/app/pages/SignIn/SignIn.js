import React, { useState, useContext, useEffect } from 'react';

import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthStatus } from '../../contexts/auth';
import BackgroundPattern1280w from '../../assets/Background_Pattern_1280_w.svg';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';

import './SignIn.scss';

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
    <Box
      w={'100%'}
      h={'100vh'}
      background='linear-gradient(to bottom, #494752 10%, #493C6F 100%)'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        bg={'#0C0822'}
        style={{
          zIndex: 6,
          position: 'absolute',
          width: '100%',
          height: '80px',
        }}
      >
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
          <Image
            onClick={() => {
              navigate('/');
            }}
            style={{ cursor: 'pointer' }}
            src={require('../../assets/logoTop.png')}
            alt='logo'
            width={180}
          />
        </Box>
      </Box>
      <Box
        w={'100%'}
        h={'100%'}
        backgroundImage={`url(${BackgroundPattern1280w})`}
        backgroundRepeat='no-repeat'
        backgroundSize='cover'
        backgroundPosition='center center'
        alignItems='center'
        justifyContent='center'
        display={'flex'}
      >
        <Container py={25} px={14}>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={'#212022'}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center' mb={7}>
                <Heading
                  fontSize={25}
                  fontWeight={600}
                  color='white'
                  size={useBreakpointValue({ base: 'xs', md: 'sm' })}
                >
                  LOGIN
                </Heading>
                <div>
                  <Text color='white'>{`Don't have an account?`}</Text>
                  <Button
                    variant='link'
                    colorScheme='blue'
                    _focus={{ boxShadow: 'none' }}
                    onClick={() => {
                      navigate('/signup');
                    }}
                  >
                    Join the waiting list
                  </Button>
                </div>
              </Stack>
            </Stack>
            <Stack spacing='6'>
              <Stack spacing='5'>
                {error && (
                  <Text color='red.500' fontSize='sm'>
                    {error}
                  </Text>
                )}
                {!(authContext.authStatus === AuthStatus.SetPassword) && (
                  <>
                    <FormControl>
                      <FormLabel htmlFor='email' color='white'>
                        Email
                      </FormLabel>
                      <Input
                        borderColor={'transparent'}
                        id='email'
                        type='email'
                        bg='#42404D'
                        color='#ffffff'
                        h={12}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
                  </>
                )}
                {authContext.authStatus === AuthStatus.SetPassword && (
                  <>
                    <PasswordField
                      prefix={authContext.authStatus === AuthStatus.SetPassword ? 'New' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <NewPasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </>
                )}
              </Stack>
              <Box display={'flex'} justifyContent={'center'}>
                {!(authContext.authStatus === AuthStatus.SetPassword) && (
                  <Button
                    onClick={signInClicked}
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
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        bg={'#0C0822'}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '80px',
        }}
      >
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
          <Image src={require('../../assets/logoDown.png')} alt='logo' />
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;

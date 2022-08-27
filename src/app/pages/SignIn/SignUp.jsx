import { Button, FormControl, Input } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as SigninBg } from '../../assets/bg-sphere--large.svg';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { AuthContext } from '../../contexts/auth';
import { defaultNewUser, requiredNewUserProperties, submitNewUser } from '../../services/user';
import { hasRequiredProperties } from '../../utils/objects';
import { formatPhoneNumber } from '../../utils/phone';
import './SignIn.scss';

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const [newUser, setNewUser] = useState(defaultNewUser);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(undefined);
  const navigate = useNavigate();

  const formatErrMessageFromBackend = (message) => {
    if (message.includes('PreSignUp failed with error')) {
      return message.slice('PreSignUp failed with error'.length);
    }
    return message;
  };

  const submitSignUpForm = () => {
    setError('');
    try {
      const phone = formatPhoneNumber(newUser.phone);
      if (newUser.password != confirmPassword) {
        setError('Passwords must match');
      } else if (!hasRequiredProperties(newUser, requiredNewUserProperties)) {
        setError('all Fields are required');
      } else {
        submitNewUser({ ...newUser, phone: phone }, authContext).then(
          (res) => {
            if (res?.user?.username) {
              navigate('/signin', { msg: 'Check your email to verify your account, then login' });
            } else setError(res);
          },
          (err) => {
            setError(formatErrMessageFromBackend(err.message));
          },
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className='page-wrapper vh-100'>
      <section className='section_signin section_signup'>
        <SigninBg className='signin_bg'></SigninBg>
        <div className='signin_modal'>
          <div className='signin_heading'>Sign Up</div>
          <FormControl autoComplete='off'>
            {error && <div className='signin_error'>{error}</div>}
            {/* Chrome attempts to input username and password. I set email to 
            username, assuming that most users will sign in with email, and therefore
            chrome will assign email to username. */}
            <Input
              id='email'
              type='email'
              placeholder='Email *'
              autoComplete='username'
              h={12}
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              id='userName'
              type='text'
              placeholder='Username *'
              h={12}
              value={newUser.userName}
              onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
            />
            <Input
              id='phone'
              type='text'
              placeholder='Phone number *'
              h={12}
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <Input
              id='firstName'
              type='text'
              placeholder='First name *'
              h={12}
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <Input
              id='lastName'
              type='text'
              placeholder='Last name *'
              autoComplete='off'
              h={12}
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
          </FormControl>
          <PasswordField
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <NewPasswordField
            label='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* TODO: move the CSS below into the style sheet */}
          <Button
            onClick={() => {
              submitSignUpForm();
            }}
            my={6}
            borderRadius={100}
            w={200}
            h={12}
            background='linear-gradient(to right, #C1F8E3, #6CD7D4)'
            color={'black'}
            fontWeight={'bold'}
            _focus={{ boxShadow: 'none' }}
          >
            Sign Up!
          </Button>
          <div>
            <Link to='/signin' className='signin_link'>
              Back to Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

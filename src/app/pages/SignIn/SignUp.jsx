import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { ReactComponent as SigninBg } from '../../assets/bg-sphere--large.svg';
import { Button, FormControl, Input } from '@chakra-ui/react';
import { defaultNewUser, requiredNewUserProperties } from '../../services/user';
import './SignIn.scss';

const SignUp = () => {
  const [newUser, setNewUser] = useState(defaultNewUser);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(undefined);
  const navigate = useNavigate();
  const submitSignUpForm = async () => {
    setError('');
    if (newUser.password != confirmPassword) {
      setError('Passwords must match');
    } else if (!hasRequiredProperties(newUser, requiredNewUserProperties)) {
      setError('all Fields are required');
    } else {
      submitNewUser(newUser)
        .then(navigate('/signin', { msg: 'Check your email to verify your account, then login' }))
        .catch((err) => setError(err));
    }
  };

  return (
    <div className='page-wrapper vh-100'>
      <section className='section_signin section_signup'>
        {error && <div className='signin_error'>{error}</div>}
        <SigninBg className='signin_bg'></SigninBg>
        <div className='signin_modal'>
          <div className='signin_heading'>Sign Up</div>
          <FormControl>
            <Input
              id='email'
              type='email'
              placeholder='Email Address*'
              h={12}
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              id='userName'
              type='userName'
              placeholder='UserName*'
              h={12}
              value={newUser.userName}
              onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
            />
            <Input
              id='phone'
              type='phone'
              placeholder='phone*'
              h={12}
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <Input
              id='firstName'
              type='firstName'
              placeholder='firstName*'
              h={12}
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <Input
              id='lastName'
              type='lastName'
              placeholder='lastName*'
              h={12}
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
          </FormControl>
          <PasswordField
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <NewPasswordField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
        </div>
      </section>
    </div>
  );
};

export default SignUp;

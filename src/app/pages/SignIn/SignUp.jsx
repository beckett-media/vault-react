import React, { useContext, useState } from 'react';
import { Button, FormControl, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SigninBg } from '../../assets/bg-sphere--large.svg';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { defaultNewUser, requiredNewUserProperties, submitNewUser } from '../../services/user';
import { hasRequiredProperties } from '../../utils/objects';
import './SignIn.scss';
import { AuthContext } from '../../contexts/auth';
import { validPhone } from '../../utils/validationRegex';

const SignUp = () => {
  const authContext = useContext(AuthContext)
  const [newUser, setNewUser] = useState(defaultNewUser);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(undefined);
  const navigate = useNavigate();

  const formatPhoneNumber = (phone) => {
    if(phone.slice(0,2) !== '+1'){
      if(validPhone.test(phone)){
        return '+1' + phone
      }
    }
    else if(!validPhone.test(newUser.phone.slice(2))){
      setError({message: 'Invalid phone number format.'})
    }
    else return phone
  }
  
  const submitSignUpForm = () => {
    const phone = formatPhoneNumber(newUser.phone)
    setError('');
    if (newUser.password != confirmPassword) {
      setError('Passwords must match');
    } else if (!hasRequiredProperties(newUser, requiredNewUserProperties)) {
      setError('all Fields are required');
    } else {
      submitNewUser({...newUser, phone: phone}, authContext)
        .then((res) => {
          console.log('what is it?',res?.user?.username)
          if(res?.user?.username){ 
            navigate('/signin', { msg: 'Check your email to verify your account, then login' })
          }
          else setError(res)
        })
    }
  };
  return (
    <div className='page-wrapper vh-100'>
      <section className='section_signin section_signup'>
        {error && <div className='signin_error'>{error.message}</div>}
        <SigninBg className='signin_bg'></SigninBg>
        <div className='signin_modal'>
          <div className='signin_heading'>Sign Up</div>
          <FormControl>
            <Input
              id='email'
              type='email'
              placeholder='Email *'
              h={12}
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              id='userName'
              type='userName'
              placeholder='Username *'
              h={12}
              value={newUser.userName}
              onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
            />
            <Input
              id='phone'
              type='phone'
              placeholder='Phone number *'
              h={12}
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <Input
              id='firstName'
              type='firstName'
              placeholder='First name *'
              h={12}
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <Input
              id='lastName'
              type='lastName'
              placeholder='Last name *'
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

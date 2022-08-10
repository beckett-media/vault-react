import React, { useState, useContext, useEffect } from 'react';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { ReactComponent as SigninBg } from '../../assets/bg-sphere--large.svg';
import { Button, FormControl, Checkbox, Input } from '@chakra-ui/react';

import './SignIn.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // EXAMPLE OF HOW TO SIGNUP USER
  // const username= "testUser"
  // await authContext.signUpUser(username, "test123!", username, "test@beckett.com", "+44111222333", "FirstName", "LastName")


  return (
    <div className='page-wrapper vh-100'>
      <section className='section_signin'>
        <SigninBg className='signin_bg'></SigninBg>
        <div className='signin_modal'>
          <div className='signin_heading'>Sign Up</div>
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
        </div>
      </section>
    </div>
  );
};

export default SignUp;

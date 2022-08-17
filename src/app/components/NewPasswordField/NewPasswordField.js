import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

export const NewPasswordField = React.forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor='password' color={'white'} className='confirm_password_label'>
        Confirm Password
      </FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant='link'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          h={12}
          id='newPassword'
          ref={mergeRef}
          name='password'
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          required
          value={props.value}
          onChange={props.onChange}
          placeholder='Confirm password *'
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
});

NewPasswordField.displayName = 'PasswordField';

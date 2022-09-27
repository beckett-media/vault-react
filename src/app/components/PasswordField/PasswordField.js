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

export const PasswordField = React.forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const { value, onChange, label, color } = props;

  return (
    <FormControl>
      {!!label && (
        <FormLabel htmlFor='password' color={color}>
          {label}
        </FormLabel>
      )}
      <InputGroup display='flex' alignItems='center'>
        <InputRightElement height='100%'>
          <IconButton
            variant='link'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          h={12}
          placeholder={props.placeholder || 'Password *'}
          id='password'
          ref={mergeRef}
          name='password'
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          required
          color={color}
          value={props.value}
          onChange={props.onChange}
        />
      </InputGroup>
    </FormControl>
  );
});

PasswordField.defaultProps = {
  color: 'black',
};

PasswordField.displayName = 'PasswordField';

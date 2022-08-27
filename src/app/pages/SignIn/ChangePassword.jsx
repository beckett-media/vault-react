import { useContext, useState } from 'react';
import { CloseButton, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NewPasswordField } from '../../components/NewPasswordField/NewPasswordField';
import { PasswordField } from '../../components/PasswordField/PasswordField';
import { AuthContext } from '../../contexts/auth';

const ChangePassword = ({ showModal, dismissModal, setShowModal }) => {
  const [oldPassword, setOldPassword] = useState(undefined);
  const [newPassword, setNewPassword] = useState(undefined);
  const [confirmNewPassword, setConfirmNewPassword] = useState(undefined);
  const [pwIsValid, setPWIsValid] = useState(undefined);
  const [error, setError] = useState(undefined);
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const submitChangePasswordForm = async () => {
    if (!error?.message && pwIsValid) {
      try {
        await authContext.changePassword(oldPassword, 'badpassword');
        navigate('/my-collection');
      } catch (err) {
        if (err.name === 'LimitExceededException') {
          setError({ name: err.name, message: 'Please try again later.' });
        } else if (err.name === 'NotAuthorizedException') {
          setError({ name: err.name, message: 'You entered your old password incorreclty. Try again.' });
        }
      }
    }
  };

  const tryAgain = () => {
    setError(undefined);
  };

  const dismiss = () => {
    setShowModal(false);
  };

  const validateNewPassword = (tempPW) => {
    setNewPassword(tempPW);
    const pwFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const validate = pwFormat.test(tempPW);
    setPWIsValid(validate);
  };
  const checkConfirmNewPassword = (tempPW) => {
    setConfirmNewPassword(tempPW);
    if (newPassword !== tempPW) {
      setError({ name: 'PasswordsDoNotMatch', message: 'Passwords do not match.' });
    } else setError({ name: '', message: '' });
  };
  const updateOldPassword = (oldPW) => {
    setOldPassword(oldPW);
    if (error?.name === 'NotAuthorizedException') {
      setError({ name: '', message: '' });
    }
  };
  return (
    <Modal show={showModal} dismiss={dismissModal}>
      <Modal.Header>
        <div className='signin_heading'>Change Password</div>
        <CloseButton onClick={() => dismiss()} />
      </Modal.Header>
      <Modal.Body className='signin_body'>
        <>
          <PasswordField
            label='Old Password'
            color='black'
            value={oldPassword}
            onChange={(e) => updateOldPassword(e.target.value)}
          />
          <NewPasswordField
            label='New Password'
            dark
            value={newPassword}
            onChange={(e) => validateNewPassword(e.target.value)}
          />
          {!pwIsValid && pwIsValid !== undefined && (
            <div className='signin_error'>
              Password must be a combination of at least 8 letters, numbers, and special characters.
            </div>
          )}
          <NewPasswordField
            label='Confirm New Password'
            dark
            value={confirmNewPassword}
            onChange={(e) => checkConfirmNewPassword(e.target.value)}
            disabled={!pwIsValid}
          />
          {error?.message && <div className='signin_error'>{error?.message}</div>}
          <div
            onClick={submitChangePasswordForm}
            className={pwIsValid && !error?.message.length && error !== undefined ? 'signin_button' : 'signin_muted'}
          >
            Update Password
          </div>
        </>
      </Modal.Body>
      {error?.length === 0 && (
        <Modal.Body>
          <div className='code-sent'>You've successfully updated your password!</div>
        </Modal.Body>
      )}
    </Modal>
  );
};

export default ChangePassword;

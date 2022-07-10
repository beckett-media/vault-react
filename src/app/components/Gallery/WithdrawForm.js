import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withdrawFormSelector } from '../../state/selectors';

const WithdrawForm = (props) => {
  const form = useSelector(withdrawFormSelector);
  const [reason, setReason] = React.useState('');
  console.log('form contents', form);

  const formItems = () =>
  form.items.map(
      (item) =>
        (
          <div key={item.id}>
            {item.id} - {item.title}
            <br />
          </div>
        ),
    );

  return (
    <>
      <div>{props.title}</div>
      <div className="mt-4 mb-4">
        {formItems()}
      </div>

      <p>Specify a reason to withdraw if you want:</p>
      <input
        id='reason'
        type='text'
        value={reason}
        required={false}
        className='transparent-text-input border border-dark px-1 mt-2 mb-4'
        placeholder={'...'}
        onChange={(e) => setReason(e.target.value)}
      />
    </>
  );
};

WithdrawForm.propTypes = {
  title: PropTypes.string,
};

export default WithdrawForm;

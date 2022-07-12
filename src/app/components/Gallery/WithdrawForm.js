import React from 'react';
import PropTypes from 'prop-types';

const WithdrawForm = (props) => {
  const [reason, setReason] = React.useState('');

  const formItems = () =>
    props.itemsToWithdraw.map((item) => (
      <div key={item.id}>
        {item.id} - {item.title}
        <br />
      </div>
    ));

  return (
    <>
      <div>{props.title}</div>
      <div className='mt-4 mb-4'>{formItems()}</div>

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
  itemsToWithdraw: PropTypes.array,
};

export default WithdrawForm;

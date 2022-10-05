import React from 'react';
import { getSubmissionTitle } from '../../utils/submissions';
import { v4 as uuidv4 } from 'uuid';

const SubmissionPrint = ({ item, locationLabel, onClose }) => {
  const [id] = React.useState(`print-area-${uuidv4()}`);

  React.useEffect(() => {
    const printwin = window.open('');

    const onClosePrintWindow = () => {
      onClose();
    };

    if (printwin) {
      printwin.document.write(document.getElementById(id).innerHTML);
      printwin.addEventListener('beforeunload', onClosePrintWindow);
      printwin.stop();
      printwin.print();
      printwin.close();

      return () => {
        printwin.removeEventListener('beforeunload', onClosePrintWindow);
      };
    }
  }, [id]);

  return (
    <div id={id} className='visually-hidden'>
      <div>Order ID: {item.order_id}</div>
      <div>Item ID: {item.item_id}</div>
      <div>Description: {getSubmissionTitle(item)}</div>
      <div>Vault location: {locationLabel}</div>
    </div>
  );
};

export default SubmissionPrint;

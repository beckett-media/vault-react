import React from 'react';

import './StatusTracker.scss';

import { ReactComponent as StatusBeginning } from '../../assets/StatusBeginning.svg';
import { ReactComponent as StatusMiddle } from '../../assets/StatusMiddle.svg';
import { ReactComponent as StatusEnd } from '../../assets/StatusEnd.svg';

const StatusTracker = ({ length = 0, position = 1 }) => {
  const steps = length > 2 ? Array.from(Array(length - 2).keys()) : [];

  console.log(steps);
  console.log(steps.length);
  return (
    <div className='status-tracker_component'>
      <div className='status-tracker_element status-tracker_beginning'></div>
      {steps.length > 0 &&
        steps.map((item) => (
          <div
            className='status-tracker_element status-tracker_middle'
            key={`status-tracker_${Math.random() * 1000}`}
          ></div>
        ))}
      <div className='status-tracker_element status-tracker_end'></div>
    </div>
  );
};

export default StatusTracker;

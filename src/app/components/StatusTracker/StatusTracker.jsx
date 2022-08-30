import React from 'react';

import './StatusTracker.scss';

import { ReactComponent as CrossIcon } from '../../assets/beckett-circle-cross.svg';
import { ReactComponent as WarningIcon } from '../../assets/beckett-cirlce-warning.svg';

const StatusTracker = ({ totalSteps = 2, currentStep = 1 }) => {
  if (totalSteps < 2) {
    totalSteps = 2;
  }

  if (currentStep > totalSteps) {
    currentStep = totalSteps;
  } else if (currentStep < 1) {
    currentStep = 0;
  }

  const middleStepsArray = totalSteps > 2 ? Array(totalSteps - 2).fill(0) : [];
  const activeMiddleSteps = currentStep - 1;

  for (let index = 0; index < activeMiddleSteps; index++) {
    middleStepsArray[index] = 1;
  }

  // 1. Create mapping array for all middle steps
  // 2. For all items between the first and the active step, update the value to 1

  console.log(middleStepsArray);
  console.log(middleStepsArray.totalSteps);
  return (
    <div className='status-tracker_component'>
      {!!currentStep ? (
        <>
          <div className='status-tracker_element status-tracker_beginning'></div>
          {middleStepsArray.map((item) => (
            <div
              className={`status-tracker_element status-tracker_middle ${item === 1 && 'status-tracker_active'}`}
              key={`status-tracker_${Math.random() * 1000}`}
            ></div>
          ))}
          <div
            className={`status-tracker_element status-tracker_end ${
              totalSteps === currentStep && 'status-tracker_active'
            }`}
          ></div>
        </>
      ) : (
        <CrossIcon className='status-tracker_error-icon'></CrossIcon>
      )}
    </div>
  );
};

export default StatusTracker;

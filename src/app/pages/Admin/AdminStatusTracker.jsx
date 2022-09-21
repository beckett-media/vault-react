import React from 'react';
import './AdminStatusTracker.scss';

const AdminStatusTracker = ({ step }) => {
  const ADMIN_STEPS = {
    Received: 1,
    Production: 2,
    Final: 3,
    Vault: 4,
  };

  return (
    <div className='admin-status_component'>
      <div className={`admin-status_item ${step === ADMIN_STEPS.Received && 'admin-status_item--active'}`}>
        1. Received & Validate
      </div>
      <div className={`admin-status_item ${step === ADMIN_STEPS.Production && 'admin-status_item--active'}`}>
        2. Production
      </div>
      <div className={`admin-status_item ${step === ADMIN_STEPS.Final && 'admin-status_item--active'}`}>
        3. Final Processing
      </div>
      <div className={`admin-status_item ${step === ADMIN_STEPS.Vault && 'admin-status_item--active'}`}>4. Vault</div>
    </div>
  );
};

export default AdminStatusTracker;

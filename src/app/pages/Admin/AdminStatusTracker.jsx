import React from 'react';
import './AdminStatusTracker.scss';

const AdminStatusTracker = () => {
  return (
    <div className='admin-status_component'>
      <div className={`admin-status_item ${isActive && 'admin-status_item--active'}`}>1. Received & Validate</div>
      <div className={`admin-status_item ${isActive && 'admin-status_item--active'}`}>2. Production</div>
      <div className={`admin-status_item ${isActive && 'admin-status_item--active'}`}>3. Final Processing</div>
      <div className={`admin-status_item ${isActive && 'admin-status_item--active'}`}>4. Vault</div>
    </div>
  );
};

export default AdminStatusTracker;

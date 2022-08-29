import React from 'react';
import './FormSection.scss';

const FormSection = ({ children, title }) => {
  return (
    <div className='form-section_wrapper'>
      <div className='page-padding'>
        <div className='container-large'>
          <div className='form-section_layout'>
            <div className='form-section_content-wrapper'>
              <div className='form-section_title'>{title}</div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;

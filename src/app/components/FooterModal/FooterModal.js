import React from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import { privacyPolicy } from '../../assets/static-content/privacy-policy';
import { termsOfService } from '../../assets/static-content/terms-of-service';
import './FooterModal.scss';

const FooterModal = ({ showFooterModal, openModal, dismissModal }) => {
  let form = {};
  if (showFooterModal === 'privacy') {
    form = { ...privacyPolicy };
  } else if (showFooterModal === 'terms') {
    form = { ...termsOfService };
  }
  const { sectionContent, sectionTitles, title } = form;

  console.log(sectionTitles);
  return (
    <Modal show={openModal} dismiss={dismissModal}>
      <Modal.Header className='modal-header'>
        <h2>{title}</h2>
        <CloseButton onClick={() => dismissModal()} />
      </Modal.Header>
      <Modal.Body className='footer-modal-body'>
        {sectionTitles?.map((section, i) => {
          const sectionType = sectionContent[i].type;
          return (
            <div key={section}>
              <h4>{section}</h4>
              {section.length && <hr />}
              {section.length && <br />}
              {sectionType == 'p' &&
                sectionContent[i].content.map((content, j) => {
                  return (
                    <span key={section + String(j) + String(i)} className='paragraph'>
                      {content}
                    </span>
                  );
                })}
              {sectionType == 'ul' && (
                <ul>
                  {sectionContent[i].content.map((content, j) => {
                    return (
                      <li key={section + String(j) + String(i)} className={`u-list_${content.level}`}>
                        {content.text}
                      </li>
                    );
                  })}
                </ul>
              )}
              {sectionType == 'ol' && (
                <div className='o-list_'>
                  {sectionContent[i].content.map((content, j) => {
                    return (
                      <div key={section + String(j) + String(i)} className={`o-list_${content.level}`}>
                        {content.label === 'bullet' && <>&bull; &emsp;</>}
                        {content.label !== (undefined || 'bullet') && <>{content.label} &ensp;</>}
                        {content.text}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export default FooterModal;

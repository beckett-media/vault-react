import React, { useState } from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import { faq } from '../../assets/static-content/faq';
import { privacyPolicy } from '../../assets/static-content/privacy-policy';
import { support } from '../../assets/static-content/support';
import { termsOfService } from '../../assets/static-content/terms-of-service';
import './FooterModal.scss';

const FooterModal = ({ showFooterModal, openModal, dismissModal }) => {
  const [faqSection, setFaqSection] = useState(0);
  const isFaq = showFooterModal === 'faq';
  let form = {};
  if (showFooterModal === 'privacy') {
    form = { ...privacyPolicy };
  } else if (showFooterModal === 'terms') {
    form = { ...termsOfService };
  } else if (isFaq) {
    form = { ...faq };
  } else form = { ...support };
  const { sectionContent, sectionTitles, title } = form;

  return (
    <Modal show={openModal} dismiss={dismissModal}>
      <Modal.Header className='footer-modal'>
        <div className='footer-modal_header'>{title}</div>
        <CloseButton onClick={() => dismissModal()} />
      </Modal.Header>
      <Modal.Body className='footer-modal_body'>
        {sectionTitles?.map((section, i) => {
          const sectionType = sectionContent[i].type;
          return (
            <div key={section} className={isFaq && 'faq-modal footer-modal_subheader'}>
              <div className='footer-modal_subheader' onClick={() => isFaq && setFaqSection(i)}>
                {section}
              </div>
              {section.length && <hr />}
              {section.length && <br />}
              {sectionType == 'p' &&
                sectionContent[i].content.map((content, j) => {
                  if (isFaq && faqSection === i) {
                    return (
                      <span key={section + String(j) + String(i)} className='paragraph'>
                        {content}
                      </span>
                    );
                  } else if (isFaq && faqSection !== i) {
                    return <></>;
                  } else
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

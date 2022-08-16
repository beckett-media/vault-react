import React from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import { act } from 'react-dom/test-utils';
import { privacyPolicy } from '../../assets/static-content/privacy-policy';
import './FooterModal.scss';

const FooterModal = ({ showFooterModal, openModal, dismissModal }) => {
  if (showFooterModal === 'privacy') {
    console.log(showFooterModal);
  }
  const { sectionContent, sectionTitles } = privacyPolicy;

 ;
  return (
    <Modal show={openModal} dismiss={dismissModal}>
        <Modal.Header className='modal-header'><h2>{privacyPolicy.title}</h2><CloseButton onClick={() => dismissModal()} /></Modal.Header>
        <Modal.Body className='modal-body'>
          {sectionTitles.map((section, i) => {
            const sectionType = sectionContent[i].type;
            return (
              <div>
                <h4>{section}</h4>
                <hr/>
                <br/>
                {sectionType == 'p' &&
                  sectionContent[i].content.map((content) => {
                    return <span className='paragraph'>{content}</span>;
                  })}
                {sectionType == 'ul' && (
                  <ul>
                    {sectionContent[i].content.map((content, j) => {
                      console.log(content);
                      return <li className={`u-list_${content.level}`}>{content.text}</li>;
                    })}
                  </ul>
                )}
                {sectionType == 'ol' && (
                  <div className='o-list_'>
                    {sectionContent[i].content.map((content, j) => {
                      console.log(content.level);
                      return (
                        <div className={`o-list_${content.level}`}>
                          {content.label === 'bullet' && <>&bull; &emsp;</>} 
                          {content.label !== (undefined || 'bullet' )&& <>{content.label} &ensp;</>}
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

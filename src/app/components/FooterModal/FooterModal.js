import React from 'react'
import { Modal } from 'react-bootstrap'
import { act } from 'react-dom/test-utils'
import { privacyPolicy } from '../../assets/static-content/privacy-policy'

const FooterModal = ({showFooterModal, openModal, setShowFooterModal}) => {
  if(showFooterModal === 'privacy'){
    console.log(showFooterModal)
  }
  const {sectionContent, sectionTitles} = privacyPolicy;

  const dismissModal = () => setShowFooterModal('')
  return (
    <Modal show={openModal} dismiss={dismissModal}>
      <div >
        <h1>{privacyPolicy.title}</h1>
        <Modal.Body>
        {
          sectionTitles.map((section, i) => {
            return (
              <div>
                <h2>{section}</h2>
                {sectionContent[i].content.map((content, j) => {
                  console.log( content)
                  if(content.type === 'p'){
                    return(<p>{content.text}</p>)
                  }
                })}
              </div>
            )
          })
        }
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default FooterModal
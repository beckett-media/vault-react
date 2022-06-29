import React from 'react'
import { Modal } from 'react-bootstrap'

const ComingSoon = (props) => {
  const { open, setOpen } = props;
  const dismiss = () => setOpen(false)
  return (
    <Modal show={open} onHide={dismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          Coming soon!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This feature isn't quite ready yet!</p>
      </Modal.Body>
      <SubmitButton func={dismiss} title='Close' />
    </Modal>
  )
}

export default ComingSoon
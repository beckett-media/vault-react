import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formSelector } from '../../state/selectors'
import { setTitle } from '../../state/actions'
import { Col, Container, Row } from 'react-bootstrap'

const Form = () => {
    const form = useSelector(formSelector)
    const dispatch = useDispatch()
    const [tempTitle, updateTitle] = useState(form.title)
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    Fill out the form below to launch. {form.title}
                </Col>
            </Row>
            <Row>
                <Col>
                    <input 
                        type='text' 
                        value={tempTitle}
                        
                        onChange={(e)=>updateTitle(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input 
                        type='button' 
                        value='Click Me!!!' 
                        onClick={(e)=> dispatch(
                            setTitle({type:'SET_TITLE',form: {title:tempTitle}})
                        )}
                    />
                </Col>
            </Row>
        </Container>

  )
}

export default Form
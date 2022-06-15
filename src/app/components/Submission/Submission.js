import React from 'react'
import SubmissionForm from './SubmissionForm'

const Submission = () => {
    const [add, setAdd] = useState(false);
    const [formSubmitted, toggleFormSubmitted] = useState(false)
    const dispatch = useDispatch()
    const confirmationModal = () => {
        return(            
            <Modal /> 
        )
    }
    const formSubmission = async ({}) => {
        const confirmed = await confirmationModal()
        if(!confirmed){ 
            return
        }
        // TODO: This is to emulate an API call
        updateFormSubmitted(!formSubmitted)
        alert('success!')
    }
    return (
        <>
            {!formSubmitted && !add && <SubmissionForm />} 
            {formSubmitted && <SubmissionSuccess />}
            {add && <SubmissionAdd />}
            <Button title='TEST' onClick={() => !add ? setAdd(!add) : toggleFormSubmitted(!formSubmitted)}/>
        </>
    )
}

export default Submission
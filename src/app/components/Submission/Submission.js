import React, {useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import SubmissionSuccess from '../Response/SubmissionSuccess';
import SubmissionAdd from './SubmissionAdd';
import SubmissionForm from './SubmissionForm';
import SubmitButton from '../Generic/SubmitButton';

const Submission = () => {
  const [add, onAdd] = useState(false);
  const [completeAdd, toggleCompleteAdd] = useState(false)
  const [confirmedSubmission, setConfirmedSubmission] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const dispatch = useDispatch();

  const cancelSubmission = () => setFormSubmitted(false);
  const updateFormSubmitted = () => setFormSubmitted(true);
  const submissionConfirmed = () => setConfirmedSubmission(true);
  const confirmAdd = () => onAdd(false)
  const submitAddedItem = () => {
    confirmAdd()
    toggleCompleteAdd(!completeAdd)
  }
  // Sorry for many state variables, they are strictly local.
  const [gradingCompany, setGradingCompany] = useState('')
  const [category, setCategory] = useState('')
  const [serialNumber, setSeialNumber] = useState('')
  const [description, setDescription] = useState('')
  // Below are optional
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [year, setYear] = useState('')
  const [overallGrade, setOverallGrade] = useState('')
  const [subGrades, setSubGrades] = useState('')
  const [autographGrade, setAutographGrade] = useState('')
  const [subject, setSubject] = useState('')
  const [image, setImage] = useState('')
  const values = {
    gradingCompany,
    category,
    serialNumber,
    description,
    title,
    genre,
    manufacturer,
    year,
    overallGrade,
    subGrades,
    autographGrade,
    subject,
    image,
  }
  const stateSetters = {
    setGradingCompany,
    setCategory,
    setSeialNumber,
    setDescription,
    setTitle,
    setGenre,
    setManufacturer,
    setYear,
    setOverallGrade,
    setSubGrades,
    setAutographGrade,
    setSubject,
    setImage
  }
  
  return (
    <>
      <Container fluid style={{background: 'black'}} >
        {
          !confirmedSubmission && !add && 
          <>
            <SubmissionForm
              formSubmitted={formSubmitted}
              cancelSubmission={cancelSubmission}
              setConfirm={submissionConfirmed}
              onAdd={onAdd}
            />
            <SubmitButton func={updateFormSubmitted} title='Submit' />
          </>
        }
        {confirmedSubmission && <SubmissionSuccess />}
        {add && 
        <>
          <SubmissionAdd 
            values={values}
            stateSetters = {stateSetters}/>
          <SubmitButton func={submitAddedItem} title='Add' />
          <Button onClick={() => onAdd(false)}>Cancel</Button>
        </>
        }
      </Container>
    </>
  );
};

export default Submission;

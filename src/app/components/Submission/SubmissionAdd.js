import React, { useState } from 'react';
import { Container, Form, FormLabel, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSerialNumber } from '../../state/actions';
import { itemObjectSelector } from '../../state/selectors';

const AddBeckettItem = (props) => {

  const { 
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
  } = props.stateSetters;

  return(
    <InputGroup>
      <FormLabel>Serial Number</FormLabel>
      <input type='text' />
    </InputGroup>
  )
}

const AddOtherItem = (props) => {
  const { 
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
  } = props.values
  const { 
    setGradingCompany,
    setCategory,
    setSerialNumber,
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
  } = props.stateSetters;

  return(
    <>
    <InputGroup>
        <FormLabel>Grading Company</FormLabel>
        <input type='text' value={gradingCompany} onChange={(e) => setGradingCompany(e.target.value)}/>
      </InputGroup>
      <InputGroup>
        <FormLabel>Serial Number</FormLabel>
        <input type='text' value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}/>
      </InputGroup>
      <InputGroup>
        <FormLabel>Description</FormLabel>
        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
      </InputGroup>
      <div>Use the fields below if you cannot find the 
        item in the description above.</div>
      <InputGroup>
        <Form.Select onChange={(e) => setCategory(e.target.value)}>
          <option>Select Item Type</option>
          <option value="sport-card">Sport Card</option>
          <option value="other-card">Other Card</option>
          <option value="comic">Comic</option>
        </Form.Select>
      </InputGroup>
      { category === 'sport-card' &&
        <>
          <InputGroup>
            <Form.Select onChange={(e) => setGenre(e.target.value)}>
              <option>Select Sport</option>
              <option value="baseball">Baseball</option>
              <option value="basketball">Basketball</option>
              <option value="football">Football</option>
              <option value="other">Other</option>
            </Form.Select>
          </InputGroup>
        </>
      }
      { category !== 'sport-card' &&
        <>
          <InputGroup>
            <FormLabel>{category === 'other-card' ? 'Card Description' : 'Genre'}</FormLabel>
            <input type='text' value={genre} onChange={(e) => setGenre(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <FormLabel>Title</FormLabel>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
          </InputGroup>
        </>
      }
    </>
  )
}
const SubmissionAdd = (props) => {
  const gradingCompany = props.values.gradingCompany;
  const [gradingCompanySelected, setGradingCompanySelected] = useState(false)
  const onChange = (evt) => {
    props.stateSetters.setGradingCompany(evt.target.value)
    setGradingCompanySelected(true)
  }
  
  return (
    <Container>
      <h1>Add Item</h1>
      <Form>
        <Form.Select onChange={(e) => onChange(e)}>
          <option>Select Grading Company</option>
          <option value="BGS">Beckett Grading Service</option>
          <option value="CBCS">CBCS</option>
          <option value="">Other</option>
        </Form.Select>
        {(gradingCompany === 'BGS' || gradingCompany === 'CBCS') ? <AddBeckettItem stateSetters = {props.stateSetters}/> :
          gradingCompanySelected ? <AddOtherItem stateSetters = {props.stateSetters} values={props.values}/>: <></>}
      </Form>
    </Container>
  );
};

export default SubmissionAdd;

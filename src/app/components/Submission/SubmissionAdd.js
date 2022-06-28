import React, { useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddBeckettItem = (props) => {
  // const {
  //   setCategory,
  //   setSeialNumber,
  //   setDescription,
  //   setTitle,
  //   setGenre,
  //   setManufacturer,
  //   setYear,
  //   setOverallGrade,
  //   setSubGrades,
  //   setAutographGrade,
  //   setSubject,
  //   setImage,
  // } = props.stateSetters;

  return (
    <Form.Group className='md-5'>
      <Form.Label>Serial Number</Form.Label>
      <Form.Control type='text' placeholder='Enter Serial Number' />
    </Form.Group>
  );
};

const AddOtherItem = (props) => {
  const {
    gradingCompany,
    category,
    serialNumber,
    description,
    title,
    genre,
    // manufacturer,
    // year,
    // overallGrade,
    // subGrades,
    // autographGrade,
    // subject,
    // image,
  } = props.values;
  const {
    setGradingCompany,
    setCategory,
    setSerialNumber,
    setDescription,
    setTitle,
    setGenre,
    // setManufacturer,
    // setYear,
    // setOverallGrade,
    // setSubGrades,
    // setAutographGrade,
    // setSubject,
    // setImage,
  } = props.stateSetters;
  const onCategoryChange = (evt) => {
    setCategory(evt.target.value);
    props.setCategorySelected(true);
  };
  return (
    <>
      <Form.Group>
        <Form.Label>Grading Company</Form.Label>
        <Form.Control
          type='text'
          value={gradingCompany}
          onChange={(e) => setGradingCompany(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Serial Number</Form.Label>
        <Form.Control
          type='text'
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
      </Form.Group>
      {!props.categorySelected && (
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
      )}
      <div>
        Use the fields below if you cannot find the item in the description
        above.
      </div>
      <Form.Group>
        <Form.Select onChange={(e) => onCategoryChange(e)}>
          <option>Select Item Type</option>
          <option value='sport-card'>Sport Card</option>
          <option value='other-card'>Other Card</option>
          <option value='comic'>Comic</option>
        </Form.Select>
      </Form.Group>
      {category === 'sport-card' && (
        <>
          <Form.Group>
            <Form.Label>Sport</Form.Label> <br />
            <Form.Select onChange={(e) => setGenre(e.target.value)}>
              <option>Select Sport</option>
              <option value='baseball'>Baseball</option>
              <option value='basketball'>Basketball</option>
              <option value='football'>Football</option>
              <option value='other'>Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </>
      )}
      {props.categorySelected && category !== 'sport-card' && (
        <>
          <Form.Group>
            <Form.Label>
              {category === 'other-card' ? 'Card Type' : 'Genre'}
            </Form.Label>
            <Form.Control
              type='text'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </>
      )}
    </>
  );
};
const SubmissionAdd = (props) => {
  const gradingCompany = props.values.gradingCompany;
  const [gradingCompanySelected, setGradingCompanySelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const onChange = (evt) => {
    props.stateSetters.setGradingCompany(evt.target.value);
    setGradingCompanySelected(true);
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <h1>Add Item</h1>
      </Row>
      <Row className='justify-content-md-center'>
        <Form.Group>
          <Form.Select onChange={(e) => onChange(e)}>
            <option>Select Grading Company</option>
            <option value='BGS'>Beckett Grading Service</option>
            <option value='CBCS'>CBCS</option>
            <option value=''>Other</option>
          </Form.Select>
        </Form.Group>
      </Row>
      {gradingCompany === 'BGS' || gradingCompany === 'CBCS' ? (
        <AddBeckettItem stateSetters={props.stateSetters} />
      ) : gradingCompanySelected ? (
        <AddOtherItem
          stateSetters={props.stateSetters}
          values={props.values}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};
AddBeckettItem.propTypes = {
  stateSetters: PropTypes.object,
};

AddOtherItem.propTypes = {
  stateSetters: PropTypes.object,
  values: PropTypes.object,
  categorySelected: PropTypes.string,
  setCategorySelected: PropTypes.func,
};
SubmissionAdd.propTypes = {
  stateSetters: PropTypes.object,
  values: PropTypes.object,
  categorySelected: PropTypes.string,
  setCategorySelected: PropTypes.func,
};
export default SubmissionAdd;

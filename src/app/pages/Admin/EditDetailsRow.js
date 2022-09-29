import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { ITEM_TYPE } from '../../services/items';

const EditDetailsRow = ({ tempState, setTempState }) => {
  const updateTempState = (subState) => {
    setTempState({ ...tempState, ...subState });
  };

  return (
    <Form>
      <Row>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control
              type='text'
              disabled
              value={tempState.type === ITEM_TYPE.TRADING_CARD ? 'Trading Card' : 'Comic'}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ title: e.target.value })}
              value={tempState.title}
            />
          </Form.Group>
        </Col>

        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Control
              type='number'
              min={1900}
              max={2050}
              onChange={(e) => updateTempState({ year: Number(e.target.value) })}
              value={tempState.year}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          {tempState.type === ITEM_TYPE.TRADING_CARD ? (
            <Form.Group>
              <Form.Label>Player</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ player: e.target.value })}
                value={tempState.player}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Issue #</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ issue: e.target.value })}
                value={tempState.issue}
              />
            </Form.Group>
          )}
        </Col>

        <Col sm={12} lg={4}>
          {tempState.type === ITEM_TYPE.TRADING_CARD ? (
            <Form.Group>
              <Form.Label>Set name</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ set_name: e.target.value })}
                value={tempState.set_name}
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ publisher: e.target.value })}
                value={tempState.publisher}
              />
            </Form.Group>
          )}
        </Col>
        <Col sm={12} lg={4}>
          {tempState.type === ITEM_TYPE.TRADING_CARD ? (
            <Form.Group>
              <Form.Label>Sport</Form.Label>
              <Form.Control
                type='text'
                onChange={(e) => updateTempState({ sport: e.target.value })}
                value={tempState.sport}
              />
            </Form.Group>
          ) : null}
        </Col>

        <Col sm={12}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              onChange={(e) => updateTempState({ description: e.target.value })}
              value={tempState.description}
            />
          </Form.Group>
        </Col>

        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Overall grade</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ overall_grade: e.target.value })}
              value={tempState.overall_grade}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Sub grades</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ sub_grades: e.target.value })}
              value={tempState.sub_grades}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Grading Company</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ grading_company: e.target.value })}
              value={tempState.grading_company}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Estimated value</Form.Label>
            <Form.Control
              type='number'
              min={1}
              value={tempState.est_value}
              onChange={(e) => updateTempState({ est_value: Number(e.target.value) })}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ card_number: e.target.value })}
              value={tempState.card_number}
            />
          </Form.Group>
        </Col>
        <Col sm={12} lg={4}>
          <Form.Group>
            <Form.Label>Serial Number</Form.Label>
            <Form.Control
              type='text'
              onChange={(e) => updateTempState({ serial_number: e.target.value })}
              value={tempState.serial_number}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

// const EditDetailsRow = ({ tempState, setTempState }) => {
//   const notUserEditable = (field) => {
//     return (
//       field.indexOf('_id') !== -1 ||
//       field.indexOf('_at') !== -1 ||
//       field.indexOf('_url') !== -1 ||
//       field.indexOf('_desc') !== -1 ||
//       field === 'item_uuid' ||
//       field === 'user' ||
//       field === 'id' ||
//       field === 'status' ||
//       field === 'type'
//     );
//   };
//   return (
//     <Form>
//       <Row>
//         {Object.keys(tempState).map((field) => {
//           const fieldSplit = field.split('_').join(' ');
//           const fieldName = String(fieldSplit[0].toUpperCase()) + fieldSplit.slice(1);
//           if (!notUserEditable(field)) {
//             return (
//               <Col className='col-md-4' key={field}>
//                 <Form.Group>
//                   <Form.Label>{fieldName}</Form.Label>
//                   <Form.Control
//                     placeholder={`- ${fieldName} -`}
//                     value={tempState[field]}
//                     onChange={(e) => setTempState({ ...tempState, [field]: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//             );
//           }
//         })}
//       </Row>
//     </Form>
//   );
// };

export default EditDetailsRow;

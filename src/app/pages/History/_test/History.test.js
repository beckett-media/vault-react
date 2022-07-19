import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import History from '../History';
import { submissionHistory } from '../submissionHistory';

describe('To view History table rows', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(<History />);
  });
  it('map over the object array', () => {
    expect(submissionHistory({
    historyItems: [{
      id: 1234, 
      title: 'TEST',
      created_at: new Date(), 
      status: 'pending', 
      grading_company: 'BGS',
      serial: 10101010
    }], 
    selected: 1234, 
    setSelected: () => {}})).toEqual(
      [<div id={1234}><Row className="py-3 border" onClick={() => setSelected(item.id)}><Col className="fw-bold" xs={8}><div>TEST</div></Col><Col xs={3}><div>7/19/2022</div></Col><Col className="right-align px-4" xs={1}>∧</Col></Row><Row className="py-3 px-5 border"><Col lg={3}><div>Status: </div></Col><Col lg={5}><div>Grading Company: BGS</div></Col><Col lg={2}><div>Serial Number: </div></Col></Row></div>]
    )});
})
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
      status_desc: 'pending', 
      grading_company: 'BGS',
      serial_number: 10101010
    }], 
    selected: 1234, 
    setSelected: () => {}})).toContain('BGS')});
})
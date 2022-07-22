import React from 'react';
import ReactDOM from 'react-dom/client';
import History from '../History';
import { itemsHistory } from '../itemsHistory';

describe('To view History table rows', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(<History />);
  });
  it('map over the object array', () => {
    expect(
      JSON.stringify(
        itemsHistory({
          historyItems: [
            {
              id: 1234,
              title: 'TEST',
              created_at: new Date(),
              status: 'pending',
              grading_company: 'BGS',
              serial_number: '10101010',
            },
          ],
          selected: 1234,
          setSelected: () => {},
        }),
      ),
    ).toContain('10101010');
  });
});

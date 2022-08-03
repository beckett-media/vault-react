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
          sortedItems: [
            {
              id: '1234',
              type_desc: 'TEST',
              created_at: new Date(),
              type_desc: 'submission',
            },
          ],
          historyItemDetails: {
            title: 'test',
            id: '123'
          },
          setSelected: () => {},
        }),
      ),
    ).toContain('submission');
  });
});

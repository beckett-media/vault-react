import React, { useEffect, useState } from 'react';
import { getInventory } from '../services/inventory';

const defaultState = {
  submissionOrderFilter: undefined,
  submissions: [],
  setSubmissions: () => {},
  setSubmissionOrderFilter: () => {},
};

export const AdminPageContext = React.createContext(defaultState);

const AdminPageProvider = ({ children }) => {
  const [submissionOrderFilter, setSubmissionOrderFilter] = useState();
  const [submissions, setSubmissions] = useState([]);

  return (
    <AdminPageContext.Provider
      value={{
        submissionOrderFilter,
        setSubmissionOrderFilter,
        submissions,
        setSubmissions,
      }}
    >
      {children}
    </AdminPageContext.Provider>
  );
};

export default AdminPageProvider;

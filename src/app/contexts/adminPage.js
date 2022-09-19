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

  useEffect(() => {
    getSubmissions();
  }, []);
  let response;
  async function getSubmissions() {
    try {
      response = await getInventory();
    } catch (error) {
      throw new Error(error);
    }
    return setSubmissions(response);
  }
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

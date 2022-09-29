import React, { useState } from 'react';

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
  const [isSubmissionsLoading, setIsSubmissionsLoading] = useState(false);

  return (
    <AdminPageContext.Provider
      value={{
        submissionOrderFilter,
        setSubmissionOrderFilter,
        submissions,
        setSubmissions,
        isSubmissionsLoading,
        setIsSubmissionsLoading,
      }}
    >
      {children}
    </AdminPageContext.Provider>
  );
};

export default AdminPageProvider;

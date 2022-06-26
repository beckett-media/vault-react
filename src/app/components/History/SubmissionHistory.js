import React, { useState } from 'react';
import { getSubmissions } from '../../services/submission';

const SubmissionHistory = () => {
  const [submissions, updateSubmissions] = useState([]);
  useEffect(() => updateSubmissions(getSubmissions()));
  console.log(submissions);
  return <>{submissions && submissions.map((sub) => <div>{sub}</div>)}</>;
};

export default SubmissionHistory;

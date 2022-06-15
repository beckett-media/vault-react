import React from 'react';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';

function App() {
  const page = 'submission'
  return (
      <>
          { page === 'homepage' && <Homepage /> }
          { page === 'submission' && <Submission /> }
      </>
  )
}

export default App;

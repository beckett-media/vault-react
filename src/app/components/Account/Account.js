import React, { useEffect, useState } from 'react';
import ComingSoon from '../Generic/ComingSoon';

const Account = () => {
  const [openComingSoon, setOpenComingSoon] = useState(false);
  useEffect(() => setOpenComingSoon(true), []);

  return (
    <>
      <ComingSoon open={openComingSoon} setOpen={setOpenComingSoon} />
    </>
  );
};

export default Account;

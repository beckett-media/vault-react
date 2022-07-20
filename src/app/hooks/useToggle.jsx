import React, { useState } from 'react';

const useToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = () => setIsToggled(!isToggled);

  return { isToggled, toggle };
};

export default useToggle;

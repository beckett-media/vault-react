module.exports = {
  //   '*.{js,jsx,ts,tsx}': [
  //     'eslint --fix --max-warnings=0',
  //     'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
  //     () => 'tsc-files --noEmit',
  //   ],
  '*.{js,jsx,ts,tsx,json,css,scss}': ['npm run format:write'],
};

import configData from './config.json';
// use the general config data, and override it with server specific variables
// todo: add other servers qa, stage, dev
let config;
if (process.env.REACT_APP_ENV === 'prod') {
  config = Object.assign({}, configData.general, configData.prod);
} else if (process.env.REACT_APP_ENV === 'qa') {
  config = Object.assign({}, configData.general, configData.qa);
} else {
  config = Object.assign({}, configData.general, configData.dev);
}

export default config;

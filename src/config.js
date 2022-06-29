import configData from "./config.json";
// use the general config data, and override it with server specific variables
// todo: add other servers qa, stage, dev
let config;
if (process.env.NODE_ENV === 'production') {
    config = Object.assign({}, configData.general, configData.production);
} else {
    config = Object.assign({}, configData.general, configData.dev);
}

export default config;
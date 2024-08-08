// import { EnvName } from '@enums/environment.enum';
// import packageInfo from '../../package.json';

const scheme = 'http://';
const host   = 'localhost';
const port   = ':5000';
const path   = '/api/';

const baseUrl = scheme + host + port + path;
export const environment = {
  production      : true,
  // version         : packageInfo.version,
  appName         : 'ShoppingKart',
  // envName         : EnvName.PROD,
  defaultLanguage : 'en',
  apiBaseUrl      : baseUrl,
};

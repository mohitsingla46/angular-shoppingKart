import { EnvName } from '@enums/environment.enum';
import packageInfo from '../../package.json';

const baseUrl = "http://localhost:3000";

export const environment = {
  production      : false,
  version         : packageInfo.version,
  appName         : 'ShoppingKart',
  envName         : EnvName.LOCAL,
  defaultLanguage : 'en',
  apiBaseUrl      : baseUrl,
};

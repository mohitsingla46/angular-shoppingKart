import { EnvName } from '@enums/environment.enum';
import packageInfo from '../../package.json';

const baseUrl = "http://localhost:3000";

export const environment = {
  production      : true,
  version         : packageInfo.version,
  appName         : 'ShoppingKart',
  envName         : EnvName.PROD,
  defaultLanguage : 'en',
  apiBaseUrl      : baseUrl,
};

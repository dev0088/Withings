export const client_id =
  'eee545283019ba62b1a80b9ebc2f434017abdc94e0f4d70848344eb9eabfa81e';
export const client_secret =
  '204824aac946587cd055592d97dd22ace214e2e61a1b6135b1bd7b6e1e951e6a';
export const baseURL = 'https://dev.avis2sante.net/joomla-dev-mrehab-2/';
export const redirect_uri = `${baseURL}?option=com_ajax%26plugin=Withings_Callback`;

const external_id = '17633015';
const preflang = 'en_US';
const shortname = 'abc';
const gender = '0';

// End-user required data
export const CLIENT_PREF_LANG = 'en_US'; // Ex: fr_FR
export const CLIENT_BIRTHDATE = 1524002400; // Birthdate as timestamp
export const CLIENT_GENDER = 0; // 0 = MAN / 1 = WOMAN
export const CLIENT_SHORTNAME = 'abc'; // 3 letters
export const CLIENT_HEIGHT_VALUE = 185; // Height value as integer not float
export const CLIENT_HEIGHT_EXPONENT = -2; // 10^EXP to get height valu in meters
export const CLIENT_WEIGHT_VALUE = 7525; // Weight value as integer not float
export const CLIENT_WEIGHT_EXPONENT = -2; // 10^EXP to get weight valu in meters

// End-user optional data
export const OPTIONAL_CLIENT_FIRSTNAME = 'Alex'; // Optional
export const OPTIONAL_CLIENT_LASTNAME = 'Cruise'; // Optional
export const OPTIONAL_CLIENT_EMAIL = '#A_VALID_EMAIL'; // Optional
export const OPTIONAL_CLIENT_UNIT_PREFERENCES =
  '{"weight":1,"distance":8,"temperature":13,"height":7}'; // Optional

// Partner credentials
export const PARTNER_CLIENT_ID = client_id;
export const PARTNER_CLIENT_SECRET = client_secret;
export const PARTNER_REDIRECT_URI = redirect_uri; // URL where Withings server will send the accesstoken and the refreshtoken with the end-user Withings userid

// Additional information
export const OPTIONAL_MODEL = 7; // Withings device model to be installed. If not provided, the end-user will be prompted to choose the model manually among available models.
export const EXTERNAL_ID = external_id; // End-user identifier specified by partner so that partner can identify the end-user

// Withings base url
export const WITHINGS_URL_PREFIX = 'https://account.withings.com';

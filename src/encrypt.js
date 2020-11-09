import CryptoJS from 'crypto-js';
import HmacSHA512 from 'crypto-js/hmac-sha512';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import AesJS from 'aes-js';
import {generateSecureRandom} from 'react-native-securerandom';
import HttpBuildQuery from 'http-build-query';
import {
  client_id,
  client_secret,
  redirect_uri,
  CLIENT_PREF_LANG,
  CLIENT_BIRTHDATE,
  CLIENT_GENDER,
  CLIENT_SHORTNAME,
  CLIENT_HEIGHT_VALUE,
  CLIENT_HEIGHT_EXPONENT,
  CLIENT_WEIGHT_VALUE,
  CLIENT_WEIGHT_EXPONENT,
  // End-user optional data
  OPTIONAL_CLIENT_FIRSTNAME,
  OPTIONAL_CLIENT_LASTNAME,
  OPTIONAL_CLIENT_EMAIL,
  OPTIONAL_CLIENT_UNIT_PREFERENCES,
  // Partner credentials
  PARTNER_CLIENT_ID,
  PARTNER_CLIENT_SECRET,
  PARTNER_REDIRECT_URI,
  // Additional information
  OPTIONAL_MODEL,
  EXTERNAL_ID,
  WITHINGS_URL_PREFIX,
} from './const';

export const createUrl_old = async () => {
  const external_id = '17633015';
  const preflang = 'en_US';
  const shortname = 'abc';
  const gender = '0';
  const iv = '';

  console.log('client_id: ', client_id, client_secret);
  console.log('client_secret: ', client_id, client_secret);
  // Encrypt sample birthdate data.
  const cryptedbirthdate = CryptoJS.AES.encrypt('12345678', client_secret);

  const userMeasures =
    '[{"value": 180,"unit": -2,"type": 4},{"value": 8000,"unit": -2,"type": 1}]';

  /* Encrypt */
  const cryptedmesures = CryptoJS.AES.encrypt(userMeasures, client_secret);
  console.log('encrypted text: ', cryptedmesures.toString());

  /* Signature */
  const signatureString = `${client_id},${cryptedbirthdate.toString()},${cryptedmesures.toString()},${external_id},${gender},${iv},${preflang},${redirect_uri},${shortname}`;
  const cryptedsignature = await HmacSHA512(signatureString, client_secret);

  const withingsUrl = `https://account.withings.com/sdk/sdk_init?client_id=${client_id}&cryptbirthdate=${cryptedbirthdate}&cryptmeasures=${cryptedmesures}&external_id=${external_id}&gender=${gender}&iv=${iv}&preflang=${preflang}&redirect_uri=${redirect_uri}&shortname=${shortname}&signature=${cryptedsignature}`;

  console.log(withingsUrl);

  /* Decript */
  var bytes = CryptoJS.AES.decrypt(cryptedmesures.toString(), client_secret);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  console.log('decrypted text: ', plaintext);
};

const ksort = (obj) => {
  var keys = Object.keys(obj).sort();
  var sortedObj = {};

  for (var i in keys) {
    sortedObj[keys[i]] = obj[keys[i]];
  }

  return sortedObj;
};

const implode = (glue, pieces) => {
  var i = '';
  var retVal = '';
  var tGlue = '';

  // if (arguments.length === 1) {
  //   pieces = glue;
  //   glue = '';
  // }

  if (typeof pieces === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue);
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i];
      tGlue = glue;
    }
    return retVal;
  }

  return pieces;
};

export const createUrl = async () => {
  // const external_id = '17633015';
  // const preflang = 'en_US';
  // const shortname = 'abc';
  // const gender = '0';

  console.log('client_id: ', client_id, client_secret);
  console.log('client_secret: ', client_id, client_secret);

  var measures = [
    {
      value: CLIENT_HEIGHT_VALUE,
      unit: CLIENT_HEIGHT_EXPONENT,
      type: 4,
    },
    {
      value: CLIENT_HEIGHT_VALUE,
      unit: CLIENT_HEIGHT_EXPONENT,
      type: 1,
    },
  ];
  console.log('==== measures: ', measures);
  var str_measures = JSON.stringify(measures);
  console.log('==== str_measures: ', str_measures);
  var encrypted_params = {
    cryptfirstname: OPTIONAL_CLIENT_FIRSTNAME,
    cryptlastname: OPTIONAL_CLIENT_LASTNAME,
    cryptbirthdate: CLIENT_BIRTHDATE,
    cryptmeasures: str_measures,
  };
  console.log('==== encrypted_params: ', encrypted_params);
  var params = {
    client_id: PARTNER_CLIENT_ID,
    redirect_uri: PARTNER_REDIRECT_URI,
    shortname: CLIENT_SHORTNAME,
    gender: CLIENT_GENDER,
    preflang: CLIENT_PREF_LANG,
    external_id: EXTERNAL_ID,
    unit_pref: OPTIONAL_CLIENT_UNIT_PREFERENCES,
  };
  console.log('==== params: ', params);
  console.log(
    '===== PARTNER_CLIENT_SECRET: ',
    PARTNER_CLIENT_SECRET,
    PARTNER_CLIENT_SECRET.length,
  );
  var byte_key = new AesJS.utils.utf8.toBytes(
    PARTNER_CLIENT_SECRET.substring(0, 32),
  );
  console.log('==== byte_key: ', byte_key, byte_key.length);

  // Encrypt critical params
  var cipher_method = 'aes-256-ctr';

  // Convert text to bytes
  var byte_measures = new AesJS.utils.utf8.toBytes(str_measures);
  console.log('==== byte_measures: ', byte_measures);

  /* Create AES CTR Coutner instance */
  var aesCtrCounter = new AesJS.Counter(cipher_method.length); //cipher_method.length
  console.log('===== aesCtrCounter: ', aesCtrCounter);
  /* Create AES CTR instance */
  var aesCtr = new AesJS.ModeOfOperation.ctr(
    // bcryptjs.hashSync(byte_key, 10)).substring(0, 32)
    byte_key,
    aesCtrCounter,
  ); // 5?
  console.log('====== aesCtr: ', aesCtr);

  // The counter is optional, and if omitted will begin at 1
  var iv = await generateSecureRandom(16);
  console.log('====== iv: ', iv);
  params['iv'] = iv;
  Object.keys(encrypted_params).map((key, index) => {
    var value = encrypted_params[key];
    // var encrypted_value = 
    // openssl_encrypt($value, $cipher_method, PARTNER_CLIENT_SECRET, 0, $iv); // The 0 value is the 4th parameter default value
    console.log('===== encrypting: value: ', value);
    var encrypted_value = aesCtr.encrypt(value);
    console.log('===== encrypted_value: ', encrypted_value);
    params[key] = encrypted_value;
  });
  params = ksort(params);
  console.log('===== ksorted params: ', params);
  var params_str = implode(',', params);
  console.log('===== params_str: ', params_str);
  var signature_hash = HmacSHA256(params_str, PARTNER_CLIENT_SECRET);
  params['signature'] = signature_hash;

  // Add params that must not be used for generating signature
  params['model'] = OPTIONAL_MODEL;
  params['email'] = OPTIONAL_CLIENT_EMAIL; // Optional

  var withingsUrl = `${WITHINGS_URL_PREFIX}/sdk/sdk_init?${HttpBuildQuery(params)}`;
  console.log('====== withingsUrl: ', withingsUrl);
  return withingsUrl;
};

import { moment } from 'libraries';

/**
 * a helper for get path user
 * @param {*} path a path require string
 */
export const getPath = (path = '') => (path ? `/${path}` : '');

/**
 * a helper to conver object to url paramss
 * @param {*} params a params require trully object
 */
export const createUrlParamFromObj = (params = null) => {
  if (!params) return '';
  const result = [];
  Object.keys(params).map(key => result.push(`${key}=${params[key]}`));
  return `?${result.join('&')}`;
};

/**
 * a helper to handling custom url
 * @param {*} url
 */
export const getCustomUrl = (url = '') => url;

/**
 * a helper to handling contentType of header request
 * @param {*} type a default type is application/json
 */
export const getContentType = (type = '') => {
  switch (type) {
    case 'form-data':
      return 'multipart/form-data';
    default:
      return 'application/json';
  }
};

/**
 * a helper for creating header in request
 * @param {*} value
 * @param {*} base
 */
export const createHeader = (value = {}, base = {}) => ({
  ...base,
  ...value
});

/**
 * a helper to shorthand promise result
 * @param {*} promise
 */
export const handleAsync = async promise => {
  try {
    const response = await promise;
    return [response, undefined];
  } catch (err) {
    return [undefined, err];
  }
};

/**
 * a helper to convert date with moment
 * @param {*} date
 */
export const convertDate = date => {
  if (!date) return null;
  return moment(date).format('DD MMMM YYYY');
};

/**
 * a helper to validata email string
 * @param {*} email
 */
export const validateEmail = (email = '') => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * a helper for handling code status for readable message to bahasa indonesia
 * @param {*} code a code from response code firebase service response
 */
export const createMessageFirebase = code => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Waduh, kata sandinya salah! pastikan akun kamu dan kata sandinya cocok ya!';
    case 'auth/user-not-found':
      return 'Waduh, akun kamu belum daftar di aplikasi kita nih! Coba daftar dulu lewat halaman registrasi dengan klik daftar';
    default:
      return 'Waduh, ada kesalahan sistem dari kami. Tapi jangan khawatir ini akan segera di perbaiki. coba lagi beberapa saat';
  }
};

/**
 * a helper for create profile state to save state profile reducer
 * @param {*} data
 */
export const createProfileObj = data => ({
  name: data.name,
  email: data.email,
  userId: data.userId,
  photo: data.photo
});

/**
 * a helper for get initial name from string
 * is used for user name
 * @param {*} nameString
 */
export const getInitialName = nameString => {
  if (!nameString) {
    return '?';
  }

  const nameArr = nameString.toLowerCase().split(' ');
  const firstLetterNames = nameArr.map((name, index) => {
    if (index < 2) {
      return name.substr(0, 1);
    }
    return '';
  });

  const result = firstLetterNames
    .join()
    .replace(/,/g, '')
    .toUpperCase();
  return result;
};

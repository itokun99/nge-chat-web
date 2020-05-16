import { moment } from 'libraries';

export const getPath = (path = '') => (path ? `/${path}` : '');

export const createUrlParamFromObj = (params = null) => {
  if (!params) return '';
  const result = [];
  Object.keys(params).map(key => result.push(`${key}=${params[key]}`));
  return `?${result.join('&')}`;
};

export const getCustomUrl = (url = '') => url;

export const getContentType = (type = '') => {
  switch (type) {
    case 'form-data':
      return 'multipart/form-data';
    default:
      return 'application/json';
  }
};

export const createHeader = (value = {}, base = {}) => ({
  ...base,
  ...value
});

export const handleAsync = async promise => {
  try {
    const response = await promise;
    return [response, undefined];
  } catch (err) {
    return [undefined, err];
  }
};

export const convertDate = date => {
  if (!date) return null;
  return moment(date).format('DD MMMM YYYY');
};

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const createMessageFromAuthError = code => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Waduh, kata sandinya salah! pastikan akun kamu dan kata sandinya cocok ya!';
    case 'auth/user-not-found':
      return 'Waduh, akun kamu belum daftar di aplikasi kita nih! Coba daftar dulu lewat halaman registrasi dengan klik daftar';
    default:
      return 'Waduh, ada kesalahan sistem dari kami. Tapi jangan khawatir ini akan segera di perbaiki. coba lagi beberapa saat';
  }
};

export const createProfileObj = data => ({
  name: data.name,
  email: data.email,
  userId: data.userId,
  photo: data.photo
});

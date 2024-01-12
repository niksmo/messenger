export const TEMPLATE = {
  name: /(^[A-Z]+[a-z-]*$)|(^[А-ЯЁ]+[а-яё-]*$)/,
  login: /^(?![0-9]{3,20}$)[a-z\d]{1}([a-z-_\d]){2,19}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d~!@#$%^&*()_+-=[\]{}|;':",./<>?]{8,40}$/,
  phone: /^\+?\d{10,15}$/,
};

export const HINT = {
  name: 'Latin or сyrillic letters with first capital letter, without spaces',
  login: 'Latin letters from 3 to 20 characters, can contain numbers',
  email: 'Invalid address',
  password:
    'One uppercase letter and one digit are required, from 8 to 40 characters',
  phone: 'From 10 to 15 digit, may start with plus symbol',
  confirmPassword: 'Passwords don"t match',
};

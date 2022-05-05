const validEmail = (str) => {
  const exp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return exp.test(str);
};

const validPassword = (str) => {
  //must contain at least 6 chars, including one uppercase letter, number and special symbol
  const exp = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
  );
  return exp.test(str);
};

const validName = (str) => {
  //must contain at least 3 chars. got to consist only of alpabet and spaces chars
  const exp = new RegExp(/^[a-zA-Z\s]{3,}$/);
  return exp.test(str);
};

module.exports = { validEmail, validPassword, validName };

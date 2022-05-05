const genToken = (jwtRef, id, email, expiresIn = false) => {
  const token = jwtRef.sign(
    { id, email },
    process.env.TOKEN_KEY,
    expiresIn && { expiresIn }
  );
  return token;
};

module.exports = { genToken };

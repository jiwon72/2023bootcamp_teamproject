// cookieHelper.js
const setCookie = (res, name, value, options = {}) => {
  const cookieOptions = {
    httpOnly: false,
    ...options,
  };

  res.cookie(name, value, cookieOptions);
};

const clearCookie = (res, name) => {
  res.clearCookie(name);
};

module.exports = {
  setCookie,
  clearCookie,
};

const findCookie = key => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(`${key}=`))
    .split("=")[1];
};

const setCookie = (key, value) => {
  let newCookie = `${key}=${value}`;
  newCookie += ";max-age=604800;SameSite=Lax";
  document.cookie = newCookie;
};

const cookieExists = key => {
  if (
    document.cookie.split(";").some(item => item.trim().startsWith(`${key}=`))
  ) {
    return true;
  }
  return false;
};

module.exports = {
  findCookie,
  setCookie,
  cookieExists
};

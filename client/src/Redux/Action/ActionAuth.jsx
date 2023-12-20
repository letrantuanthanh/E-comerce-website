export const onLogin = (data) => {
  return {
    type: "ON_LOGIN",
    data,
  };
};

export const onLogout = (data) => {
  return {
    type: "ON_LOGOUT",
    data,
  };
};

const initialState = {
  idUser: "",
};

const ReducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      // console.log('idUser: ', action.data);

      const stateLogin = [...state.idUser];
      stateLogin.idUser = action.data;
      return stateLogin;

    case "ON_LOGOUT":
      // console.log('idUser: ', action.data);

      const stateLogout = [...state.idUser];
      stateLogout.idUser = action.data;
      return stateLogout;

    default:
      return state;
  }
};

export default ReducerAuth;

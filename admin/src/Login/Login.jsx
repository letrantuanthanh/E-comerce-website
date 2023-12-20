import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const { loading, error, dispatch } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();

      setUser(response);
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    // const findUser = user.find((value) => {
    //   return value.email === email;
    // });

    // if (findUser && findUser.password === password) {
    //   dispatch({ type: "LOGIN_SUCCESS", payload: findUser });
    //   // navigate("/")
    // } else {
    //   alert("Email or password wrong!");
    // }

    // if (findUser.password !== password) {
    // 	setErrorPassword(true);
    // 	return;
    // } else {
    // 	setErrorPassword(false);

    // 	localStorage.setItem('id_user', findUser._id);

    // 	localStorage.setItem('name_user', findUser.fullname);

    // 	const action = addSession(localStorage.getItem('id_user'));
    // 	dispatch(action);

    // 	setCheckPush(true);
    // }

    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        "https://e-commerce-service-rghn.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      localStorage.setItem("token", res.token);
      localStorage.setItem("id_user", res.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

      localStorage.setItem("expiryDate", expiryDate.toISOString());

      if (!response.ok) {
        alert(res.message);
        return;
      }

      const findUser = user.find((value) => {
        return value._id === res.userId;
      });

      console.log(findUser);
      dispatch({ type: "LOGIN_SUCCESS", payload: findUser });

      // setCheckPush(true);

      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: "block" }}>
      <div className="page-breadcrumb">
        <div className="row">
          <div class="login">
            <div class="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

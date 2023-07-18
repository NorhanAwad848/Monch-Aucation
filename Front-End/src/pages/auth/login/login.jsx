import { useNavigate } from "react-router-dom";
import "./login.css";
import { useRef, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { setAuthToken } from "../../../core/services/auth";

export const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    loading: false,
    err: null,
  });

  const form = useRef({
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true });
    axios
      .post("http://localhost:4000/api/auth/login", {
        email: form.current.email.value,
        password: form.current.password.value,
      })
      .then((data) => {
        setLogin({ ...login, loading: false });
        const user = jwt(data.data.token);
        setAuthToken(data.data.token);
        if (user.role === "Admin") {
          navigate("/admin-home");
        } else if (user.role === "Seller") {
          navigate("/seller-home");
        }
        else if (user.role === "Bidder") {
          navigate("/bidder-home");
        }
      })
      .catch((errors) => {
        if (typeof errors.response.data.message === "string") {
          setLogin({ ...login, loading: false, err: [{ msg: errors.response.data.message }] });
        } else {
          setLogin({ ...login, loading: false, err: errors.response.data.message });
        }
      });
  };

  const loadingSpinner = () => {
    return (
      <div className="containers h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  const error = () => {
    return (
      <div className="error-containers">
          {login.err.map((err, index) => (
            <div key={index} className="col-sm-12 alert alert-danger" role="alert">
              {err.msg}
            </div>
          ))}
        
      </div>
    );
  };
  
  return (
    <>
      {login.err !== null && error()}
      {login.loading === true ? (
        loadingSpinner()
      ) : (
        // <div className="containers h-100">
        //   <div className="row h-100 justify-content-center align-items-center">
        //     <div className="col-xl-12">
        //       <div className="card mb-4">
        //         <div className="card-header">Login</div>
        //         <div className="card-body">
        <section className="create">
        <div className="box">
            <span className="borderline"></span>
                  <form onSubmit={(e) => submit(e)}>
                  <h2>Login</h2>

                    <div className="inputBox">
                        <input type="text" id="email" required ref={(val) => {
                           form.current.email = val;
                        }}/>
                        <span>Email address</span>
                        <i></i>
                    </div>
                 <br/><br/>
                    <div className="inputBox">
                        <input type="password" id="password" required ref={(val) => {
                            form.current.password = val;
                        }}/>
                        <span>Password</span>
                        <i></i>
                    </div>
                    <br/><br/>
                    <input className="btn-create   form-control" type="submit" value="Login"/>
                  </form>
                </div>
             </section>
      )}
    </>
  );
};

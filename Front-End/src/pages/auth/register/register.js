import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    loading: true,
    result: {},
    err: null,
  });

  const form = useRef({
    email: "",
    password: "",
    name: "",
    RoleID: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true });
    axios
      .post("http://localhost:4000/api/auth/register", {
        name: form.current.name.value,
        email: form.current.email.value,
        password: form.current.password.value,
        RoleID: form.current.RoleID.value,
      })
      .then(() => {
        setRegister({ ...register, loading: false });
        navigate("/login");
      })
      .catch((errors) => {
        setRegister({ ...register, loading: false, err: errors.response.data.message });
      });
  };

  useEffect(() => {
    setRegister({ ...register, loading: true });
    axios
      .get("http://localhost:4000/api/auth/register")
      .then((data) => {
        setRegister({ ...register, result: data.data, loading: false, err: null });
      })
      .catch((err) => {
        setRegister({ ...register, loading: false, err: [{ msg: `something went wrong ${err}` }] });
      });
  }, []);

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
        {Array.isArray(register.err) ? (
          register.err.map((err, index) => (
            <div key={index} className="error-message">
              {err.msg}
            </div>
          ))
        ) : (
          <div className="error-message">
            {register.err}
          </div>
        )}
      </div>
    );
  };
  

  return (
    <>
      {register.err !== null && error()}
      {register.loading === true ? (
        loadingSpinner()
      ) : (
      
        <section className="create">
            <div className="box">
                <span className="borderline"></span>
                  <form onSubmit={(e) => submit(e)}>
                  <h2> Register new user</h2>
                  <br/><br/>
                    <div className="inputBox">
                        <input type="text" id="name" required ref={(val) => {
                          form.current.name = val;
                        }}/>
                        <span>Name</span>
                        <i></i>
                    </div>
                    <br/>
                    <div className="inputBox">
                        <select type="text"  id="role" required ref={(val) => {
                           form.current.RoleID = val;
                        }} >
                            <option value="-1">Select a Role</option>
                            {register.result.roles && register.result.roles.length > 0 ? (
                              register.result.roles.map((role) => {
                                if (role.name !== "Admin") {
                                  return (
                                    <option key={role.id} value={role.id}>
                                      {role.name}
                                    </option>
                                  );
                                }
                                return null;
                              })
                            ) : (
                              <option value="-1">No roles available</option>
                            )}
                        </select>
                        <span>Role</span>
                        <i></i>
                    </div>
                    <br/>
                     <div className="inputBox">
                        <input type="text" id ="email" required ref={(val) => {
                            form.current.email = val;
                          }}/>
                        <span> Email Address</span>
                        <i></i>
                    </div>
                    <br/>
                       <div className="inputBox">
                        <input type="text" id="password" required ref={(val) => {
                             form.current.password = val;
                          }}/>
                        <span>Password</span>
                        <i></i>
                    </div>
                    <br/>
                   
                    <input className="btn-create x" type="submit" value="Register"/>
                   
                  </form>
                </div>
                </section>
        
      )}
    </>
  );
};

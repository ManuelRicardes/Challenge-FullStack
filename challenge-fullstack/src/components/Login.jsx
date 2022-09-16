import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const history = useHistory();

  const [email, setLoginEmail] = useState("");
  const [password, setLoginPassword] = useState("");
  let data = { email, password };

  const login = async () => {
    setLoginEmail("");
    setLoginPassword("");
    try {
      let token = await axios.post(`http://localhost:3333/user/login`, data);

      localStorage.setItem("auth_token", JSON.stringify(token.data));
      console.log(token.data[0]);

      // console.log("te loegueaste", token.data)
      history.push("/dashboard");
      return token;
    } catch (error) {
      console.log("no entro al try");
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your email and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      placeholder="Email"
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      placeholder="Password"
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={login}
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div classNameName='d-flex'>
    // <h1>Login</h1>
    // <div classNameName='justify-content-center align-content-center p-2'>
    // <input

    //         name="loginEmail"
    //         placeholder={"Correo Electronico"}
    //         type="email"
    //         id="email"
    //         // classNameName={style.input}
    //         // onChange={(e) => setLoginEmail(e.target.value)}
    //         />
    //     </div>
    //     <div>
    //       <input

    //         name="loginPassword"
    //         placeholder={"password"}
    //         type="password"
    //         id='password'
    //         // classNameName={style.input}
    //         // onChange={(e) => setLoginPassword(e.target.value)}
    //          />
    //     </div>
    //     <button>submit</button>

    // 	</div>
  );
};

export default Login;

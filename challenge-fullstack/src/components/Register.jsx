import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let data = { email, password, username };

  const register = async () => {
    setEmail("");
    setPassword("");
    setUsername("");
    try {
      let token = await axios.post(`http://localhost:3333/user/register`, data);

      localStorage.setItem("auth_token", JSON.stringify(token.data));

      history.push("/dashboard");
      return token;
    } catch (error) {
      console.log("no");
    }
  };

  return (
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
                  <p class="text-white-50 mb-5">Please complete the form!</p>

                  <div class="form-outline form-white mb-4">
                    <input
                      placeholder="Username"
                      type="emtextail"
                      id="typeUsernameX"
                      class="form-control form-control-lg"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      placeholder="Email"
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      placeholder="Password"
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={() => register()}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

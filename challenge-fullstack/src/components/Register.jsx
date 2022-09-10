import React from "react";

const Register = () => {
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
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      placeholder="Email"
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      placeholder="Password"
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                  </div>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
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

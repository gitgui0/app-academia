import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AlertToast from "./AlertToast";
import TokenContext from "../app/src/TokenContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState("teste1@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState(location.state?.error);
  const [errorStatus, setErrorStatus] = useState(location.state?.status);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

 

  

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      setShowToast(true);
      // Clear the error message by navigating to the same route without the state
      navigate("/login");
    }
  }, [location.state?.error]);
  

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });

      navigate("/");
    } catch (error) {
      
      setError(error.response.data.message);
      setErrorStatus(error.response.status)

      if (!error.response.data.message) {
        setError(error.response.statusText);
      }
      setShowToast(true);
    }
    setLoading(false);
  };

  

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000); // Change this to set the duration for which the toast is visible

      return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before the timer finishes
    }
  }, [showToast]);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-[100vh] bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600">
        {showToast ? <AlertToast message={error} status={errorStatus} /> : null}

        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="px-6 py-8 space-y-4 md:space-y-6 sm:px-8 sm:py-12">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="leandro@gmail.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                  required=""
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full text-white bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-500 ease-in-out transform hover:scale-[1.01] hover:shadow-lg"
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-white animate-spin dark:text-blue-600 fill-blue-600 dark:fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

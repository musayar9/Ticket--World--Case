import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosUserApi } from "../axios/axiosUserApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { SiteContext } from "../context/SiteContext";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet";
export default function Login() {
  const {
    showSuccessToast,
    showErrorToast,
    navigate,
    isSignup,
    setIsSignup,
    setIsLogin,
    isValid,
    setIsValid,
  } = useContext(SiteContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Required"),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSignup) {
      showSuccessToast("Registry success");
      setIsSignup(false);
    }
  }, []);

  const defaultLoginUser = {
    email: "",
    password: "",
  };

  const handleLogin = async (loginUser) => {
    const response = await axiosUserApi.get("/users");
    const responseData = await response.data;
    const filtered = responseData?.find(
      (user) => user.email === loginUser.email
    );
    if (filtered === undefined) {
      showErrorToast("User not available");
    } else if (
      filtered?.email === loginUser.email &&
      filtered?.password === loginUser.password
    ) {
      localStorage.setItem("onlineUser", JSON.stringify(filtered));
      setIsValid(true);
      setIsLogin(true);
      navigate("/");
    } else {
      showErrorToast("Wrong password");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="login" />
      </Helmet>
      <div className="mt-20">
        <div className="container mx-auto -mb-10 max-2xl:w-[35%] max-xl:w-[55%] max-lg:w-[65%] max-sm:w-[100%]">
          <img
            src={logo}
            alt="logo"
            className="w-44 h-44 mt-6 p-4 mx-auto drop-shadow-md bg-transparent rounded-full"
          />
          <div className=" p-6 border border-solid border-gray-300 rounded-md shadow-sm shadow-gray-300">
            <Formik
              initialValues={defaultLoginUser}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {() => (
                <Form>
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5"
                      placeholder="davis@flowbite.com"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5"
                      placeholder="******"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Log in
                  </button>
                  <ToastContainer />
                </Form>
              )}
            </Formik>
          </div>
          <div
            className="border border-solid border-gray-300 p-4 my-2 rounded-md shadow-sm shadow-gray-300"
            role="group"
          >
            <label htmlFor="terms" className="ml-2 text-sm ">
              Don't you have an account?
              <Link
                to="/signup"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Sign up
              </Link>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

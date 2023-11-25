import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SiteContext } from "../context/SiteContext";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet";
import { axiosConcertApi } from "../axios/axiosConcertApi";

export default function Signup() {
  const { showErrorToast, navigate, setIsSignup } = useContext(SiteContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Required"),
    terms: Yup.boolean().oneOf([true]),
  });

  const defaultUser = {
    id: uuidv4(),
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const handleSubmit = async (user) => {
    const response = await axiosConcertApi.get("/api/users");
    const responseData = await response.data;
    const filtered = responseData.user?.find(
      (item) => item.email === user.email
    );

    if (filtered !== undefined) {
      showErrorToast("User exist");
    } else {
      axiosConcertApi.post("/api/users", user);
      setIsSignup(true);
      navigate("/login");
    }
  };

  return (
    <>
      <Helmet>
        <title>Ticket World</title>
        <meta name="description" content="ticket-world" />
      </Helmet>
      <div className="mt-20 container mx-auto my-14 max-2xl:w-[35%] max-xl:w-[55%] max-lg:w-[65%] max-sm:w-[100%]">
        <img
          src={logo}
          alt="logo"
          className="w-44 h-44 mt-6 p-4 mx-auto drop-shadow-md bg-transparent rounded-full"
        />
        <div className="p-6 border border-solid border-gray-300 rounded-md shadow-sm shadow-gray-300">
          <Formik
            initialValues={defaultUser}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                <div className="mb-2">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5"
                    placeholder="Davis"
                    required
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5"
                    placeholder="Joseph"
                    required
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="w-4 h-4 border border-gray-300 outline-none rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-sm">
                    I agree with the
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register new account
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
          <label htmlFor="terms" className="ml-2 text-sm">
            Do you already have an account?
            <Link
              to="/login"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Log in
            </Link>
          </label>
        </div>
      </div>
    </>
  );
}

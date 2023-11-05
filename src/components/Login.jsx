import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosUserApi } from "../axios/axiosUserApi";

export default function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters")
      .required("Required"),
  });
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
      console.log("Böyle bir kullanıcı yok");
    } else if (
      filtered?.email === loginUser.email &&
      filtered?.password === loginUser.password
    ) {
      console.log("giriş yaoıldı");
    } else {
      console.log("şifre yanlış");
    }
  };

  return (
    <div className="container mx-auto  my-14 max-2xl:w-[35%] max-xl:w-[55%] max-lg:w-[65%] max-sm:w-[100%]">
      <div className=" p-6 border border-solid border-gray-300">
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
            </Form>
          )}
        </Formik>
      </div>
      <div
        className="border border-solid border-gray-300 p-4 my-2"
        role="group"
      >
        <label htmlFor="terms" className="ml-2 text-sm ">
          Don't you have an account?{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign up
          </a>
        </label>
      </div>
    </div>
  );
}

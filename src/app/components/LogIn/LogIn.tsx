"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LogInSchema } from "../../utils/yup";
import Link from "next/link";
import { SignInBtn } from "./../SignInBtn/SignInBtn";
import { signIn } from "next-auth/react";

const LogIn = () => {
  type Data = {
    email: string;
    password: string;
  };

  const [error, setError] = useState<string>("");

  const handleSubmit = async (data: Data, resetForm: any) => {
    const { email, password } = data;

    try {
      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!user?.ok) {
        setError("Don`t find your account");
        resetForm();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            validationSchema={LogInSchema}
            onSubmit={async (values: Data, { resetForm }) => {
              handleSubmit(values, resetForm);
            }}
          >
            <Form className="space-y-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="nadeinolegdev@gmail.com"
                  type="email"

                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className=" text-sm text-white align-center mt-1 p-2 bg-red-600 text-center rounded-lg"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Password
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className=" text-sm text-white align-center mt-1 p-2 bg-red-600 text-center rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>

              <div>
                Don`t have an account?{" "}
                <Link
                  className="hover:underline hover:text-primary"
                  href="/register"
                >
                  Register
                </Link>
              </div>
            </Form>
          </Formik>

          {error && (
            <p className=" text-sm text-white align-center mt-1 p-2 bg-red-600 text-center rounded-lg">
              {error}
            </p>
          )}

          <div className="flex items-center justify-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="mx-4 text-gray-500">or </p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center items-center">
            <SignInBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

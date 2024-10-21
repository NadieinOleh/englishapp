"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { checkUserExists } from "@/utils/helper";
import { SignUpSchema } from "@/utils/yup";

type Data = {
  email: string;
  password: string;
  name: string;
};

const SignIn = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: Data, resetForm: any) => {
    const { email, password, name } = data;
  
    try {
      const resUserExists = await checkUserExists(email);
  
      if (resUserExists.user) {
        setError("User already exists.");
        resetForm();
        return;
      }
  
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to create user:", errorData);
        setError("Error creating user");
        return;
      }
  
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      router.push("/");
    } catch (err) {
      console.error("Error occurred:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <Formik
            initialValues={{
              name: "",
              password: "",
              email: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSubmit(values, resetForm);
            }}
          >
            <Form className="space-y-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Oleh Nadiein"
                  className="  block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className=" text-sm text-white align-center mt-1 p-2 bg-red-600 text-center rounded-lg"
                />
              </div>

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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                >
                  Confirm Password
                </label>
                <Field
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className=" text-sm text-white align-center mt-1 p-2 bg-red-600 text-center rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </Form>
          </Formik>

          {error && (
            <p className=" text-sm text-white align-center mt-1 p-2 bg-red-600 text-center rounded-lg">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

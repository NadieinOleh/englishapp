import * as Yup from "yup";
import yupPassword from "yup-password";

yupPassword(Yup); 

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(32, "Too Long!")
    .required("This field is required"),
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .minLowercase(1, "Password must contain at least 1 lowercase letter")
    .minUppercase(1, "Password must contain at least 1 uppercase letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number, and special"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
});


export const LogInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .minLowercase(1, "Password must contain at least 1 lowercase letter")
    .minUppercase(1, "Password must contain at least 1 uppercase letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number, and special"
    ),
});
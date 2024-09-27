import SignIn from "../components/SignIn/SignIn";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authoption";

const Register = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <SignIn />;
};

export default Register;

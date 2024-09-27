import NextAuth from "next-auth/next";
import { authOptions } from "./authoption";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

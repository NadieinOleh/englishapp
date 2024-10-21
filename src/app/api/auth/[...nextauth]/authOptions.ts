import { connectMongoDb } from '@/lib/mongoDb';
import User from "@/models/user";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password }: any = credentials;

        try {
          await connectMongoDb();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        const { name, email, image } = user;

        console.log('Google user:', user);
        try {
          await connectMongoDb();
          const userExists = await User.findOne({ email });
          const API = process.env.NEXT_PUBLIC_APP_URL;

          if (!userExists) {
            const res = await fetch(`${API}/api/google`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                image,
              }),
            });

            if (res.ok) {
              return true;  
            }
          }
        } catch (error) {
          console.log("Error during sign-in:", error);
          return false; 
        }
      }

      return true;  
    },
  },
};

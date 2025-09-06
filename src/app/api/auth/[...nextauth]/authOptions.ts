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
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null;
          return user;
        } catch (error) {
          console.log("Error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/" },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        const { name, email, image } = user;
        try {
          await connectMongoDb();
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            // сохраняем Google avatar в базе
            await User.create({ name, email, image });
          }
        } catch (error) {
          console.log("Google signIn error:", error);
          return false;
        }
      }
      return true;
    },
  },
};

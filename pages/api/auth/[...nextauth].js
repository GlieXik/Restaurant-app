import UserModel from "@/models/Users";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        dbConnect();
        const { email, password } = credentials;

        const user = await UserModel.findOne({ email: email.toLowerCase() });

        if (!user) {
          throw new Error("Invalid Email or Pass");
        }
        const isPassMatcher = await bcrypt.compare(password, user.password);
        if (!isPassMatcher) {
          throw new Error("Invalid Email or Pass");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);

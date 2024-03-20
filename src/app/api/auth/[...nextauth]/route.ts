import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/models/Users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        console.log(credentials);

        try {
          await connectMongoDB();
          const user = await User.findOne({ username: credentials.username });
          const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

          if (!user) {
            return null;
          } else if (!passwordsMatch) {
            return null;
          } else {
            return user;
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // the route used to login
    signIn: "/",
  },
});

export { handler as GET, handler as POST };

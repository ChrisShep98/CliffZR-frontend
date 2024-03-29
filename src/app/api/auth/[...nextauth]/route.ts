import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { db } from "@/app/lib/db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler: NextAuthOptions = NextAuth({
  // adapter: PrismaAdapter(db),
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
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const res = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const user = await res.json();
          console.log(user);

          // const user = await db.user.findUnique({
          //   where: { username: credentials.username },
          // });
          // if (!user) {
          //   return null;
          // }
          // const passwordsMatch = await bcrypt.compare(
          //   credentials.password,
          //   user.password
          // );

          // if (!passwordsMatch) {
          //   return null;
          // }

          return user;
          // return {
          //   id: user.id + "",
          //   username: user.username,
          //   email: user.email,
          // };
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
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

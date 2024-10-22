import NextAuth, { Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      return !!auth?.user;
    },
    async signIn({
      user,
    }: // account,
    // profile,
    {
      user: User;
      // account: any;
      // profile: any;
    }) {
      try {
        const existUser = await getGuest(user?.email as string);

        if (!existUser)
          await createGuest({ email: user?.email, fullName: user?.name });
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session, user }: { session: Session; user: User }) {
      const existGuest = await getGuest(session?.user?.email as string);
      (session.user as User & { guestId: number }).guestId = existGuest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

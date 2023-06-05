import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const NEXT_PUBLIC_SECRET = process.env.NEXT_PUBLIC_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const googleProvider = GoogleProvider({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
});
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Customize sign-in behavior if needed
      const name = profile.name;
      return true;
    },
    async redirect(url, baseUrl) {
      // Customize redirect behavior if needed
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  // Other NextAuth configuration options
});

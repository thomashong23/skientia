import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
    },
  },
  // Other NextAuth configuration options
});
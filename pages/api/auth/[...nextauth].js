import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXT_PUBLIC_SECRET = process.env.NEXT_PUBLIC_SECRET;
const secretabc = "G7!n0rAS@zLjFpDXb#1e";

// Log environment variable values
console.log('GOOGLE_CLIENT_ID:', GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', GOOGLE_CLIENT_SECRET);
console.log('NEXT_PUBLIC_SECRET:', NEXT_PUBLIC_SECRET);
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirect_uri: "https://skientia.vercel.app/api/auth/callback/google",
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: secretabc,
};
export default NextAuth(authOptions);
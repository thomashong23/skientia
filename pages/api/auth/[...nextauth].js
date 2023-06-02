import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('NEXT AUTH SECRET:', process.env.NEXT_SECRET);
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "https://skientia.vercel.app/api/auth/callback/google",
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_SECRET
};
export default NextAuth(authOptions);
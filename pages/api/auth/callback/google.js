import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebase from 'firebase/compat/app';

const provider = new GoogleAuthProvider();

export default async function handler(req, res) {
  try {
    const auth = getAuth();
    // Set the redirect URI
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    // Sign in with Google
    await signInWithPopup(auth, provider);

    // Redirect to the desired URI
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

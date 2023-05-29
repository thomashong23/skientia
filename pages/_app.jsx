import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

export default function App({ Component, pageProps }) {


  return <Component {...pageProps} />;
}


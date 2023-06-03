import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react';
import 'styles/globals.css';
import Link from 'next/link';
export default function IndexPage() {
  const { data, status } = useSession();
  if (status === 'loading') return <h1> loading... please wait</h1>;
  console.log('NEXTAUTH SECRET:', process.env.NEXT_SECRET);
  console.log(process.env.GOOGLE_CLIENT_ID);
  if (status === 'authenticated') {

    return (
      <div className="content">
        <div className="vertical-container">
          <h1> hi {data.user.name}</h1>
          <img src={data.user.image} alt={data.user.name + ' photo'} />
          <button onClick={signOut}>sign out</button>
        </div>
        <footer>
          <nav className='flex-container'>
            <Link href="/page" id='left'><div >HOME</div></Link>
            <Link href="/createPost" id='middle'><div >POST</div></Link>
            <Link href="/page" id='right'><div >ACCOUNT</div></Link>
          </nav>
        </footer>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn('google')}>sign in with gooogle</button>
    </div>
  );
}
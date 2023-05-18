import Image from 'next/image'
import React from 'react';
import Link from 'next/link';
import 'styles/globals.css';

function Home() {
  var hello = 0;
  function changeColor() {
    const changed = document.getElementById("test123");
    hello += 1;
    if (changed) {
      if ((hello / 2 % 1)) {
        changed.style.backgroundColor = "#526760";
      }
      else {
        changed.style.backgroundColor = "#100774";
      }
    }


  }
  return (
    <div id='test123'>

      <div className='content'>


        <div id='header'><h1>Welcome to Skientia</h1>
        </div>
        <div className='body'>

        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <button onClick={changeColor} id='color'>hit this to change color</button>

      </div>
      <footer>
        <nav className='flex-container'>
          <Link href="/page" id='left'><div >HOME</div></Link>
          <Link href="/createPost" id='middle'><div >POST</div></Link>
          <Link href="/page" id='right'><div >ACCOUNT</div></Link>
        </nav>
      </footer>
    </div>

  )
}
export default Home;


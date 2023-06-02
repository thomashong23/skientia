import 'styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebase from '../firebase'; // Update the path if needed



export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [trailName, setTrailName] = useState('');
  const [starHello, setStarHello] = useState(0);
  const [crowdNum, setCrowdNum] = useState(0);
  const [rating1, setRating1] = useState(0);
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string>('');

  const handleTrailSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTrailName(event.target.value);
  };


  const getCurrentTime = () => {
    const now = new Date();
    const formattedTime = now.getTime() // Adjust the formatting as per your requirements
    setCurrentTime(formattedTime);
    setCurrentTime(formattedTime);
  };
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUsername(session.user.name || '');
    }
  }, [status, session]);

  useEffect(() => {
    getCurrentTime();


  }, []); // Add empty dependency array

  const StarRating = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index1) => {
          index1 += 1;
          return (
            <button
              type="button"
              key={index1}
              className={index1 <= rating1 ? "on" : "off"}
              onClick={() => {
                setRating1(index1);
                setStarHello(index1);
                const starHelloElement = document.getElementById('starHello');
                if (starHelloElement) {
                  starHelloElement.innerHTML = "The current crowds is: " + index1;
                }

              }
              }

            >
              <span className="star">&#9733;</span>
            </button>
          );
        })
        }
      </div >
    );

  };
  const CrowdRating = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;


          return (
            <button
              type="button"
              key={index}
              className={index <= rating ? "on" : "off"}
              onClick={() => {
                setRating(index);
                setCrowdNum(index);
                const crowdNumElement = document.getElementById('crowdNum');
                if (crowdNumElement) {
                  crowdNumElement.innerHTML = "The current crowds is: " + index;
                }

              }
              }

            >
              <span className="star">&#9733;</span>
            </button>
          );
        })
        }
      </div >
    );

  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();



    try {
      getCurrentTime();
      console.log("current time is " + currentTime)
      const response = await fetch('/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trailName,
          crowdNum,
          starHello,
          currentTime,
          username,
        }),
      });

      if (response.ok) {
        console.log('Post created successfully');
        // Clear form inputs

        setRating(0);
        setRating1(0);
        setCrowdNum(0);
        setStarHello(0);
        router.push('/page');
      } else {
        console.error('Error creating post:', response.status);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  function options() {
    return (
      <div id="trailselect">
        <label htmlFor='trail'>Trail:</label>
        <select name="trail" id="inputTrail" onChange={handleTrailSelect} >
          <option value="Nosedive">Nosedive</option>
          <option value="Liftline">Liftline</option>
          <option value="Lower-Nosedive">Lower Nosedive</option>
          <option value="Hayride">Hayride</option>
        </select>
      </div>
    )
  }

  return (
    <div className="content">
      <div className='vertical-container'>

        <form id='input' onSubmit={handleSubmit} >
          {options()} {/* Calling the options function */}
          <div id='reviewCrowd'>
            <div><label>Crowds</label></div>
            <div> <CrowdRating /></div>
          </div>
          <div id='reviewSnow'>
            <label>Snow Conditions</label>
            <StarRating />
          </div>
          <div id="submitForm"><button type="submit">Submit</button></div>
        </form>
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

import 'styles/globals.css';
import Link from 'next/link';
import React, { useState } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebase from '../firebase'; // Update the path if needed


export default function Home() {
  const [trailName, setTrailName] = useState('');
  const [starHello, setStarHello] = useState(0);
  const [crowdNum, setCrowdNum] = useState(0);
  const [rating1, setRating1] = useState(0);
  const [rating, setRating] = useState(0);
  const handleTrailSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTrailName(event.target.value);
  };
  const StarRating = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index1) => {
          index1 += 1;

          console.log(rating1);
          console.log("starhello is " + starHello)
          return (
            <button
              type="button"
              key={index1}
              className={index1 <= rating1 ? "on" : "off"}
              onClick={() => {
                setRating1(index1);
                setStarHello(index1);
                if (document.getElementById('starHello')) {
                  document.getElementById('starHello').innerHTML = String("The current rating is: " + index1);
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

          console.log(rating);
          console.log("crowdNum is " + crowdNum)
          return (
            <button
              type="button"
              key={index}
              className={index <= rating ? "on" : "off"}
              onClick={() => {
                setRating(index);
                setCrowdNum(index);
                if (document.getElementById('crowdNum')) {
                  document.getElementById('crowdNum').innerHTML = String("The current crowds is: " + index);
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
      const response = await fetch('/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trailName,
          crowdNum,
          starHello,
        }),
      });

      if (response.ok) {
        console.log('Post created successfully');
        // Clear form inputs
        setTrailName('');
        setCrowdNum(0);
        setStarHello(0);
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
          <option value="Lower-nosedive">Lower Nosedive</option>
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
    </div>
  )


}

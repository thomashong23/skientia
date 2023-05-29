
import React from 'react';
import Link from 'next/link';
import 'styles/globals.css';
import 'styles/homepage.css';
import { useEffect, useState } from 'react';
//const [posts, setPosts] = useState([]);
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

import { database } from '../firebase';

interface Review {
  id: string;
  trailName: string;
  crowdNum: number;
  starHello: number;
}
function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  console.log(reviews);
  useEffect(() => {
    const database = getDatabase(firebase);

    // Create a reference to the "reviews" node in the database
    const reviewsRef = ref(database, 'posts');

    // Listen for changes in the reviews data
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the data object to an array
        const reviewsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        var newReviewsArray = [];
        var deleteReviews = [];
        for (let i = 0; i < reviewsArray.length; i++) {
          if (reviewsArray[i].currentTime > Date.now() - 10 * 60 * 1000) {
            newReviewsArray.push(reviewsArray[i])
          }
          else {
            deleteReviews.push(reviewsArray[i])
            console.log("Deleting " + reviewsArray[i].trailName)
          }
        }

        // Update the reviews state with the retrieved data
        setReviews(newReviewsArray);
      }
    });
  }, []);

  // Group the reviews by trail name
  const reviewsByTrailName: { [key: string]: Review[] } = {};

  reviews.forEach((review) => {
    if (!reviewsByTrailName[review.trailName]) {
      reviewsByTrailName[review.trailName] = [];
    }
    reviewsByTrailName[review.trailName].push(review);
  });
  const renderStars = (numStars: number) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div id='test123'>

      <div className='content'>


        <div id='header'><h1>Welcome to Skientia</h1>
        </div>
        <div className='body'>

        </div>
        <div>
          {Object.entries(reviewsByTrailName).map(([trailName, reviews]) => (
            <div key={trailName}>
              <h2 className='label_head'>{trailName}</h2>
              {reviews.map((review) => (
                <div key={review.id} className='review-instance'>
                  <div className='review-datum'> CROWDS: {renderStars(review.crowdNum)} </div><div className='review-datum'>CONDITIONS: {renderStars(review.starHello)}</div>

                </div>
              ))}
            </div>
          ))}
        </div>

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


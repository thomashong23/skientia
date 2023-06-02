// import admin from 'firebase-admin';
// import serviceAccount from '/adminkey.json';
// import { database } from '../../firebase.js';
// import firebase from '../../firebase.js';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-project.firebaseio.com'
// });
// export default async function postData(req, res) {
//   if (req.method === 'POST') {
//     // Extract the data from the request body
//     const { trailName, crowdNum, starHello } = req.body;

//     // Perform the necessary Firebase database operations
//     try {
//       const database = firebase.database();
//       // Write your database code here
//       // For example:
//       await database.ref('posts').push({
//         trailName,
//         crowdNum,
//         starHello,
//       });

//       res.status(200).json({ message: 'Post created successfully' });
//     } catch (error) {
//       console.error('Error creating post:', error);
//       res.status(500).json({ message: 'Error creating post' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

import admin from 'firebase-admin';
import serviceAccount from '/adminkey.json';
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://skientia-default-rtdb.firebaseio.com'
  });
}

export default async function postData(req, res) {



  if (req.method === 'POST') {
    // Extract the data from the request body
    const { trailName, crowdNum, starHello, currentTime, username } = req.body;

    if (username == '') {
      console.log("user is not logged in")
    }


    try {
      const database = admin.database();
      // Write your database code here
      // For example:
      if (trailName != "") {
        await database.ref('posts').push({
          trailName,
          crowdNum,
          starHello,
          currentTime,
          username,

        });

      }

      res.status(200).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


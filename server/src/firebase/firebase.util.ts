import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PK
  })
});

const firestore = admin.firestore();
const auth = admin.auth();

export {
  firestore,
  auth
};

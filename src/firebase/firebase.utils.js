import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCOmyChq1ilNttXcdaxAE_EIKGOTRlXfLM",
  authDomain: "crown-db-d0c77.firebaseapp.com",
  projectId: "crown-db-d0c77",
  storageBucket: "crown-db-d0c77.appspot.com",
  messagingSenderId: "183340814008",
  appId: "1:183340814008:web:e7346c181a5d58d4252e4d",
  measurementId: "G-HJ11D5JLDE",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC8P4fF2KDSeYXAhfC-C7osetwRIxN6hr0",
    authDomain: "react-platform-2c59d.firebaseapp.com",
    databaseURL: "https://react-platform-2c59d.firebaseio.com",
    projectId: "react-platform-2c59d",
    storageBucket: "react-platform-2c59d.appspot.com",
    messagingSenderId: "1045485389198",
    appId: "1:1045485389198:web:8a2a816f5eccd297fe90df",
    measurementId: "G-8E6PJNNL7V"
};

export const createUserProfileDocument = async (userAuth, data) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    
    if(!snapshot.exists) {
        const {displayName, email, uid} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                uid,
                createdAt,
                ...data
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

export const addCollectionAndDocs = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account ' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
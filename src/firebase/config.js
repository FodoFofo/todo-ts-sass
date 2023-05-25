import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBgLEjTzmNbjxGvK7y-rllbr7lv4lKt2iM",
    authDomain: "ulohy-d3cfa.firebaseapp.com",
    projectId: "ulohy-d3cfa",
    storageBucket: "ulohy-d3cfa.appspot.com",
    messagingSenderId: "106183094377",
    appId: "1:106183094377:web:7ae7344f6fbb7da4dab2f8"
  };

// Počiatočné nastavenie firebase (init)
firebase.initializeApp(firebaseConfig)

 // Počiatočné nastavenie služieb (init)
 const projectFirestore = firebase.firestore()

 export { projectFirestore }
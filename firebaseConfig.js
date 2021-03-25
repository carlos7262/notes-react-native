import firebase from 'firebase'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDQlHKoS0I7uG-jWrwUW29qwxIcNshw688",
    authDomain: "notas-a3df5.firebaseapp.com",
    projectId: "notas-a3df5",
    storageBucket: "notas-a3df5.appspot.com",
    messagingSenderId: "974122207858",
    appId: "1:974122207858:web:eb51c804b52554a5ca90eb"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export {
    db
}
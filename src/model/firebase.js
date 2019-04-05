import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDBDLiUeIhgBd9gt4A6NFMGrmhcVmOWx_s",
    authDomain: "my-test-fdf48.firebaseapp.com",
    databaseURL: "https://my-test-fdf48.firebaseio.com",
    projectId: "my-test-fdf48",
    storageBucket: "my-test-fdf48.appspot.com",
    messagingSenderId: "23007514443"
};

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
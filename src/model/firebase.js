import firebase from 'firebase';

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
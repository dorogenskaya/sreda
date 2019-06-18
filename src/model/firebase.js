import firebase from 'firebase';
import * as jsonConfig from './config';

firebase.initializeApp(jsonConfig);

export default firebase;
export const database = firebase.database();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
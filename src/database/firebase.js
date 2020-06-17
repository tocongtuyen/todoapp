// database/firebaseDb.js

import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import { decode, encode } from 'base-64'

if (!global.btoa) {
    global.btoa = encode
}

if (!global.atob) {
    global.atob = decode
}

const firebaseConfig = {
    apiKey: 'AIzaSyCUcE7y75i0B726yfXVCfkYa66UVd9dK2o',
    authDomain: 'todoapp-282a1.firebaseapp.com',
    databaseURL: 'https://todoapp-282a1.firebaseio.com',
    projectId: 'todoapp-282a1',
    storageBucket: 'todoapp-282a1.appspot.com',
    messagingSenderId: '879555657663',
    appId: '1:879555657663:web:9be66e925392121ba1ab0a',
    measurementId: 'G-10YEB3XQ88',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase

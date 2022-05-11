import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBVTadhxkaxDddynGk9gD7QDeeTM1AespA',
  authDomain: 'airbnb-demo-d89ef.firebaseapp.com',
  projectId: 'airbnb-demo-d89ef',
  storageBucket: 'airbnb-demo-d89ef.appspot.com',
  messagingSenderId: '343802631042',
  appId: '1:343802631042:web:8a71245e5071c86da4759b',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

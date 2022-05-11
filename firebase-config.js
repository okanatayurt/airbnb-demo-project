import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTHDOMAIN}`,
  projectId: `${process.env.PROJECTID}`,
  storageBucket: `${process.env.STORAGEBUCKET}`,
  messagingSenderId: `${process.env.MESSAGINGSENDERID}`,
  appId: `${process.env.APPID}`,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

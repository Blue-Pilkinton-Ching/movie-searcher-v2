import { initializeApp } from 'firebase/app'

import { getAnalytics } from 'firebase/analytics'
import * as firebase from 'firebase/app'

if (!firebase.getApps().length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyDleFcM-7ohh4diMcVIz7sxb8EUlsjGLLE',
    authDomain: 'watchalot-27b1c.firebaseapp.com',
    projectId: 'watchalot-27b1c',
    storageBucket: 'watchalot-27b1c.appspot.com',
    messagingSenderId: '1059512127171',
    appId: '1:1059512127171:web:7f759589859065fba21c76',
  }

  const app = initializeApp(firebaseConfig)
  if (typeof window !== 'undefined') {
    getAnalytics(app)
  }
}

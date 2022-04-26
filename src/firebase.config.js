import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAuBaLm6Ti8YHANSa2rBHda1cTbPB2F9FU',
	authDomain: 'house-marketplace-app-7462a.firebaseapp.com',
	projectId: 'house-marketplace-app-7462a',
	storageBucket: 'house-marketplace-app-7462a.appspot.com',
	messagingSenderId: '274158978030',
	appId: '1:274158978030:web:f61e401a779d6d0abe04ff',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()

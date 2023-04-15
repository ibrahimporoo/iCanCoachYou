import { initializeApp } from 'firebase/app'
import {
	getFirestore, doc, getDoc
} from 'firebase/firestore/lite';

// iCanCoachU Firebase...
const firebaseConfig = {
  apiKey: "AIzaSyBsBaihwh8F_UY8oYEsfcMlQEwEIgXcbxc",
  authDomain: "elmawkaabeta.firebaseapp.com",
  databaseURL: "https://elmawkaabeta.firebaseio.com",
  projectId: "elmawkaabeta",
  storageBucket: "elmawkaabeta.appspot.com",
  messagingSenderId: "808588970288",
  appId: "1:808588970288:web:8fe9fcbf5e7ca8cca820f5",
  measurementId: "G-G8FTTQ0EB2"
};

initializeApp(firebaseConfig);
const db = getFirestore();

async function fetchSingleCoach() {
	const coachContainer = document.getElementById('coach-container');
	const profileImg = document.querySelector('.profile-img');
	const documentId = sessionStorage.getItem('selectedCoach');
	const documentLang = sessionStorage.getItem('lang');
	const docRef = doc(db, 'coaches', 'languages', documentLang, documentId);
	const docSnap = await getDoc(docRef);
	const coach = docSnap.data();
	coachContainer.innerHTML = `
		<div class="portfolio-info" id=${coach.name.trim().replace(' ', '')}>
			<h3>${coach.name}</h3>
			<ul>
				<li><strong>Job title</strong>: ${coach.jobTitle}</li>
				<li><strong>Category</strong>: ${coach.category}</li>
				<li><strong>Pricing</strong>: ${coach.pricing}</li>
				<li><strong>LinkedIn profile</strong>: <a href="${coach.SM_account}" target="_blank" class="btn-buy mt-2">Visit</a></li>
				<li><strong>LinkedIn profile</strong>: <a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a></li>
			</ul>
		</div>
		<div class="portfolio-description">
			<h2>About me</h2>
			<p>
				${coach.summary}
			</p>
		</div>
	`;
	profileImg.innerHTML = `<img src=${coach.image} alt="${coach.name.trim().replace(' ', '')}">`
}

fetchSingleCoach();
import { initializeApp } from 'firebase/app'
import {
	getFirestore, doc, getDoc
} from 'firebase/firestore/lite';
// // iCanCoachU Example Firebase...
// const firebaseConfig = {
// 	apiKey: "AIzaSyCl1e2eawcwTIdXk7E7IGbxiEnG4guzVzM",
// 	authDomain: "just-like-icancoachu.firebaseapp.com",
// 	projectId: "just-like-icancoachu",
// 	storageBucket: "just-like-icancoachu.appspot.com",
// 	messagingSenderId: "415289518874",
// 	appId: "1:415289518874:web:263bf9089765a2a312daa3"
// };
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
	const profileVideo = document.querySelector('.video-tag');
	const bookBtn = document.querySelector('.book-btn');
	const documentId = sessionStorage.getItem('selectedCoach');
	const documentLang = sessionStorage.getItem('lang');
	const docRef = doc(db, 'coaches', 'languages', documentLang, documentId);
	const docSnap = await getDoc(docRef);
	const coach = docSnap.data();
	coachContainer.innerHTML = `
		<div class="portfolio-info" id=${coach.name.trim().replace(/\s+/g, "_").toLowerCase()}>
			<h3>${coach.name}</h3>
			<ul>
				<li><strong>Job title</strong>: ${coach.jobTitle}</li>
				<li><strong>Industry</strong>: ${coach.industry}</li>
				<li><strong>Category</strong>: ${coach.category}</li>
				${
					coach.pricing ? `<li><strong>Pricing</strong>: ${coach.pricing}</li>`: `<li><strong>Pricing</strong>: ${coach.pricing_in_egypt}</li>`
				}
				<div class="align-items-center d-flex pt-3 gap-2 social w-100">
					${
						/^(https?:\/\/)?(www\.)?linkedin.com\/(company\/[a-zA-Z0-9_\-]+|in\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.SM_account) ? `<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>` : `<a href="${coach.linkedIn_account}" target="_blank"><i class="bi bi-linkedin"></i></a>`
					}
					${
						/^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_\-]+\/?$/.test(coach.instagram_account) ? `<a href="${coach.instagram_account}" target="_blank"><i class="bi bi-instagram"></i></a>`: ``
					}
					${
						/^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9_]{1,15}\/?$/.test(coach.twitter_account) ? `<a href="${coach.twitter_account}" target="_blank"><i class="bi bi-twitter"></i></a>`: ``
					}
					${
						/^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/.test(coach.facebook_account) ? `<a href="${coach.facebook_account}" target="_blank"><i class="bi bi-facebook"></i></a>`: ``
					}
					${
						/^(https?:\/\/)?(www\.)?youtube.com\/(channel\/[a-zA-Z0-9_\-]+|user\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.youtube_account) ? `<a href="${coach.youtube_account}" target="_blank"><i class="bi bi-youtube"></i></a>`: ``
					}
					${
						/^(https?:\/\/)?(www\.)?tiktok.com\/(@[a-zA-Z0-9.\-_]+|v\/[a-zA-Z0-9.\-_]+|embed\/[a-zA-Z0-9.\-_]+)/.test(coach.tiktok_account) ? `<a href="${coach.tiktok_account}" target="_blank"><i class="bi bi-tiktok"></i></a>`: ``
					}
				</div>
				<div>
					${
						Array.isArray(coach.coach_working_life_tags) ?
						coach.coach_working_life_tags.map(tag => `<span>${tag}</span>`).join('')
						: ``
					}
				</div>
				${coach.coach_calendly_link? `<span><a href="${coach.coach_calendly_link}" target="_blank" class="schedule"><i class="bi bi-calendar2"></i>Schedule Interview</a></span>` : `<span><a href="${coach.coach_tidycal_link}" target="_blank" class="schedule"><i class="bi bi-calendar2"></i>Schedule Interview</a></span>`}
		<div class="portfolio-description">
			<h2>About me</h2>
			<p>${coach.summary}</p>
			${
			coach.work_experience?
			`<h2>Work Experience</h2><p>${coach.work_experience}</p>`: ``
			}
		</div>
	`;
	profileImg.innerHTML = `<div class="pic"><img src=${coach.image} class="img-fluid" onerror="this.onerror=null;this.src='assets/img/team/default-img-1.jpg';" alt="${coach.name}"></div>`;
	profileVideo.innerHTML = `
			${
			/^(ftp|http|https):\/\/[^ "]+$/.test(coach.videoDownloadURL)? 
			`<video controls style="width: 100%;object-fit: cover;margin-top: 30px;border-radius: 6px;" onerror="console.log('Video error occurred'); this.remove();"
			oncanplaythrough="this.isLoaded = true;"
			onloadstart="this.isLoaded = false;">
				<source src="${coach.videoDownloadURL}" type="video/mp4">
				<source src="${coach.videoDownloadURL}" type="video/webm">
				<source src="${coach.videoDownloadURL}" type="video/ogg">
				Your browser does not support the video tag.
			</video>`: ``
		}
	`;
	bookBtn.innerHTML = `<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Book Now</a>`
}

fetchSingleCoach();

// setTimeout(() => {
// 	const video = document.querySelector('video');
// 	video.addEventListener('error', () => {
// 		if (!video.isLoaded) {
// 			video.remove();
// 		}
// 	});
// }, 4000);
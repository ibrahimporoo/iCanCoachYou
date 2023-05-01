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
	/* Selecting Elements */
	const coachImage = document.getElementById("coach-image");
	const coachName = document.getElementById("coach-name");
	const coachJobTitle = document.getElementById("coach-job-title");
	const coachSmIcons = document.getElementById("coach-sm-icons");
	const coachTags = document.querySelector(".coache-tags");
	const coachSchedule = document.querySelector(".schedule");
	const aboutContainer = document.getElementById("about-container");
	const coachLocation = document.getElementById("coach-location");
	const coachPrice = document.getElementById("coach-price");

	/* Getting The Choosed Coach */
	const documentId = sessionStorage.getItem('selectedCoach');
	const documentLang = sessionStorage.getItem('lang');
	const docRef = doc(db, 'coaches', 'languages', documentLang, documentId);
	const docSnap = await getDoc(docRef);
	const coach = docSnap.data();
	//	Coach Image
	let theImage = document.createElement('img');
	theImage.src = coach.image;
	theImage.alt = coach.name;
	theImage.setAttribute("target", "_blank");
	coachImage.innerHTML = '';
	coachImage.appendChild(theImage);
	//	Coach Name
	coachName.innerText = coach.name;
	//	Coach job title
	coachJobTitle.innerText = coach.jobTitle;
	
	// 
	// theScheduleTag.href = /https:\/\/calendly\.com\/[a-zA-Z0-9_-]+(?:\?.*)?/.test(coach.coach_calendly_link) ?
	// coach.coach_calendly_link : /https:\/\/tidycal\.com\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*/.test(coach.coach_tidycal_link) ?
	// coach.coach_tidycal_link : ``;
	//
	//	Coach Scheduling System
	if(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(coach.paymentLink)) {
	let theScheduleTag = document.createElement('a');
	theScheduleTag.href = coach.paymentLink;
	theScheduleTag.setAttribute('target', '_blank');
	theScheduleTag.innerHTML = `<i class="bi bi-calendar2"></i>Book and scheduling a meeting`;
		coachSchedule.appendChild(theScheduleTag);
	}
	//	Coach SM Icons
	coachSmIcons.innerHTML = `
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
	`;
	// Coach Tags
	coachTags.innerHTML = `
		${
			Array.isArray(coach.coach_working_life_tags)
				? coach.coach_working_life_tags
						.join(",")
						.split(",")
						.map((tag) => `${tag.trim() != ''? `<span>${tag}</span>`: ``}`)
						.join("")
				: ""
		}
	`;
	// About Coach
	aboutContainer.innerHTML = `
	<span>About Me</span>
	<div>
			${
				coach.college && coach.study_field && coach.graduation_year ? 
				`<p class="mb-2"><strong>I have Studied at ${coach.college} in the field of ${coach.study_field} and my graduation year is ${coach.graduation_year}.</strong></p>` : ``
			}
			<p>
				${coach.summary}
			</p>
			${typeof coach.industry == 'string' ? `<p class="mb-3">I can coach you in <strong>${coach.industry}</strong>.</p>` : ``}
			${coach.coach_role_model && typeof coach.coach_role_model == 'string' ? `<p class="mb-1 mt-1">My Role Model is <strong>"${coach.coach_role_model}".</strong></p>` : ``}
			${coach.coach_objective_life && typeof coach.coach_objective_life == 'string' ? `<p class="mb-2">My Goal is <strong>"${coach.coach_objective_life}"</strong></p>` : ``}
	</div>

	${
		typeof coach.work_experience === 'string' ?
		`
		<span>Work Experience</span>

		<div id="work-exp">
			
			<p>${coach.work_experience.replaceAll('Yes,', '').replaceAll('yes,', '').replaceAll('yes', '').replaceAll('Yes', '')}</p>
	
		</div>
		` : ``
	}


	${
		typeof coach.session_way === 'string' ?
		`
		<span>My Sessions Way</span>
		<p>
			Currently I can teach you ${coach.session_way == 'both'? 'Online or Offline according to your needs.' : coach.session_way}
		</p>
		` : ``
	}
	

	${
		!isNaN(Number(coach.work_experience_years)) && coach.work_experience_years > 0 ?
		`
		<div class="achievements-cards p-4 mt-5">
			<div class="box d-flex align-items-center gap-1">
				<img width="130px" src="assets/img/experience-icon-1.jpg" alt="EXP" />
				<div class="text d-flex flex-column gap-1 p-2">
					<h3>${coach.work_experience_years}</h3>
					<p>Years of Experience</p>
				</div>
			</div>
		</div>
		` : ``
	}
	
	`;
	// Coach Location
	coachLocation.innerHTML = `<i class="bi bi-geo-alt"></i> ${coach.country} / ${coach.city}`;
	// Coach Price
	coachPrice.innerHTML = coach.pricing_in_egypt ? `<i class="bi bi-cash-stack me-2"></i> ${coach.pricing_in_egypt} <span>per hour</span>` :
	`<i class="bi bi-cash-stack me-2"></i> ${coach.pricing} <span>per hour</span>`;
}

fetchSingleCoach();

const bgLoading = document.getElementById('bgLoading');
const bgLoadingCont = document.querySelector('#bgLoading .loading-container');
const afterLoadings = document.querySelectorAll('.after-loading');
window.onload = () => {
	setTimeout(function() {
			bgLoadingCont.style.opacity = "0";
			setTimeout(function() {
					bgLoadingCont.style.display = "none";
					bgLoading.style.display = "none";
					document.getElementById('main').style.height = "fit-content";
					afterLoadings.forEach(afterLoading => {
						afterLoading.style.visibility = "visible";
					})
			}, 800)
	}, 500)
}

// setTimeout(() => {
// 	const video = document.querySelector('video');
// 	video.addEventListener('error', () => {
// 		if (!video.isLoaded) {
// 			video.remove();
// 		}
// 	});
// }, 4000);
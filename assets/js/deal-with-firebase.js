// // iCanCoachU Example Firebase...
// const firebaseConfig = {
// 	apiKey: "AIzaSyCl1e2eawcwTIdXk7E7IGbxiEnG4guzVzM",
// 	authDomain: "just-like-icancoachu.firebaseapp.com",
// 	projectId: "just-like-icancoachu",
// 	storageBucket: "just-like-icancoachu.appspot.com",
// 	messagingSenderId: "415289518874",
// 	appId: "1:415289518874:web:263bf9089765a2a312daa3"
// };
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
	query, where,
	updateDoc, doc
} from 'firebase/firestore';

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

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore();

const lang = document.querySelector('html').lang; // get page's Lang to assign it to database
// collection ref
const colRef = collection(db, 'coaches', 'languages', lang);

// en collection queries
const cCompleted = query(colRef, where("appear", "==", true));
const cPending = query(colRef, where("appear", "==", false));

let completedContent = document.querySelector('.completed-coaches');
let pendingContent = document.querySelector('.pending-coaches');

// get collection data
let completedCoaches = [];
getDocs(cCompleted)
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      completedCoaches.push({ ...doc.data(), id: doc.id })
    })
		completedContent.innerHTML = '';
		fillInHTML(completedCoaches, true);
  })
  .catch(err => {
    console.log(err.message);
  })

// get collection data
let pendingCoaches = [];
getDocs(cPending)
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      pendingCoaches.push({ ...doc.data(), id: doc.id });
    });
		pendingContent.innerHTML = '';
		fillInHTML(pendingCoaches, false);
  })
  .catch(err => {
    console.log(err.message);
  });

// All Firebase Keys
/*
1age
2appear
3false
4birthdate
5"programming, Founder/Business Owner"
6coach_bank_infos
7coach_calendly_link
8coach_comment
9coach_free_time
10coach_objective_life
11coach_role_model
12coach_tidycal_link
13coach_working_life_tags
14college
15country
16cvDownloadURL
17english_skills
18facebook_account
19gender
20graduation_year
21how_coach_arrived
22id
23image
24industry
25instagram_account
26jobTitle
27linkedIn_account
28mail
29name
30order
31paymentLink
32pricing_in_egypt
33pricing_outside_egypt
34rating
35session_way
36summary
37tiktok_account
38twitter_account
39videoDownloadURL
40whats_number
41work_experience
42work_experience_years
43youtube_account
*/

function fillInHTML(coaches, completed = true) {
	coaches.forEach(coach => {
		let date_string;
		if (coach.birthdate) { // To GEt Coach's Age If he entered the birthdate
			let birthdate = new Date(coach.birthdate);
			let ageInMilliseconds = Date.now() - birthdate.getTime();
			const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
			coach.age = Math.floor(ageInYears);
		}
		if(coach.createdAt) {
			console.log(coach.createdAt);
			// Replacing these values with your own timestamp values
			let seconds = coach.createdAt.seconds;
			let nanoseconds = coach.createdAt.nanoseconds;
			// Converting the timestamp to milliseconds
			let milliseconds = seconds * 1000 + nanoseconds / 1000000;
			// Creating a new Date object with the milliseconds
			let date = new Date(milliseconds);
			// Formatting the date and time as a string
			date_string = date.toLocaleString();
		}
		if(completed) {
			completedContent.innerHTML += `
				<div class="col-lg-4 col-md-6">
					<div class="member">
						<div class="pic"><img src=${coach.image} class="img-fluid" onerror="this.onerror=null;this.src='assets/img/team/default-img-1.jpg';" alt="${coach.name}"></div>
						<div class="member-info">
							<div class="">
								<h5 class="text-center coach-answer">${coach.name}</h5>
								<span>ًCoach image url:- <a href="${coach.image}" target="_blank">Download Image</a></span>
								<p class="coach-answer">${coach.image}</p>
								<span>ًWork Experience:-</span>
								<p class="coach-answer">${coach.work_experience}</p>
								<span>ًUniversity:-</span>
								<p class="coach-answer">${coach.college}</p>
								<span>Graduation year:-</span>
								<p class="coach-answer">${coach.graduation_year}</p>
								<span>age:-</span>
								<p class="coach-answer">${coach.age}</p>
								<span>gender:-</span>
								<p class="coach-answer">${coach.gender}</p>
							</div>
							<span>Category:-</span>
							<p class="coach-answer">${coach.category}</p>
							<span>jobTitle:-</span>
							<p class="coach-answer">${coach.jobTitle}</p>
							<span>industry:-</span>
							<p class="coach-answer">${coach.industry}</p>
							${
								Array.isArray(coach.coach_working_life_tags)? `<span>Coach Tags:-</span><div id="tags-container">${coach.coach_working_life_tags.map(tag => `<span class='tag'>${tag}</span>`).join('')}</div>` :
								``
							}
							<span>hourly rate:-</span>
							<p class="coach-answer">${coach.pricing}</p>
							<span>session way:-</span>
							<p class="coach-answer">${coach.session_way}</p>
							<span>job summary is:-</span>
							<p class="coach-answer">${coach.summary}</p>
							<span>location:-</span>
							<div><p class="coach-answer">${coach.country}</p>/<p class="coach-answer">${coach.city}</p></div>
							<br /><br />
							<span>Is Coach available/free for at least 2:3 hours every week?:-</span>
							<p class="coach-answer">${coach.coach_free_time}</p>
							<span>How did coach hear about us?:-</span>
							<p class="coach-answer"${coach.how_coach_arrived}</p>
							<span>coach role model is:-</span>
							<p class="coach-answer">${coach.coach_role_model}</p>
							<span>coach objective life is:-</span>
							<p class="coach-answer">${coach.coach_objective_life}</p>
							<span>Coach Bank Infos:- </span>
							<p class="coach-answer">${coach.coach_bank_infos}</p>
							<span>English Skills:-</span>
							<p class="coach-answer">${coach.english_skills}</p>
							<span>Rating:-</span>
							<p class="coach-answer">${coach.rating}</p>
							<span>Order:-</span>
							<p class="coach-answer">${coach.order}</p>
							<span>Payment Link:- <a href="${coach.paymentLink}" target="_blank"><i class="bi bi-credit-card"></i></a></span>
							<p class="coach-answer">${coach.paymentLink}</p>
							<span>Calendly Link:- <a href="${coach.coach_calendly_link}" target="_blank">Calendly</a></span>
							<p class="coach-answer">${coach.coach_calendly_link}</p>
							<span>Tidycal Link the alternative:- <a href="${coach.coach_tidycal_link}" target="_blank">Tidycal</a></span>
							<p class="coach-answer">${coach.coach_tidycal_link}</p>
							// --------- Accounts ------
							${coach.SM_account? `<span>LinkedIn Profile Link:- <a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a></span>
							<p class="coach-answer">${coach.SM_account}</p>` : `<span>LinkedIn Profile Link:- <a href="${coach.linkedIn_account}" target="_blank"><i class="bi bi-linkedin"></i></a></span>
							<p class="coach-answer">${coach.linkedIn_account}</p>` }
							<span>Instagram Profile Link:- <a href="${coach.instagram_account}" target="_blank"><i class="bi bi-instagram"></i></a></span>
							<p class="coach-answer">${coach.instagram_account}</p>
							<span>Twitter Profile Link:- <a href="${coach.twitter_account}" target="_blank"><i class="bi bi-twitter"></i></a></span>
							<p class="coach-answer">${coach.twitter_account}</p>
							<span>Facebook Profile Link:- <a href="${coach.facebook_account}" target="_blank"><i class="bi bi-facebook"></i></a></span>
							<p class="coach-answer">${coach.facebook_account}</p>
							<span>Youtube Profile Link:- <a href="${coach.youtube_account}" target="_blank"><i class="bi bi-youtube"></i></a></span>
							<p class="coach-answer">${coach.youtube_account}</p>
							<span>Tiktok Profile Link:- <a href="${coach.tiktok_account}" target="_blank"><i class="bi bi-tiktok"></i></a></span>
							<p class="coach-answer">${coach.tiktok_account}</p>
							<span>Whats app number:- <a href="https://wa.me/${coach.whats_number}" target="_blank"><i class="bi bi-whatsapp"></i></a></span>
							<p class="coach-answer">${coach.whats_number}</p>
							<span>Coach mail:- <a href="mailto:${coach.mail}" target="_blank"><i class="bi bi-envelope"></i></a></span>
							<p class="coach-answer">${coach.mail}</p>
							${coach.cv_link? `<span>Coach CV:- <a href="${coach.cv_link}" target="_blank"><i class="bi bi-envelope"></i></a></span>
							<p class="coach-answer">${coach.cv_link}</p>` : `<span>Coach CV:- <a href="${coach.cvDownloadURL}" target="_blank"><i class="bi bi-envelope"></i></a></span>
							<p class="coach-answer">${coach.cvDownloadURL}</p>`}
							<span>Coach Video: <a href="${coach.videoDownloadURL}" target="_blank">Download Video</i></a></span>
							<div class='video-tag'>
								<video controls width="100%" height="fit-content">
									<source src="${coach.videoDownloadURL}" type="video/mp4">
									<source src="${coach.videoDownloadURL}" type="video/webm">
									<source src="${coach.videoDownloadURL}" type="video/ogg">
									Your browser does not support the video tag.
								</video>
							</div>
							<i class="bi bi-gear-fill modify-btn"></i>
							<i class="bi bi-check2-square save" data-id="${coach.id}"></i>
							<button class="not-approve-btn" data-id="${coach.id}">Don't approve</button>
							${date_string ? `<span class="timestamp">${date_string}<span>`: ''}
						</div>
					</div>
				</div>
			`} else {
			pendingContent.innerHTML += `
				<div class="col-lg-4 col-md-6">
					<div class="member">
					<div class="pic"><img src=${coach.image} class="img-fluid" onerror="this.onerror=null;this.src='assets/img/team/default-img-1.jpg';" alt="${coach.name}"></div>
						<div class="member-info">
							<div class="">
								<h5 class="text-center coach-answer">${coach.name}</h5>
								<span>ًCoach image url:- <a href="${coach.image}" target="_blank">Download Image</a></span>
								<p class="coach-answer">${coach.image}</p>
								<span>ًWork Experience:-</span>
								<p class="coach-answer">${coach.work_experience}</p>
								<span>ًUniversity:-</span>
								<p class="coach-answer">${coach.college}</p>
								<span>Graduation year:-</span>
								<p class="coach-answer">${coach.graduation_year}</p>
								<span>age:-</span>
								<p class="coach-answer">${coach.age}</p>
								<span>gender:-</span>
								<p class="coach-answer">${coach.gender}</p>
							</div>
							<span>Category:-</span>
							<p class="coach-answer">${coach.category}</p>
							<span>jobTitle:-</span>
							<p class="coach-answer">${coach.jobTitle}</p>
							<span>industry:-</span>
							<p class="coach-answer">${coach.industry}</p>
							${
								Array.isArray(coach.coach_working_life_tags)? `<span>Coach Tags:-</span><div id="tags-container">${coach.coach_working_life_tags.map(tag => `<span class='tag'>${tag}</span>`).join('')}</div>` :
								``
							}
							<span>hourly rate:-</span>
							<p class="coach-answer">${coach.pricing}</p>
							<span>session way:-</span>
							<p class="coach-answer">${coach.session_way}</p>
							<span>job summary is:-</span>
							<p class="coach-answer">${coach.summary}</p>
							<span>location:-</span>
							<div><p class="coach-answer">${coach.country}</p>/<p class="coach-answer">${coach.city}</p></div>
							<br /><br />
							<span>Is Coach available/free for at least 2:3 hours every week?:-</span>
							<p class="coach-answer">${coach.coach_free_time}</p>
							<span>How did coach hear about us?:-</span>
							<p class="coach-answer">${coach.how_coach_arrived}</p>
							<span>coach role model is:-</span>
							<p class="coach-answer">${coach.coach_role_model}</p>
							<span>coach objective life is:-</span>
							<p class="coach-answer">${coach.coach_objective_life}</p>
							<span>Coach Bank Infos:- </span>
							<p class="coach-answer">${coach.coach_bank_infos}</p>
							<span>English Skills:-</span>
							<p class="coach-answer">${coach.english_skills}</p>
							<span>Rating:-</span>
							<p class="coach-answer">${coach.rating}</p>
							<span>Order:-</span>
							<p class="coach-answer">${coach.order}</p>
							<span>Payment Link:- <a href="${coach.paymentLink}" target="_blank"><i class="bi bi-credit-card"></i></a></span>
							<p class="coach-answer">${coach.paymentLink}</p>
							<span>Calendly Link:- <a href="${coach.coach_calendly_link}" target="_blank">Calendly</a></span>
							<p class="coach-answer">${coach.coach_calendly_link}</p>
							<span>Tidycal Link the alternative:- <a href="${coach.coach_tidycal_link}" target="_blank">Tidycal</a></span>
							<p class="coach-answer">${coach.coach_tidycal_link}</p>
							// --------- Accounts ------
							${coach.SM_account? `<span>LinkedIn Profile Link:- <a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a></span>
							<p class="coach-answer">${coach.SM_account}</p>` : `<span>LinkedIn Profile Link:- <a href="${coach.linkedIn_account}" target="_blank"><i class="bi bi-linkedin"></i></a></span>
							<p class="coach-answer">${coach.linkedIn_account}</p>` }
							<span>Instagram Profile Link:- <a href="${coach.instagram_account}" target="_blank"><i class="bi bi-instagram"></i></a></span>
							<p class="coach-answer">${coach.instagram_account}</p>
							<span>Twitter Profile Link:- <a href="${coach.twitter_account}" target="_blank"><i class="bi bi-twitter"></i></a></span>
							<p class="coach-answer">${coach.twitter_account}</p>
							<span>Facebook Profile Link:- <a href="${coach.facebook_account}" target="_blank"><i class="bi bi-facebook"></i></a></span>
							<p class="coach-answer">${coach.facebook_account}</p>
							<span>Youtube Profile Link:- <a href="${coach.youtube_account}" target="_blank"><i class="bi bi-youtube"></i></a></span>
							<p class="coach-answer">${coach.youtube_account}</p>
							<span>Tiktok Profile Link:- <a href="${coach.tiktok_account}" target="_blank"><i class="bi bi-tiktok"></i></a></span>
							<p class="coach-answer">${coach.tiktok_account}</p>
							<span>Whats app number:- <a href="https://wa.me/${coach.whats_number}" target="_blank"><i class="bi bi-whatsapp"></i></a></span>
							<p class="coach-answer">${coach.whats_number}</p>
							<span>Coach mail:- <a href="mailto:${coach.mail}" target="_blank"><i class="bi bi-envelope"></i></a></span>
							<p class="coach-answer">${coach.mail}</p>
							${coach.cv_link? `<span>Coach CV:- <a href="${coach.cv_link}" target="_blank"><i class="bi bi-envelope"></i></a></span>
							<p class="coach-answer">${coach.cv_link}</p>` : `<span>Coach CV:- <a href="${coach.cvDownloadURL}" target="_blank"><i class="bi bi-envelope"></i></a></span>
							<p class="coach-answer">${coach.cvDownloadURL}</p>`}
							<span>Coach Video: <a href="${coach.videoDownloadURL}" target="_blank">Download Video</i></a></span>
							<div class='video-tag'>
								<video controls width="100%" height="fit-content">
									<source src="${coach.videoDownloadURL}" type="video/mp4">
									<source src="${coach.videoDownloadURL}" type="video/webm">
									<source src="${coach.videoDownloadURL}" type="video/ogg">
									Your browser does not support the video tag.
								</video>
							</div>
							<i class="bi bi-gear-fill modify-btn"></i>
							<i class="bi bi-check2-square save" data-id="${coach.id}"></i>
							<button class="approve-btn" data-id="${coach.id}">Approve</button>
							${date_string ? `<span class="timestamp">${date_string}<span>`: ''}
						</div>
					</div>
				</div>
		`};
});
}
/* The Better Code */
let coachesAnswers;
// Add event listener to the parent element's click event
window.addEventListener('click', (e) => {

  // Check if the clicked element is a button inside a card
  if (e.target.matches('.member .modify-btn')) { // To Modify Coach's Infos.
		e.target.parentElement.querySelectorAll('.coach-answer').forEach(p => {
			p.classList.add('edit');
			p.setAttribute('contenteditable', true);
		});
  }

	if (e.target.matches('.member .save')) { // To Save Coach's Infos.
		coachesAnswers = e.target.parentElement.querySelectorAll('.coach-answer');
		// Save Changes to every coach's answer.
		coachesAnswers.forEach(p => {
			p.classList.remove('edit');
			p.setAttribute('contenteditable', false);
		});
		// Updata Changes to firebase
		update(e.target, 'save');
	}

	// Approve Coach
	if (e.target.matches('.member .approve-btn')) {
		update(e.target, 'approve');
	}

	// Don't Approve Coach
	if (e.target.matches('.member .not-approve-btn')) {
		update(e.target, 'do-not-approve');
	}

});
 
// Doc Updating.
function update(member, status) {

	let docRef = doc(db, 'coaches', 'languages', lang, member.dataset.id);
	switch(status) {
		case "save":
			updateDoc(docRef, {
				name: coachesAnswers[0].innerText,
				image: coachesAnswers[1].innerText,
				work_experience: coachesAnswers[2].innerText,
				college: coachesAnswers[3].innerText,
				graduation_year: coachesAnswers[4].innerText,
				age: coachesAnswers[5].innerText,
				gender: coachesAnswers[6].innerText,
				category: coachesAnswers[7].innerText,
				jobTitle: coachesAnswers[8].innerText,
				industry: coachesAnswers[9].innerText,
				pricing: coachesAnswers[10].innerText,
				session_way: coachesAnswers[11].innerText,
				summary: coachesAnswers[12].innerText,
				country: coachesAnswers[13].innerText,
				city: coachesAnswers[14].innerText,
				coach_free_time: coachesAnswers[15].innerText,
				how_coach_arrived: coachesAnswers[16].innerText,
				coach_role_model: coachesAnswers[17].innerText,
				coach_objective_life: coachesAnswers[18].innerText,
				coach_bank_infos: coachesAnswers[19].innerText,
				english_skills: coachesAnswers[20].innerText,
				rating: coachesAnswers[21].innerText,
				order: coachesAnswers[22].innerText,
				paymentLink: coachesAnswers[23].innerText,
				coach_calendly_link: coachesAnswers[24].innerText,
				coach_tidycal_link: coachesAnswers[25].innerText,
				/* Till Now Okay */
				linkedIn_account: coachesAnswers[26].innerText,
				instagram_account: coachesAnswers[27].innerText,
				twitter_account: coachesAnswers[28].innerText,
				facebook_account: coachesAnswers[29].innerText,
				youtube_account: coachesAnswers[30].innerText,
				tiktok_account: coachesAnswers[31].innerText,
				whats_number: coachesAnswers[32].innerText,
				mail: coachesAnswers[33].innerText,
				cvDownloadURL: coachesAnswers[34].innerText,
			})
			.then(() => {
				alert("Updated in Firebase too.")
			});
			break;
		case 'approve':
			updateDoc(docRef, {
				appear: true
			})
			.then(() => {
				alert("The Coach will Appear in the page.");
			});
			break;
			case 'do-not-approve':
				updateDoc(docRef, {
					appear: false
				})
				.then(() => {
					alert("Coach as in progress status putting.");
				});
				break;
		default:
			alert("Invalid Status!!");
			break;
	};
};
import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs,
	query, where, doc
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

const lang = document.querySelector('html').lang; // get page's Lang to assign it to database

const colRef = collection(db, 'coaches', 'languages', lang);

// queries
const cCompleted = query(colRef, where("appear", "==", true))

// selecting the coaches Row in html file
const coachesContent = document.getElementById('coaches-content');
let completedCoaches = []; // for fulling coaches in coaches page
let html = ''; // content that we put in html
// let html_filtered_coaches = ''; // content that we put in html
coachesContent.innerHTML = ''; // empty coaches content before getting data

async function getData() {
	// Fetching 'Getting' Data
	await getDocs(cCompleted)
	.then((snapshot) => {
		// Check if we in the home page or top coaches page
		snapshot.docs.forEach((doc) => {
			completedCoaches.push({ ...doc.data(), id: doc.id });
		});
		completedCoaches.sort((a, b) => a.order - b.order); // sort the array according to it's order
		// in the index 'top coaches' page
		if(coachesContent.classList.contains('top-coaches')) {
			// Just get coaches who has top order
			completedCoaches = completedCoaches.filter(coach => coach.order <= 3);
		};
		completedCoaches.map(coach => {
			html += `
			<div class="col-lg-4 col-md-6">
				<div class="member" data-aos="zoom-in">
					<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
						<div class="member-info coaches pricing" data-i=${coach.id}>
							<div class='ps-3 pe-3'>
								<h5>${coach.name}</h5>
								<h4>${coach.jobTitle}</h4>
							</div>
							<span>${coach.pricing}</span>
							<p class='detail-item mb-1 mt-1'>Details</p>
							<span>${coach.category}</span>
							<span>${coach.summary.length > 180 ? coach.summary.slice(0, 180) : coach.summary}</span>
							<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
							<div class="social">
								<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
							</div>
							<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Book Now</a>
							<button class='profile-btn'>VIEW PROFILE</button>
						</div>
					</div>
				</div>
			</div>
		`;
		})
	})
	.catch( _ => {
		coachesContent.innerHTML = `<h1 style='padding: 100px 0; text-align: center'>No coaches till now</h1>`;
	});
};

getData().then(() => {
	if(coachesContent.classList.contains('top-coaches')) {
		coachesContent.innerHTML = html;
	} else if (coachesContent.classList.contains('filtered-coaches')) {
		coachesContent.innerHTML = html;
	} else {
		coachesContent.innerHTML = `<h1 style='padding: 100px 0; text-align: center'>No coaches till now</h1>`;
	};
});

window.onclick = () => {
	if(document.body.classList.contains('coaches-html')) {

		/* Hiding Filtered Boxes with select box */
		const inputFields = document.querySelectorAll('.input-field');

		// if click outside
		window.onclick = (e) => {
			if(!e.target.classList.contains('filter-el')) {
				inputFields.forEach(field => field.classList.remove('on'));
			}
		};

		inputFields.forEach(field => {
			field.addEventListener('click', () => {
				field.classList.toggle('on');
			})
		});

		// Select Dropdown menues
		const byIndustry = document.querySelectorAll('.dropdown.by-industry li');
		const byCountry = document.querySelectorAll('.dropdown.by-country li');
		const byJobTitle = document.querySelectorAll('.dropdown.by-job-title li');
		// adding checked to the first item in the list
		checkTheElement(byIndustry, 'category');
		checkTheElement(byCountry, 'country');
		checkTheElement(byJobTitle, 'jobTitle');

		function checkTheElement(el, filterBy) {

			el.forEach(item => {

				item.addEventListener('click', () => {

					el.forEach(item => {
						if(item.classList.contains('on')) {
							item.classList.remove('on');
							item.querySelector('i').classList.remove('on');
						}
					});
					
					item.classList.add('on');
					item.querySelector('i').classList.add('on');
					// Search the Item
					let searchingVal = item.dataset.category;
					if(searchingVal != 'all') {
						switch(filterBy) {
							case 'category':
								filteredCoaches = completedCoaches.filter( coach => {
									if(coach.category.toLowerCase().includes(searchingVal)) {
										return coach;
									}
								})
								showNewCoaches(filteredCoaches);
								break;
							case 'country':
								filteredCoaches = completedCoaches.filter( coach => {
									if(coach.country.toLowerCase().includes(searchingVal)) {
										return coach;
									}
								})
								showNewCoaches(filteredCoaches);
								break;
							case 'jobTitle':
								filteredCoaches = completedCoaches.filter( coach => {
									if(coach.jobTitle.toLowerCase().includes(searchingVal)) {
										return coach;
									}
								})
								showNewCoaches(filteredCoaches);
								break;
							default:
								return completedCoaches;
						}
					} else {
						showNewCoaches(completedCoaches);
					}
				})
			});

		};

		// Handle Events of searching and filtering when inputs changes

		let searchField = document.getElementById('search-field');
		let filteredCoaches = completedCoaches;
		let html_filtering_by_user = '';

		// Handle User searching
		searchField.addEventListener('keyup', () => {
			let searchFieldValue = searchField.value.toLowerCase();
			if(searchFieldValue !== '') {
				filteredCoaches = completedCoaches.filter( coach => {
					if(
						coach.category.toLowerCase().includes(searchFieldValue) ||
						coach.name.toLowerCase().includes(searchFieldValue) ||
						coach.jobTitle.toLowerCase().includes(searchFieldValue) ||
						coach.country.toLowerCase().includes(searchFieldValue)
					) {
						return coach;
					}
				})
				showNewCoaches(filteredCoaches);
			} else {
				return false
			};
		})
		// Handle User Choosed Categories

		function showNewCoaches(coaches) {
			html_filtering_by_user = '';
			coaches.map(coach => {
				html_filtering_by_user += `
				<div class="col-lg-4 col-md-6">
					<div class="member" data-aos="zoom-in">
						<div class="pic"><img src="${coach.image}" class="img-fluid" alt="Coach Image"></div>
							<div class="member-info coaches pricing">
								<div class='ps-3 pe-3'>
									<h5>${coach.name}</h5>
									<h4>${coach.jobTitle}</h4>
								</div>
								<span>${coach.pricing}</span>
								<p class='detail-item mb-1 mt-1'>Details</p>
								<span>${coach.category}</span>
								<span>${coach.summary}</span>
								<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
								<div class="social">
									<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
								</div>
								<a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Book Now</a>
							</div>
						</div>
					</div>
				</div>
			`;
			})
			if(coaches.length > 0) {
				coachesContent.innerHTML = html_filtering_by_user;
			} else {
				if(lang == 'ar') {
					coachesContent.innerHTML = `
						<h1 style='padding: 100px 0; text-align: center'>لا يوجد مدربون علي حسب اختيارك</h1>
					`;
				} else {
					coachesContent.innerHTML = `
					<h1 style='padding: 100px 0; text-align: center'>There are no Coaches according to your filtration</h1>
					`;
				}
			}
		};

	}
};

// Code for View Single Coach...
function viewProfile(documentId, lang) {
	sessionStorage.setItem('selectedCoach', documentId);
	sessionStorage.setItem('lang', lang);
	window.location.href = 'coach-profile.html';
}
window.onload = () => {
	gettingProfileBtns();
};
function gettingProfileBtns() {
	setTimeout(() => {
		const profileBtns = document.querySelectorAll('.profile-btn');
		if(profileBtns[0]) {
				profileBtns.forEach(btn => {
					btn.addEventListener('click', (e) => {
						console.log(e.target.parentElement.dataset.i);
						viewProfile(e.target.parentElement.dataset.i, lang);
					});
				});
			} else {
				gettingProfileBtns();
			};
	}, 4000);
}


import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection, getDocs,
	query, where,
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

initializeApp(firebaseConfig)
const db = getFirestore()
const lang = document.querySelector('html').lang; // get page's Lang to assign it to database
const colRef = collection(db, 'coaches', 'languages', lang);

// queries
const qCompleted = query(colRef, where("appear", "==", true));

// selecting the coaches Row in html file
const coachesContent = document.getElementById('coaches-content');
let coaches = []; // for fulling coaches in coaches page
let html = ''; // content that we put in html
// let html_filtered_coaches = ''; // content that we put in html
coachesContent.innerHTML = ''; // empty coaches content before getting data

async function getData() {
	// Fetching 'Getting' Data
	await getDocs(colRef)
	.then((snapshot) => {
		// Check if we in the home page or top coaches page
		snapshot.docs.forEach((doc) => {
			coaches.push({ ...doc.data(), id: doc.id });
		});
		coaches.sort((a, b) => a.order - b.order); // sort the array according to it's order
		// in the index 'top coaches' page
		if(coachesContent.classList.contains('top-coaches')) {
			// Adding Content of Data coming from Firebase to HTML
			coaches = coaches.filter(coach => coach.order <= 3);
			coaches = coaches.length > 3 ? coaches.slice(0, 3) : coaches;
		}
		coaches.map(coach => {
			html += `
			<div class="col-lg-4 col-md-6">
				<div class="member" data-aos="zoom-in">
					<div class="pic"><img src=${coach.image} class="img-fluid" onerror="this.onerror=null;this.src='assets/img/team/default-img-1.jpg';" alt="${coach.name}"></div>
						<div class="member-info coaches pricing" data-i=${coach.id}>
							<div class='ps-3 pe-3'>
								<h5>${coach.name}</h5>
								<h4>${coach.jobTitle}</h4>
							</div>
							${coach.pricing ? `<span>${coach.pricing}</span>`: `<span>${coach.pricing_in_egypt}</span>`}
							<p class='detail-item mb-1 mt-1'>Details</p>
							<span>${coach.category}</span>
							${coach.summary.length > 180 ? `<span>${coach.summary.slice(0, 180) + '...'}</span>` : `<span>${coach.summary}</span>`}
							<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
							<div class="social">
								${/^(https?:\/\/)?(www\.)?linkedin.com\/(company\/[a-zA-Z0-9_\-]+|in\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.SM_account) ? `<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>` : `<a href="${coach.linkedIn_account}" target="_blank"><i class="bi bi-linkedin"></i></a>`}
								${/^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_\-]+\/?$/.test(coach.instagram_account) ? `<a href="${coach.instagram_account}" target="_blank"><i class="bi bi-instagram"></i></a>`: ``}
								${/^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9_]{1,15}\/?$/.test(coach.twitter_account) ? `<a href="${coach.twitter_account}" target="_blank"><i class="bi bi-twitter"></i></a>`: ``}
								${/^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/.test(coach.facebook_account) ? `<a href="${coach.facebook_account}" target="_blank"><i class="bi bi-facebook"></i></a>`: ``}
								${/^(https?:\/\/)?(www\.)?youtube.com\/(channel\/[a-zA-Z0-9_\-]+|user\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.youtube_account) ? `<a href="${coach.youtube_account}" target="_blank"><i class="bi bi-youtube"></i></a>`: ``}
								${/^(https?:\/\/)?(www\.)?tiktok.com\/(@[a-zA-Z0-9.\-_]+|v\/[a-zA-Z0-9.\-_]+|embed\/[a-zA-Z0-9.\-_]+)/.test(coach.tiktok_account) ? `<a href="${coach.tiktok_account}" target="_blank"><i class="bi bi-tiktok"></i></a>`: ``}
							</div>
							<button class='profile-btn btn-buy mt-2' data-uname=${coach.name.trim().replace(/\s+/g, "_").toLowerCase()}>VIEW PROFILE</button>
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
// <a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Book Now</a>

getData().then(() => {
	if(coachesContent.classList.contains('top-coaches')) {
		coachesContent.innerHTML = html;
	} else if (coachesContent.classList.contains('filtered-coaches')) {
		coachesContent.innerHTML = html;
	} else {
		coachesContent.innerHTML = `<h1 style='padding: 100px 0; text-align: center'>No coaches till now</h1>`;
	};
});

/* Start Filters */

const jobTitleFilter = document.getElementById('job-title-menu');
const specialitiesFilter = document.getElementById('specialities-menu');
const countryFilter = document.getElementById('country-menu');
const genderFilter = document.getElementById('gender-menu');
const yearsOfExperienceFilter = document.getElementById('years-experience-menu');
const modalityFilter = document.getElementById('modality-menu');


const filterBtns = document.querySelectorAll('.search-fields .filter-btn');
filterBtns.forEach(btn => {
	btn.addEventListener('click', e => {
		filterBtns.forEach(btn => {
			if(btn == e.target) {
				btn.classList.toggle('active');
			} else {
				btn.classList.remove('active');
			}
		});
	});
});

document.querySelectorAll('.filter-menu .filter-item').forEach(item => {
	item.addEventListener('click', _ => {
		item.querySelector('.square-check').classList.toggle('check');
		filterResults();
	});
});

function filterResults() {
	const selectedJobTitles = getSelectedItems(jobTitleFilter);
  const selectedspecialities = getSelectedItems(specialitiesFilter);
  const selectedCountries = getSelectedItems(countryFilter);
  const selectedGenders = getSelectedItems(genderFilter);
  const selectedYearsOfExperience = getSelectedItems(yearsOfExperienceFilter);
  const selectedModalities = getSelectedItems(modalityFilter);

	console.log(selectedJobTitles);
	console.log(selectedspecialities);
	console.log(selectedCountries);
	console.log(selectedGenders);
	console.log(selectedYearsOfExperience);

	const filteredData = coaches.filter(coach => {
		let validOne = true;
		if (
			(selectedJobTitles.length === 0 || selectedJobTitles.includes(coach.jobTitle.trim().toLowerCase())) &&
			(selectedCountries.length === 0 || selectedCountries.includes(coach.country.trim().toLowerCase())) &&
			(selectedspecialities.length === 0 || selectedspecialities.includes(coach.industry.trim().toLowerCase())) &&
			(selectedModalities.length === 0 || selectedModalities.includes(coach.session_way.trim().toLowerCase()))
		) {
			validOne = true;
		} else {
			validOne = false;
		}

		let validTwo = true;
		if (selectedGenders.length > 0) {
			if(coach.gender) {
				if(selectedGenders.includes(coach.gender.trim().toLowerCase())) {
					validTwo = true;
				} else {
					validTwo = false;
				}
			} else {
				validTwo = false;
			}
		};

		// Filter by Years of Experience Year
		let coachExpYears = parseInt(coach.work_experience_years);
		if(selectedYearsOfExperience.length > 0) {
			if(!isNaN(coachExpYears)) {
				let userCheckedYearInRange = false;
				selectedYearsOfExperience.forEach(year => {
					if (coachExpYears >= parseInt(year['minVal']) && coachExpYears <= parseInt(year['maxVal'])) {
						userCheckedYearInRange = true;
						console.log("coach in range => ", coach);
					}
				});
				return userCheckedYearInRange && validOne && validTwo;
			} else {
				return false;
			}
		};

		console.log("valid one - ", validOne, "valid two - ", validTwo);

		return validOne && validTwo;

	});
	console.log("filtered Data.");
	console.log(filteredData);

  displayResults(filteredData);
};


function getSelectedItems(filterMenu) {
  const selectedItems = [];
  const filterItems = filterMenu.querySelectorAll('.check');

  filterItems.forEach(item => {
		console.log("The Item ", item);
		if(filterMenu == yearsOfExperienceFilter) {
			let minVal = parseInt(item.getAttribute('min-value'));
			let maxVal = parseInt(item.getAttribute('max-value'));
			selectedItems.push({ minVal, maxVal });
		} else {
			console.log("The Item - value => ", item.getAttribute('value'));
			let value = item.getAttribute('value').trim().toLowerCase();
			selectedItems.push(value);
		}
  });

  return selectedItems;
};

function displayResults(results) {
  coachesContent.innerHTML = '';

  results.forEach(coach => {
    coachesContent.innerHTML += `
		<div class="col-lg-4 col-md-6">
			<div class="member" data-aos="zoom-in">
				<div class="pic"><img src=${coach.image} class="img-fluid" onerror="this.onerror=null;this.src='assets/img/team/default-img-1.jpg';" alt="${coach.name}"></div>
					<div class="member-info coaches pricing" data-i=${coach.id}>
						<div class='ps-3 pe-3'>
							<h5>${coach.name}</h5>
							<h4>${coach.jobTitle}</h4>
						</div>
						${coach.pricing ? `<span>${coach.pricing}</span>`: `<span>${coach.pricing_in_egypt}</span>`}
						<p class='detail-item mb-1 mt-1'>Details</p>
						<span>${coach.category}</span>
						${coach.summary.length > 180 ? `<span>${coach.summary.slice(0, 180) + '...'}</span>` : `<span>${coach.summary}</span>`}
						<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
						<div class="social">
							${/^(https?:\/\/)?(www\.)?linkedin.com\/(company\/[a-zA-Z0-9_\-]+|in\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.SM_account) ? `<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>` : `<a href="${coach.linkedIn_account}" target="_blank"><i class="bi bi-linkedin"></i></a>`}
							${/^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_\-]+\/?$/.test(coach.instagram_account) ? `<a href="${coach.instagram_account}" target="_blank"><i class="bi bi-instagram"></i></a>`: ``}
							${/^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9_]{1,15}\/?$/.test(coach.twitter_account) ? `<a href="${coach.twitter_account}" target="_blank"><i class="bi bi-twitter"></i></a>`: ``}
							${/^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/.test(coach.facebook_account) ? `<a href="${coach.facebook_account}" target="_blank"><i class="bi bi-facebook"></i></a>`: ``}
							${/^(https?:\/\/)?(www\.)?youtube.com\/(channel\/[a-zA-Z0-9_\-]+|user\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.youtube_account) ? `<a href="${coach.youtube_account}" target="_blank"><i class="bi bi-youtube"></i></a>`: ``}
							${/^(https?:\/\/)?(www\.)?tiktok.com\/(@[a-zA-Z0-9.\-_]+|v\/[a-zA-Z0-9.\-_]+|embed\/[a-zA-Z0-9.\-_]+)/.test(coach.tiktok_account) ? `<a href="${coach.tiktok_account}" target="_blank"><i class="bi bi-tiktok"></i></a>`: ``}
						</div>
						<button class='profile-btn btn-buy mt-2' data-uname=${coach.name.trim().replace(/\s+/g, "_").toLowerCase()}>VIEW PROFILE</button>
					</div>
				</div>
			</div>
		</div>
    `;
    // resultsContainer.appendChild(personElement);
  });
};

/* End Filters */

function viewProfile(documentId, lang, username) {
	sessionStorage.setItem('selectedCoach', documentId);
	sessionStorage.setItem('lang', lang);
	if(lang == 'en') {
		window.location.href = `coach-profile.html#${username}`;
	} else {
		window.location.href = `coach-profile-ar.html`;
	}
}
window.onclick = (e) => {
	if(e.target.matches('.profile-btn')) {
		// console.log(e.target.dataset.uname);
		viewProfile(e.target.parentElement.dataset.i, lang, e.target.dataset.uname);
	}
}





// /* Input Filters */
// if(document.body.classList.contains('coaches-html')) {
// 	/* Hiding Filtered Boxes with select box */
// 	const inputFields = document.querySelectorAll('.input-field');

// 	// if click outside
// 	window.onclick = (e) => {
// 		if(!e.target.matches('filter-el')) {
// 			inputFields.forEach(field => field.classList.remove('on'));
// 		}
// 	};

// 	inputFields.forEach(field => {
// 		field.addEventListener('click', () => {
// 			field.classList.toggle('on');
// 		})
// 	});

// 	// Select Dropdown menues
// 	const byIndustry = document.querySelectorAll('.dropdown.by-industry li');
// 	const byCountry = document.querySelectorAll('.dropdown.by-country li');
// 	const byJobTitle = document.querySelectorAll('.dropdown.by-job-title li');
// 	// adding checked to the first item in the list
// 	checkTheElement(byIndustry, 'category');
// 	checkTheElement(byCountry, 'country');
// 	checkTheElement(byJobTitle, 'jobTitle');

// 	function checkTheElement(el, filterBy) {

// 		el.forEach(item => {

// 			item.addEventListener('click', () => {

// 				el.forEach(item => {
// 					if(item.classList.contains('on')) {
// 						item.classList.remove('on');
// 						item.querySelector('i').classList.remove('on');
// 					}
// 				});
				
// 				item.classList.add('on');
// 				item.querySelector('i').classList.add('on');
				
// 				// Search the Item
// 				let searchingVal = item.dataset.category;
// 				if(searchingVal != 'all') {
// 					switch(filterBy) {
// 						case 'category':
// 							filteredCoaches = coaches.filter( coach => {
// 								if(coach.category.toLowerCase().indexOf(searchingVal) != -1) {
// 									return coach;
// 								}
// 							})
// 							showNewCoaches(filteredCoaches);
// 							break;
// 						case 'country':
// 							filteredCoaches = coaches.filter( coach => {
// 								if(coach.country.toLowerCase().indexOf(searchingVal) != -1) {
// 									return coach;
// 								}
// 							})
// 							showNewCoaches(filteredCoaches);
// 							break;
// 						case 'jobTitle':
// 							filteredCoaches = coaches.filter( coach => {
// 								if(coach.jobTitle.toLowerCase().indexOf(searchingVal) != -1) {
// 									return coach;
// 								}
// 							})
// 							showNewCoaches(filteredCoaches);
// 							break;
// 						default:
// 							return coaches;
// 					}
// 				} else {
// 					showNewCoaches(coaches);
// 				}
// 			})
// 		});

// 	};

// 	// Handle Events of searching and filtering when inputs changes

// 	let searchField = document.getElementById('search-field');
// 	let filteredCoaches = coaches;
// 	let html_filtering_by_user = '';

// 	// Handle User searching
// 	searchField.addEventListener('input', () => {
// 		let searchFieldValue = searchField.value.toLowerCase();
// 		if(searchFieldValue !== '') {
// 			filteredCoaches = coaches.filter( coach => {
// 				if(
// 					coach.category.toLowerCase().indexOf(searchFieldValue) != -1 ||
// 					coach.name.toLowerCase().indexOf(searchFieldValue) != -1 ||
// 					coach.jobTitle.toLowerCase().indexOf(searchFieldValue) != -1 ||
// 					coach.country.toLowerCase().indexOf(searchFieldValue) != -1
// 				) {
// 					return coach;
// 				}
// 			})
// 			showNewCoaches(filteredCoaches);
// 		} else {
// 			showNewCoaches(filteredCoaches);
// 			return false
// 		};
// 	})

// 	// Handle User Choosed Categories

// 	function showNewCoaches(coaches) {
// 		html_filtering_by_user = '';
// 		coaches.map(coach => {
// 			html_filtering_by_user += `
// 				<div class="col-lg-4 col-md-6">
// 					<div class="member" data-aos="zoom-in">
// 						<div class="pic"><img src=${coach.image} class="img-fluid" onerror="this.onerror=null;this.src='assets/img/team/default-img-1.jpg';" alt="${coach.name}"></div>
// 							<div class="member-info coaches pricing" data-i=${coach.id}>
// 								<div class='ps-3 pe-3'>
// 									<h5>${coach.name}</h5>
// 									<h4>${coach.jobTitle}</h4>
// 								</div>
// 								${coach.pricing ? `<span>${coach.pricing}</span>`: `<span>${coach.pricing_in_egypt}</span>`}
// 								<p class='detail-item mb-1 mt-1'>Details</p>
// 								<span>${coach.category}</span>
// 								${coach.summary.length > 180 ? `<span>${coach.summary.slice(0, 180) + '...'}</span>` : `<span>${coach.summary}</span>`}
// 								<span>${coach.country}/${coach.city} - ${coach.rating} stars</span>
// 								<div class="social">
// 									${/^(https?:\/\/)?(www\.)?linkedin.com\/(company\/[a-zA-Z0-9_\-]+|in\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.SM_account) ? `<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>` : `<a href="${coach.linkedIn_account}" target="_blank"><i class="bi bi-linkedin"></i></a>`}
// 									${/^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_\-]+\/?$/.test(coach.instagram_account) ? `<a href="${coach.instagram_account}" target="_blank"><i class="bi bi-instagram"></i></a>`: ``}
// 									${/^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9_]{1,15}\/?$/.test(coach.twitter_account) ? `<a href="${coach.twitter_account}" target="_blank"><i class="bi bi-twitter"></i></a>`: ``}
// 									${/^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/.test(coach.facebook_account) ? `<a href="${coach.facebook_account}" target="_blank"><i class="bi bi-facebook"></i></a>`: ``}
// 									${/^(https?:\/\/)?(www\.)?youtube.com\/(channel\/[a-zA-Z0-9_\-]+|user\/[a-zA-Z0-9_\-]+)\/?$/.test(coach.youtube_account) ? `<a href="${coach.youtube_account}" target="_blank"><i class="bi bi-youtube"></i></a>`: ``}
// 									${/^(https?:\/\/)?(www\.)?tiktok.com\/(@[a-zA-Z0-9.\-_]+|v\/[a-zA-Z0-9.\-_]+|embed\/[a-zA-Z0-9.\-_]+)/.test(coach.tiktok_account) ? `<a href="${coach.tiktok_account}" target="_blank"><i class="bi bi-tiktok"></i></a>`: ``}
// 								</div>
// 								<button class='profile-btn btn-buy mt-2' data-uname=${coach.name.trim().replace(/\s+/g, "_").toLowerCase()}>VIEW PROFILE</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 		`;
// 		});
// 		// <a href="${coach.paymentLink}" target="_blank" class="btn-buy mt-2">Book Now</a>
// 		if(coaches.length > 0) {
// 			coachesContent.innerHTML = html_filtering_by_user;
// 		} else {
// 			if(lang == 'ar') {
// 				coachesContent.innerHTML = `
// 					<h1 style='padding: 100px 0; text-align: center'>لا يوجد مدربون علي حسب اختيارك</h1>
// 				`;
// 			} else {
// 				coachesContent.innerHTML = `
// 				<h1 style='padding: 100px 0; text-align: center'>There are no Coaches according to your filtration</h1>
// 				`;
// 			}
// 		}
// 	};
// }
 


// Code for View Single Coach...

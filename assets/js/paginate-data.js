// import { getFirestore, collection, getDocs, query, where, orderBy, startAfter, endBefore, limit } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, startAfter, limit } from 'firebase/firestore';
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

const app = initializeApp(firebaseConfig);

const lang = document.querySelector('html').lang;
let userCountry = null;
let thePrice;
// Create a reference to your Firestore collection
const db = getFirestore(app);
const collectionRef = collection(db, 'coaches', 'languages', lang);

const container = document.getElementById('coaches-content');

/* Getting User Location */
// Get the user's IP address using ipify
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;

    // Use ipapi to get the user's country based on their IP address
    fetch(`https://ipapi.co/${ipAddress}/json/`)
      .then(response => response.json())
      .then(data => {
				userCountry = data.country_name;
			})
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));

/*
function onSuccess(position) {
	// console.log("Position - ", position);
	let { latitude, longitude } = position.coords;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e5f4e9ff26ae4617a4ce7c78306a1867`;
  // const url = `https://api.opencagedata.com/geocode/v1/json?q=Saudi,+Riyadh&key=e5f4e9ff26ae4617a4ce7c78306a1867`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
			let allDetails = data.results[0].components;
			let { country } = allDetails;
			userCountry = country;
			// console.log(allDetails);
    })
    .catch(error => console.log(error));
}

function onError(err) {
	console.log("The Error: ", err);
}
*/

// Query the first page of docs
const seeMoreBtn = document.querySelector('.see-more');
let start = false; // to check if user used filters tool before btn click.
let coaches = [];
let latestDoc = null;
let cardsCount = 6;
// For template
let priceUnit = lang == 'en' ? '/hr' : ' / للساعة';
const displayNext = async (viewAll = false) => {

	let ref = query(collectionRef,
		where('appear', '==', true),
		orderBy('order', 'asc'),
		startAfter(latestDoc || 0),
		limit(cardsCount)
	);

	// cardsCount += 3;

	if(viewAll) {
		ref = query(collectionRef,
			where('appear', '==', true), 
			orderBy('order', 'asc'),
			startAfter(latestDoc || 0),
		);
	}

	const data = await getDocs(ref);

	console.log(userCountry);
	data.docs.forEach(doc => {
		const coach = doc.data();
		coach.id = doc.id;
		if(userCountry === 'Egypt') {
			thePrice = isNaN(Number(coach.pricing_in_egypt)) ? coach.pricing : coach.pricing_in_egypt;
		} else if (userCountry === 'Saudi Arabia') {
			thePrice = isNaN(Number(coach.pricing_in_egypt)) ? Math.floor(parseInt(coach.pricing) * 3.75) + ' SAR' : Math.floor(parseInt(coach.pricing_in_egypt) * 3.75) + ' SAR';
		} else {
			thePrice = isNaN(Number(coach.pricing_outside_egypt)) ? '30 USD' : coach.pricing_outside_egypt + ' USD' ;
		}
		container.innerHTML += `
			<div class="col-lg-4 col-md-6">
				<div class="member" data-aos="zoom-in">
					<div class="pic"><img src=${coach.image} class="img-fluid" alt="${coach.name}" loading="lazy"></div>
						<div class="member-info coaches pricing" data-i=${coach.id}>
							<div class='ps-3 pe-3'>
								<h5>${coach.name}</h5>
								<h4>${coach.jobTitle}</h4>
							</div>
							<span class="mb-0 text-uppercase">${thePrice}${priceUnit}</span>
							<p class='detail-item mb-1 mt-1'>Details</p>
							<span>${coach.category}</span>
							${coach.summary.length > 180 ? `<span>${coach.summary.slice(0, 180) + '...'}</span>` : `<span>${coach.summary}</span>`}
							<span class="mt-1">${coach.country}/${coach.city} - ${coach.rating} stars</span>
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
		coaches.push({ ...coach }); // push coach
	});

	// container.innerHTML += template;

	// Update last Doc
	latestDoc = data.docs[data.docs.length - 1];

	// Unattach event listener if no more docs
	if(data.empty) {
		seeMoreBtn.removeEventListener('click', handleClick);
		seeMoreBtn.style.display = 'none';
		start = true;
		return
	}

	seeMoreBtn &&	(seeMoreBtn.style.display = 'flex');
	seeMoreBtn &&	(seeMoreBtn.innerHTML = lang == 'en'? 'See More <i class="bi bi-chevron-down"></i>': 'شاهد المزيد <i class="bi bi-chevron-down"></i>');


};

function reloadButton(btn) {
	btn.style.pointerEvents = "none;"
	btn.innerHTML = '<span class="spinner"></span>';
};

const handleClick = () => {
	reloadButton(seeMoreBtn);
	displayNext(false);
};

const viewAll = () => {
	start = true;
	reloadButton(seeMoreBtn);
	displayNext(true);
	seeMoreBtn.style.display = 'none';
};

displayNext();
seeMoreBtn && seeMoreBtn.addEventListener('click', handleClick);

function viewProfile(documentId, lang, username) {
	sessionStorage.setItem('selectedCoach', documentId);
	sessionStorage.setItem('lang', lang);
	if(lang == 'en') {
		window.location.href = `coach-profile.html#${username}`;
	} else {
		window.location.href = `coach-profile-ar.html`;
	}
};

window.onclick = (e) => {
	if(e.target.matches('.profile-btn')) {
		viewProfile(e.target.parentElement.dataset.i, lang, e.target.dataset.uname);
	}
};

/* Start Filters */
if(document.body.classList.contains('coaches-html')) {
	const mainSearch = document.getElementById('main-search');

	// Handle User searching
	mainSearch.addEventListener('input', () => {
		if(!start) {
			viewAll();
			setTimeout(() => {
				filterResults();
			}, 500);
		} else {
			filterResults();
		}
	})

	const jobTitleFilter = document.getElementById('job-title-menu');
	const specialitiesFilter = document.getElementById('specialities-menu');
	const countryFilter = document.getElementById('country-menu');
	const genderFilter = document.getElementById('gender-menu');
	const yearsOfExperienceFilter = document.getElementById('years-experience-menu');
	const modalityFilter = document.getElementById('modality-menu');
	let minVal = 150, maxVal = 9000;

	const filterBtns = document.querySelectorAll('.search-fields .filter-btn');

	filterBtns.forEach(btn => {
		btn.addEventListener('click', e => {
			if(!start) {
				viewAll();
			}
			// Check if the clicked element is a button or an i element that is a child of a button element
			if (e.target.closest('button') || e.target.parentNode.closest('button')) {
				filterBtns.forEach(btn => {
					if (btn == e.target.closest('button') || btn == e.target.parentNode.closest('button')) {
						btn.classList.toggle('active');
					} else {
						btn.classList.remove('active');
					}
				});
			}
			if(e.target.closest('.close-filtered-btn')) { /* Deactive all Dropdowns */
				btn.classList.remove('active');
			}
		});
	});

	document.querySelectorAll('.filter-menu .filter-item').forEach(item => {
		item.addEventListener('click', _ => {
			item.classList.toggle('on');
			item.querySelector('.square-check').classList.toggle('check');
			if(item.parentElement.querySelectorAll('.check').length > 0) {
				document.querySelector('.search-fields .filter-btn.active').classList.add('filtered-btn');
			} else {
				document.querySelector('.search-fields .filter-btn.active').classList.remove('filtered-btn');
			}
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
		// const selectedPrices = getSelectedItems(priceFilter);

		const filteredData = coaches.filter(coach => {
			let validOne = true;
			if (
				(selectedJobTitles.length === 0 || ( coach.jobTitle && selectedJobTitles.includes(coach.jobTitle.trim().toLowerCase()) )) &&
				(selectedCountries.length === 0 || ( coach.country && selectedCountries.includes(coach.country.trim().toLowerCase()) )) &&
				(selectedspecialities.length === 0 || ( coach.industry && selectedspecialities.includes(coach.industry.trim().toLowerCase()) )) &&
				(selectedModalities.length === 0 || ( coach.session_way && selectedModalities.includes(coach.session_way.trim().toLowerCase()) ))
			) {
				validOne = true;
			} else {
				validOne = false;
			}

			let genderValidation = true;
			if (selectedGenders.length > 0) {
				if(coach.gender) {
					if(selectedGenders.includes(coach.gender.trim().toLowerCase())) {
						genderValidation = true;
					} else {
						genderValidation = false;
					}
				} else {
					genderValidation = false;
				}
			};

			let searchValidation = true;
			let searchValue = mainSearch.value.trim().toLowerCase();
			if(searchValue !== '') {
				if(
					( coach.category && coach.category.trim().toLowerCase().includes(searchValue) ) ||
					( coach.name && coach.name.trim().toLowerCase().includes(searchValue) ) ||
					( coach.jobTitle && coach.jobTitle.trim().toLowerCase().includes(searchValue) ) ||
					( coach.country && coach.country.trim().toLowerCase().includes(searchValue) )
				) {
					searchValidation = true;
				} else {
					searchValidation = false;
				}
			}

			// Filter by Prices
			let theCoachPrice = parseInt(coach.pricing_in_egypt) || parseInt(coach.pricing);
			let coachPriceInRange = true;
			if(minVal <= theCoachPrice && maxVal >= theCoachPrice) {
				coachPriceInRange = true;
			} else {
				coachPriceInRange = false;
			}

			// Filter by Years of Experience Year
			let coachExpYears = parseInt(coach.work_experience_years);
			if(selectedYearsOfExperience.length > 0) {
				if(!isNaN(coachExpYears)) {
					let userCheckedYearInRange = false;
					selectedYearsOfExperience.forEach(year => {
						if (coachExpYears >= parseInt(year['minVal']) && coachExpYears <= parseInt(year['maxVal'])) {
							userCheckedYearInRange = true;
						}
					});
					return userCheckedYearInRange && validOne && genderValidation && coachPriceInRange && searchValidation;
				} else {
					return false;
				}
			};

			return validOne && genderValidation && searchValidation && coachPriceInRange;

		});

		/* if there is not filtered coaches show a message to a user */
		if(filteredData.length > 0) {
			displayResults(filteredData);
		} else {
			container.innerHTML = 'There is no coaches according to your needs...';
		}
	};

	function getSelectedItems(filterMenu) {
		const selectedItems = [];
		const filterItems = filterMenu.querySelectorAll('.check');

		filterItems.forEach(item => {
			if(filterMenu == yearsOfExperienceFilter) {
				let minVal = parseInt(item.dataset.minvalue);
				let maxVal = parseInt(item.dataset.maxvalue);
				selectedItems.push({ minVal, maxVal });
			} else {
				let value = item.dataset.value.trim().toLowerCase();
				selectedItems.push(value);
			}
		});

		return selectedItems;
	};

	function displayResults(results) {
		container.innerHTML = '';

		results.forEach(coach => {
			container.innerHTML += `
			<div class="col-lg-4 col-md-6">
				<div class="member" data-aos="zoom-in">
					<div class="pic"><img src=${coach.image} class="img-fluid" alt="${coach.name}" loading="lazy"></div>
						<div class="member-info coaches pricing" data-i=${coach.id}>
							<div class='ps-3 pe-3'>
								<h5>${coach.name}</h5>
								<h4>${coach.jobTitle}</h4>
							</div>
							<span class="mb-0 text-uppercase">${thePrice}${priceUnit}</span>
							<p class='detail-item mb-1 mt-1'>Details</p>
							<span>${coach.category}</span>
							${coach.summary.length > 180 ? `<span>${coach.summary.slice(0, 180) + '...'}</span>` : `<span>${coach.summary}</span>`}
							<span class="mt-1">${coach.country}/${coach.city} - ${coach.rating} stars</span>
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
		});
	};

	const menuSearches = document.querySelectorAll('.filter-menu-content input[type="search"]');
	menuSearches.forEach(searchInput => {
		searchInput.addEventListener('input', e => {
			let userInputVal = e.target.value.toLowerCase().trim();
			if(userInputVal) {
				const filterItems = e.target.parentElement.nextElementSibling.querySelectorAll('.square-check');
				filterItems.forEach(item => {
					let filterItem = item.dataset.value.toLowerCase().trim();
					if(!filterItem.includes(userInputVal)) {
						item.parentElement.style.cssText = 'display:none !important;scale: 0; ';
					} else {
						item.parentElement.style.cssText = 'display:flex;scale: 1; ';
					}
				})
			}
		})
	});

	let priceGap = 100;

	// Price Inputs
	const rangeInput = document.querySelectorAll('.range-input input'),
	priceInput = document.querySelectorAll('.price-input input'),
	progress = document.querySelector('.slider .range-bar');

	priceInput.forEach(input => {
		input.addEventListener('input', (e) => {
			// let minVal = parseInt(priceInput[0].value),
			minVal = parseInt(priceInput[0].value);
			maxVal = parseInt(priceInput [1].value);

			if((maxVal - minVal >= priceGap) && maxVal <= 10000) {
				if(e.target.className === 'price-min') {
					rangeInput[0].value = minVal;
					progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
				} else {
					rangeInput[1].value = maxVal;
					progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
				}
			};

			document.querySelector('.search-fields .filter-btn.active').classList.add('filtered-btn');
			filterResults();

		})
	});

	rangeInput.forEach(input => {
		input.addEventListener('input', (e) => {
			// let minVal = parseInt(rangeInput[0].value),
			minVal = parseInt(rangeInput[0].value);
			maxVal = parseInt(rangeInput[1].value);

			if(maxVal - minVal < priceGap) {
				if(e.target.className === 'range-min') {
					rangeInput[0].value = maxVal - priceGap;
				} else {
					rangeInput[1].value = minVal + priceGap;
				}
			} else {
				priceInput[0].value = minVal;
				priceInput[1].value = maxVal;
				progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
				progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
			};

			document.querySelector('.search-fields .filter-btn.active').classList.add('filtered-btn');
			filterResults();

		})
	})

	// Reset Filters
	const closeFilteredBtns = document.querySelectorAll('.search-fields .close-filtered-btn');
	closeFilteredBtns.forEach(btn => {

		btn.addEventListener('click', _ => {

			const theDad = btn.parentElement;

			if(!theDad.classList.contains('hourly-rate')) {

				theDad.nextElementSibling.querySelectorAll('.check').forEach(el => {
					el.parentElement.classList.remove('on');
					el.classList.remove('check');
				});

			} else {

				minVal = 150;
				maxVal = 9000;

				progress.style.cssText = 'left: 1.5%;right: 10%;';

				rangeInput[0].value = minVal;
				rangeInput[1].value = maxVal;

				priceInput[0].value = minVal;
				priceInput [1].value = maxVal;

			};

			theDad.classList.remove('filtered-btn');

			filterResults();

		});

	});

};
/* End Filters */


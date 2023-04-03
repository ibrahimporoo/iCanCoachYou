/*
	-----------------------
	--- Start Firebase ----
	-----------------------
*/ 

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection,
	addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDnpUv6FkAyt3eGai3AtCm65exvwFwvOyE",
  authDomain: "collection-practice.firebaseapp.com",
  projectId: "collection-practice",
  storageBucket: "collection-practice.appspot.com",
  messagingSenderId: "1054284320639",
  appId: "1:1054284320639:web:5ad00474d208b0c1eed44a"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const arcolRef = collection(db, 'coaches', 'languages', 'ar')
const encolRef = collection(db, 'coaches', 'languages', 'en')

// Popup Multiple Steps Form Menu
// Multi Step Form - Joining
const joinForm = document.querySelector('.join-form');
const joinUs = document.querySelector('.join-us');
// Registering
joinForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if(isValid()) {
		// Add Doc to Collection.
		// Arabic Doc
		addDoc(arcolRef, {
			name: joinForm.ar_name.value,
			gender: joinForm.gender.value,
			age: joinForm.age.value,
			country: joinForm.location.value.slice(0, joinForm.location.value.indexOf('/')),
			city: joinForm.location.value.slice(joinForm.location.value.indexOf('/') + 1, ),
			mail: joinForm.user_mail.value,
			whats_number: joinForm.whats_number.value,
			college: joinForm.college.value,
			graduation_year: joinForm.G_Year.value,
			SM_account: joinForm.linkedIn_link.value,
			cv_link: joinForm.cv_link.value,
			industry: joinForm.industry.value,
			jobTitle: joinForm.jobTitle.value,
			work_experience: joinForm.work_exp.value,
			pricing: joinForm.hourly_rate.value + 'جنيه مصري',
			english_skills: joinForm.en_lang.value,
			summary: joinForm.ar_summary.value,
			image: joinForm.picture_link.value,
			coach_free_time: joinForm.coachTime.value,
			coach_role_model: joinForm.coach_role_model.value,
			coach_objective_life: joinForm.coach_goal.value,
			coach_calendly_link: joinForm.calendly_link.value,
			coach_bank_infos: joinForm.coach_bank_infos.value,
			how_coach_arrived: joinForm.arrival_way.value,
			coach_comment: joinForm.comment.value,
			session_way: joinForm.session_way.value,
			category: joinForm.industry.value + joinForm.jobTitle.value,
			paymentLink: 'default',
			appear: false
		});
		// English Doc
		addDoc(encolRef, {
			name: joinForm.name.value,
			gender: joinForm.gender.value,
			age: joinForm.age.value,
			country: joinForm.location.value.slice(0, joinForm.location.value.indexOf('/')),
			city: joinForm.location.value.slice(joinForm.location.value.indexOf('/') + 1, ),
			mail: joinForm.user_mail.value,
			whats_number: joinForm.whats_number.value,
			college: joinForm.college.value,
			graduation_year: joinForm.G_Year.value,
			SM_account: joinForm.linkedIn_link.value,
			cv_link: joinForm.cv_link.value,
			industry: joinForm.industry.value,
			jobTitle: joinForm.jobTitle.value,
			work_experience: joinForm.work_exp.value,
			pricing: joinForm.hourly_rate.value + 'EGP',
			english_skills: joinForm.en_lang.value,
			summary: joinForm.summary.value,
			image: joinForm.picture_link.value,
			coach_free_time: joinForm.coachTime.value,
			coach_role_model: joinForm.coach_role_model.value,
			coach_objective_life: joinForm.coach_goal.value,
			coach_calendly_link: joinForm.calendly_link.value,
			coach_bank_infos: joinForm.coach_bank_infos.value,
			how_coach_arrived: joinForm.arrival_way.value,
			coach_comment: joinForm.comment.value,
			session_way: joinForm.session_way.value,
			category: joinForm.industry.value,
			paymentLink: 'default',
			appear: false
		}).then(() => {
			// Show To User That All Data was sent.
			document.querySelector('.steps').style.cssText = 'display: none';
			document.querySelector('.fields').classList.add('done');
			document.querySelector('.form-submitted').classList.add('done');
		})
	}
});
/*
	-----------------------
	--- End Firebase ----
	-----------------------
*/ 
/*
	---------------------------
	--- Start Registration ----
	---------------------------
*/ 

// Form show ,hide and user data entring.
const closeFormBtn = document.querySelector('.close-form');
joinUs.addEventListener('click', _ => {
	joinForm.classList.toggle('on');
	document.body.classList.toggle('hide-flow');
})
closeFormBtn.addEventListener('click', (e) => {
	joinForm.classList.toggle('on');
	document.body.classList.toggle('hide-flow');
})
// Patterns
/* Any URL Pattern */ 
let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
let mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// Multiple Steps Form
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const submitBtn = document.querySelector('#submit');
const taps = document.querySelectorAll('.fields .step');
const progSteps = document.querySelectorAll('.steps h4');
let tapIndex = 0;
showTap(tapIndex);

nextBtn.addEventListener('click', () => {
	prevNext(1);
});
prevBtn.addEventListener('click', () => {
	prevNext(-1);
});

function showTap(tapIndex) {
	taps.forEach(tap => {
		tap.classList.remove('on');
	})
	// Show Current Tap
	taps[tapIndex].classList.add('on');
	if(tapIndex > 0) {
		// Show User Progress
		progSteps.forEach((prog, index) => {
			if(index < tapIndex) {
				prog.classList.add('on');
			} else {
				prog.classList.remove('on');
			}
		})
		// Show Previous Btn
		prevBtn.style.display = 'block';
	} else {
		// Show That is no progress yet
		progSteps.forEach(prog => {
			prog.classList.remove('on');
		})
		// Hide Previous Btn
		prevBtn.style.display = 'none';
	}
	// Make Next Btn Submit if it's the last tap
	if(tapIndex == taps.length - 1) {
		nextBtn.innerHTML = "Submit";
		nextBtn.style.display = "none";
		submitBtn.style.display = "block";
	} else {
		nextBtn.innerHTML = "Next";
		nextBtn.style.display = "block";
		submitBtn.style.display = "none";
	}
};

function prevNext(n) {
	// Check if current validations' inputs are true
	if (n == 1 && isValid()) {
		// Go To Next Tab
		tapIndex += n;
		// If the last submit Form
		if (tapIndex >= taps.length) {
			// formSubmit();
			tapIndex = taps.length - 1;
			return false;
		}
		showTap(tapIndex);
	} else if (n == -1) { // If Previous Btn clicked
		// Go To Previous Tab
		tapIndex += n;
		showTap(tapIndex);
	} else {
		return false;
	}
};

// Alert
const sweetAlert = document.querySelector('#alert-container');
const sweetAlertText = sweetAlert.querySelector('.text');
const closeAlert = document.querySelector('#alert-container #close-alert');
closeAlert.addEventListener('click', () => {
	sweetAlert.classList.remove('on');
});
sweetAlert.addEventListener('click', () => {
	sweetAlert.classList.remove('on');
});
let arrowDirection = 'right';

// Form Validation
function isValid() {
	let valid = true;
	let currentStep = document.querySelector('.fields .step.on');
	let currentInputs = currentStep.getElementsByTagName('input');
	for(let i = 0;i < currentInputs.length; i++) {
		// If There is any empty Input make it invalid
		if (currentInputs[i].value.length) {
			currentInputs[i].classList.remove("invalid");
		} else {
			valid = false;
			currentInputs[i].classList.add("invalid");
		}
	}
	if(tapIndex == 0) {
		console.log(currentInputs[8])
		if(currentInputs[8].value.match(mailPattern)) {
			currentInputs[8].classList.remove('invalid');
			valid = true;
		} else {
			currentInputs[8].classList.add('invalid');
			valid = false;
		}
	}
	if(tapIndex == 1) {
		let tapValidation = false;
		let validOne, validTwo, validThree, validFour, validFive;
		sweetAlertText.innerHTML = '';
		let textareas = currentStep.querySelectorAll('textarea');
		let pictureLink = currentStep.querySelector('input[name="picture_link"]');
		let cvLink = currentStep.querySelector('input[name="cv_link"]');
		// Picture Link
		if(!regex.test(pictureLink.value)) {
			validFour = false;
			pictureLink.classList.add('invalid');
			let theText = document.createTextNode('picture url must to be valid.');
			let warnText = document.createElement('h3');
			let arrowIcon = document.createElement('i');
			arrowIcon.className = `bi bi-arrow-${arrowDirection}-short`;
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		} else {
			validFour = true;
			pictureLink.classList.remove('invalid');
		}
		// CV Link
		if(!regex.test(cvLink.value)) {
			validFive = false;
			cvLink.classList.add('invalid');
			let theText = document.createTextNode('cv url must to be valid.');
			let warnText = document.createElement('h3');
			let arrowIcon = document.createElement('i');
			arrowIcon.className = `bi bi-arrow-${arrowDirection}-short`;
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		} else {
			validFive = true;
			cvLink.classList.remove('invalid');
		}
		// Linked In Profile URL
		let userLink = document.querySelector('input[name="linkedIn_link"]');
		if(!regex.test(userLink.value)) {
			validThree = false;
			userLink.classList.add('invalid');
			let theText = document.createTextNode('Linked in profile url must to be valid.');
			let warnText = document.createElement('h3');
			let arrowIcon = document.createElement('i');
			arrowIcon.className = `bi bi-arrow-${arrowDirection}-short`;
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		} else {
			validThree = true;
			userLink.classList.remove('invalid');
		}
		// Text Area
		let first = true;
		let second = true;
		for(let i = 0;i < textareas.length; i++) {
			// If There are any empty Input make it invalid
			if (textareas[i].value.length) {
				textareas[i].classList.remove("invalid");
			} else {
				first = false;
				second = false;
				textareas[i].classList.add("invalid");
			}
		};
		if(first && second) {
			validOne = true;
		} else {
			validOne = false;
		}
		if(!validOne) {
			let theText = document.createTextNode('Please, summarize what you wish to display in the website.');
			let warnText = document.createElement('h3');
			let arrowIcon = document.createElement('i');
			arrowIcon.className = `bi bi-arrow-${arrowDirection}-short`;
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		}
		// Finally Validation
		if(validOne && validTwo && validThree && validFour && validFive) {
			tapValidation = true;
		} else {
			sweetAlert.classList.add('on');
			tapValidation = false;
			return ;
		}
		if(valid && tapValidation) {
			return true;
		} else {
			let theText = document.createTextNode('Ensure that you have filled the data in the correct way.');
			let warnText = document.createElement('h3');
			let arrowIcon = document.createElement('i');
			arrowIcon.className = `bi bi-arrow-${arrowDirection}-short`;
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
			sweetAlert.classList.add('on');
		}
	}
	if(tapIndex == 2) {
		let tapValidation = false;
		let validOne, validTwo;
		sweetAlertText.innerHTML = '';
		// Coach Hourly Rate
		let calendlyURL = document.querySelector('input[name="calendly_link"]');
		if(!regex.test(calendlyURL.value)) {
			validOne = false;
			calendlyURL.classList.add('invalid');
			let theText = document.createTextNode('Calendly link is invalid!! please try to give us valid one.');
			let warnText = document.createElement('h3');
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		} else {
			validOne = true;
			calendlyURL.classList.remove('invalid');
		}
		// Check validation of coach bank info
		let coachBankInfos = document.querySelector('textarea[name="coach_bank_infos"]');
		if(coachBankInfos.value.length) {
			coachBankInfos.classList.remove('invalid');
			validTwo = true;
		} else {
			coachBankInfos.classList.add('invalid');
			validTwo = false;
			let theText = document.createTextNode('Please Type Your bank Information.');
			let warnText = document.createElement('h3');
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		}
		// Finally Validation
		if(validOne && validTwo) {
			tapValidation = true;
		} else {
			tapValidation = false;
			sweetAlert.classList.add('on');
			return
		}
		if(valid && tapValidation) {
			return true;
		} else {
			let theText = document.createTextNode('Ensure that you have filled the data in the correct way.');
			let warnText = document.createElement('h3');
			warnText.appendChild(arrowIcon);
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText)
			sweetAlert.classList.add('on');
		}
	}
	return valid;
}

/*
	---------------------------
	--- End Registration ----
	---------------------------
*/ 

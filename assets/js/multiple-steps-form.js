

// Popup Multiple Steps Form Menu
// Multi Step Form - Joining
const joinForm = document.querySelector('.join-form');
const joinUs = document.querySelector('.join-us');
const closeFormBtn = document.querySelector('.close-form');
document.querySelector('.join-us').addEventListener('click', _ => {
	joinForm.classList.toggle('on');
	document.body.classList.toggle('hide-flow');
})
closeFormBtn.addEventListener('click', (e) => {
	joinForm.classList.toggle('on');
	document.body.classList.toggle('hide-flow');
	console.log(e.target)
})
// Patterns
/* Any URL Pattern */ 
let regex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
let mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
// Multiple Steps Form
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const taps = document.querySelectorAll('.fields .step');
const progSteps = document.querySelectorAll('.steps h4');
let tapIndex = 2;
showTap(tapIndex);


function formSubmit() {
	console.log("submit");
	document.querySelector('.steps').style.cssText = 'display: none';
	document.querySelector('.fields').classList.add('done');
	document.querySelector('.form-submitted').classList.add('done');
}

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
		prevBtn.style.display = 'block'
	} else {
		// Show That is no progress yet
		progSteps.forEach(prog => {
			prog.classList.remove('on');
		})
		// Hide Previous Btn
		prevBtn.style.display = 'none'
	}
	// Make Next Btn Submit if it's the last tap
	if(tapIndex == taps.length - 1) {
		nextBtn.innerHTML = "Submit"
	} else {
		nextBtn.innerHTML = "Next";
	}
};

function prevNext(n) {
	// Check if current validations' inputs are true
	if (n == 1 && isValid()) {
		// Go To Next Tab
		tapIndex += n;
		// If the last submit Form
		if (tapIndex >= taps.length) {
			formSubmit();
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
}

// Alert
const sweetAlert = document.querySelector('#alert-container');
const sweetAlertText = sweetAlert.querySelector('.text');
const closeAlert = document.querySelector('#alert-container #close-alert');
closeAlert.addEventListener('click', () => {
	sweetAlert.classList.remove('on');
});
sweetAlert.addEventListener('click', () => {
	sweetAlert.classList.remove('on');
})
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
		let validOne, validTwo, validThree;
		sweetAlertText.innerHTML = '';
		textareas = currentStep.querySelectorAll('textarea');
		industryboxes = currentStep.querySelectorAll('input[name="industry"]:checked');
		jobTitleboxes = currentStep.querySelectorAll('input[name="jobTitle"]:checked');
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
			let theText = document.createTextNode('Text Area have to be filled');
			let warnText = document.createElement('h3');
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		}
		// Industry and job title Boxes
		if(industryboxes.length == 0 || jobTitleboxes.length == 0) {
			validTwo = false;
			let theText = document.createTextNode('You have to choose one or more from Industry and job title');
			let warnText = document.createElement('h3');
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		} else {
			validTwo = true;
		}
		// Linked In Profile URL
		let userLink = document.querySelector('input[name="linkedIn_link"]');
		if(!regex.test(userLink.value)) {
			validThree = false;
			userLink.classList.add('invalid');
			let theText = document.createTextNode('Linked in profile url must to be valid');
			let warnText = document.createElement('h3');
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		} else {
			validThree = true;
			userLink.classList.remove('invalid');
		}
		// Finally Validation
		if(validOne == true && validTwo == true && validThree == true) {
			valid = true;
		} else {
			sweetAlert.classList.add('on');
			valid = false;
		}
	}
	if(tapIndex == 2) {
		let validOne, validTwo;
		sweetAlertText.innerHTML = '';
		// Coach Hourly Rate
		let calendlyURL = document.querySelector('input[name="calendly_link"]');
		if(!regex.test(calendlyURL.value)) {
			validOne = false;
			calendlyURL.classList.add('invalid');
			let theText = document.createTextNode('Calendly link is invalid!! please try to give us valid one.');
			let warnText = document.createElement('h3');
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
			warnText.appendChild(theText);
			sweetAlertText.appendChild(warnText);
		}
		// Finally Validation
		if(validOne && validTwo) {
			valid = true;
		} else {
			valid = false;
			sweetAlert.classList.add('on');
		}
		console.log("Valid One => ", validOne)
		console.log("Valid Two => ", validTwo)
	}
	return valid;
}

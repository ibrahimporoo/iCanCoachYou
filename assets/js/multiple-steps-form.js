

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
// Multiple Steps Form
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const taps = document.querySelectorAll('.fields .step');
const progSteps = document.querySelectorAll('.steps h4');
let tapIndex = 0;
showTap(tapIndex);


function formSubmit() {
	console.log("submit");
	document.querySelector('.steps').style.cssText = 'display: none';
	document.querySelector('.fields').classList.add('done');
	document.querySelector('.form-submitted').classList.add('done');
}

nextBtn.addEventListener('click', () => {
	prevNext(1);
	// stepIndex += 1;
	// stepIndex = stepIndex >= steps.length ? 0 : steps.length - 1;
	// showStep(stepIndex);
});
prevBtn.addEventListener('click', () => {
	prevNext(-1);
	// stepIndex -= 1;
	// stepIndex = stepIndex < 0 ? steps.length - 1 : 0;
	// showStep(stepIndex);
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
		let mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
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
		textareas = currentStep.querySelectorAll('textarea');
		industryboxes = currentStep.querySelectorAll('input[name="industry"]:checked');
		jobTitleboxes = currentStep.querySelectorAll('input[name="jobTitle"]:checked');
		// Text Area
		for(let i = 0;i < textareas.length; i++) {
			// If There are any empty Input make it invalid
			if (textareas[i].value.length) {
				textareas[i].classList.remove("invalid");
				validOne = true
			} else {
				validOne = false;
				textareas[i].classList.add("invalid");
			}
		};
		// Industry and job title Boxes
		if(industryboxes.length == 0 || jobTitleboxes.length == 0) {
			validTwo = false;
		} else {
			validTwo = true;
		}
		// Linked In Profile URL
		// let linkedInRegex = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/;
		// let userLink = document.querySelector('input[name="linkedIn_link"]');
		// if(!userLink.value.match(linkedInRegex)) {
		// 	validThree = false;
		// 	userLink.classList.add('invalid')
		// } else {
		// 	validThree = true;
		// 	userLink.classList.remove('invalid')
		// }
		// Finally Validation
		if(validOne == true && validTwo == true) {
			valid = true;
		} else {
			valid = false;
		}
		// else {
		// 	if((validOne == false && validTwo == false && validThree == true) || (validOne == false && validTwo == false && validThree == false)) {
		// 		sweetAlert.classList.add('on');
		// 	}
		// 	if(validOne == true && validTwo == true && validThree == false) {
		// 		sweetAlert.querySelector('.alert-title').innerText = 'Note That Linked In profile Link is Invalid!';
		// 		sweetAlert.classList.add('on');
		// 		console.log("Linked In Profile Checker")
		// 	}
		// }
	}
	return valid;
}

import { initializeApp } from 'firebase/app';
import {
	getFirestore, collection, getDocs,
	addDoc, serverTimestamp
} from 'firebase/firestore';
import {
	getStorage, ref, uploadBytesResumable, getDownloadURL
} from 'firebase/storage';
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

// Page Language

let lang = document.querySelector('html').lang;
// init services
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();

// collection ref
const arcolRef = collection(db, 'coaches', 'languages', 'ar');
const encolRef = collection(db, 'coaches', 'languages', 'en');
let enHowManyCoachesInFirebase = 0;
let arHowManyCoachesInFirebase = 0;

getDocs(arcolRef)
  .then(snapshot => {
		let allCoaches = [];
    // console.log(snapshot.docs)
    snapshot.docs.forEach(doc => {
      allCoaches.push({ ...doc.data(), id: doc.id })
    })
		arHowManyCoachesInFirebase = allCoaches.length;
  })
  .catch(err => {
    console.log(err.message);
  });
getDocs(encolRef)
  .then(snapshot => {
		let allCoaches = [];
    // console.log(snapshot.docs)
    snapshot.docs.forEach(doc => {
      allCoaches.push({ ...doc.data(), id: doc.id })
    })
		enHowManyCoachesInFirebase = allCoaches.length;
  })
  .catch(err => {
    console.log(err.message);
  })

// Popup Multiple Steps Form Menu
// Multi Step Form - Joining
const joinForm = document.querySelector('.join-form');
const joinUs = document.querySelector('.join-us');
// Registering
joinForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	if(isValid()) {
		/* Show to user that the data are being send */
		const imageFile = joinForm.image_file.files[0];
		const cvFile = joinForm.cv_file.files[0];

		let imageURL = '';
		let cvDownloadURL = '';

		reloadButton();

		if (imageFile) {
			const compressedImageFile = await compressFileIfNeeded(imageFile);
			const imageFilePath = `images/${imageFile.name}`;
			const imageStorageRef = ref(storage, imageFilePath);
			const imageUploadTask = uploadBytesResumable(imageStorageRef, compressedImageFile);
			await imageUploadTask;
			imageURL = await getDownloadURL(imageStorageRef);
		}

		if (cvFile) {
			const compressedCvFile = await compressFileIfNeeded(cvFile);
			const cvFilePath = `cvs/${cvFile.name}`;
			const cvStorageRef = ref(storage, cvFilePath);
			const cvUploadTask = uploadBytesResumable(cvStorageRef, compressedCvFile);
			await cvUploadTask;
			cvDownloadURL = await getDownloadURL(cvStorageRef);
		}


		/* Some Form Values */
		const countryVal = joinForm.country.value.charAt(0).toUpperCase() + joinForm.country.value.slice(1, ).toLowerCase();
		await addDoc(arcolRef, {
			name: joinForm.ar_name.value,
			gender: joinForm.gender.value,
			birthdate: joinForm.birthdate.value,
			country: countryVal,
			city: joinForm.city.value,
			mail: joinForm.user_mail.value,
			whats_number: joinForm.whats_number.value,
			college: joinForm.college.value,
			study_field: joinForm.study_field.value,
			graduation_year: joinForm.G_Year.value,
			linkedIn_account: joinForm.linkedIn_link.value,
			instagram_account: joinForm.instagram_link.value,
			twitter_account: joinForm.twitter_link.value,
			facebook_account: joinForm.fb_link.value,
			youtube_account: joinForm.youtube_link.value,
			tiktok_account: joinForm.tiktok_link.value,
			industry: joinForm.industry.value.split('$')[1],
			jobTitle: joinForm.jobTitle.value.split('$')[1],
			category: joinForm.industry.value.split('$')[1] + ", " + joinForm.jobTitle.value.split('$')[1],
			work_experience: joinForm.ar_work_exp.value, // new
			work_experience_years: joinForm.work_exp_years.value,
			pricing_in_egypt: joinForm.eg_hourly_rate.value + ' جنيه مصري',
			pricing_outside_egypt: joinForm.outside_eg_hourly_rate.value + ' دولار أمريكي',
			english_skills: joinForm.en_lang.value,
			order: arHowManyCoachesInFirebase + 1,
			rating: 5,
			summary: joinForm.ar_summary.value,
			coach_working_life_tags: coachTags,
			coach_free_time: joinForm.coachTime.value,
			coach_role_model: joinForm.ar_coach_role_model.value, // new
			coach_objective_life: joinForm.ar_coach_goal.value, // new
			coach_calendly_link: joinForm.calendly_link.value,
			coach_tidycal_link: joinForm.tidycal_link.value,
			coach_bank_infos: joinForm.coach_bank_infos.value,
			how_coach_arrived: joinForm.arrival_way.value,
			coach_comment: joinForm.comment.value,
			session_way: joinForm.session_way.value,
			paymentLink: `https://wa.me/201099491090/?text=Hey%20I%20Want%20To%20Book%20${joinForm.ar_name.value}%20with%20${joinForm.eg_hourly_rate.value}%20EGP%20per%20hour`,
			videoDownloadURL: joinForm.video_link.value,
			image: imageURL,
			cv_link: cvDownloadURL,
			appear: false,
			createdAt: serverTimestamp()
		});
		await addDoc(encolRef, {
			name: joinForm.en_name.value,
			gender: joinForm.gender.value,
			birthdate: joinForm.birthdate.value,
			country: countryVal,
			city: joinForm.city.value,
			mail: joinForm.user_mail.value,
			whats_number: joinForm.whats_number.value,
			college: joinForm.college.value,
			study_field: joinForm.study_field.value,
			graduation_year: joinForm.G_Year.value,
			linkedIn_account: joinForm.linkedIn_link.value,
			instagram_account: joinForm.instagram_link.value,
			twitter_account: joinForm.twitter_link.value,
			facebook_account: joinForm.fb_link.value,
			youtube_account: joinForm.youtube_link.value,
			tiktok_account: joinForm.tiktok_link.value,
			industry: joinForm.industry.value.split('$')[0],
			jobTitle: joinForm.jobTitle.value.split('$')[0],
			category: joinForm.industry.value.split('$')[0] + ", " + joinForm.jobTitle.value.split('$')[0],
			work_experience: joinForm.work_exp.value,
			work_experience_years: joinForm.work_exp_years.value,
			pricing_in_egypt: joinForm.eg_hourly_rate.value + ' EGP',
			pricing_outside_egypt: joinForm.outside_eg_hourly_rate.value + ' USD',
			english_skills: joinForm.en_lang.value,
			order: enHowManyCoachesInFirebase + 1,
			rating: 5,
			summary: joinForm.en_summary.value,
			coach_working_life_tags: coachTags,
			coach_free_time: joinForm.coachTime.value,
			coach_role_model: joinForm.coach_role_model.value,
			coach_objective_life: joinForm.coach_goal.value,
			coach_calendly_link: joinForm.calendly_link.value,
			coach_tidycal_link: joinForm.tidycal_link.value,
			coach_bank_infos: joinForm.coach_bank_infos.value,
			how_coach_arrived: joinForm.arrival_way.value,
			coach_comment: joinForm.comment.value,
			session_way: joinForm.session_way.value,
			paymentLink: `https://wa.me/201099491090/?text=Hey%20I%20Want%20To%20Book%20${joinForm.en_name.value}%20with%20${joinForm.eg_hourly_rate.value}%20EGP%20per%20hour`,
			videoDownloadURL: joinForm.video_link.value,
			image: imageURL,
			cv_link: cvDownloadURL,
			appear: false,
			createdAt: serverTimestamp()
		}).then(() => {
			document.querySelector('.steps').style.cssText = 'display: none';
			document.querySelector('.fields').classList.add('done');
			document.querySelector('.form-submitted').classList.add('done');
			clearInterval(btnReloadingInterval);
		})
	};
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

// Form show ,hide and user data entering.
const closeFormBtn = document.querySelector('.close-form');
joinUs.addEventListener('click', _ => {
	joinForm.classList.toggle('on');
	document.body.classList.toggle('hide-flow');
});
closeFormBtn.addEventListener('click', _ => {
	joinForm.classList.toggle('on');
	document.body.classList.toggle('hide-flow');
});
// Multiple Steps Form
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const submitBtn = document.querySelector('#submit');
// const tagsAddingBtn = document.querySelector('#tags-add-btn');
const taps = document.querySelectorAll('.fields .step');
const progSteps = document.querySelectorAll('.steps h4');
let tapIndex = 0;
showTap(tapIndex);
// Patterns
let mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

nextBtn.addEventListener('click', (e) => {
	e.preventDefault();
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
		if(lang == 'en') {
			nextBtn.innerHTML = "Submit";
		} else {
			nextBtn.innerHTML = "أرسل";
		}
		nextBtn.style.display = "none";
		submitBtn.style.display = "block";
	} else {
		if(lang == 'en') {
			nextBtn.innerHTML = "Next";
		} else {
			nextBtn.innerHTML = "التالي";
		}
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

/* Immediatly Handling with Inputs */
/* Compressing Files if needed */
async function compressFileIfNeeded(file) {
	return new Promise(async (resolve, reject) => {
		if (file.size > 500000 && file.type.startsWith("image/")) {
			const imageURL = URL.createObjectURL(file);
			const image = new Image();
			image.src = imageURL;
			image.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				const maxSize = 1000;
				const ratio = Math.min(maxSize / image.width, maxSize / image.height);
				canvas.width = image.width * ratio;
				canvas.height = image.height * ratio;
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
				canvas.toBlob((compressedBlob) => {
					resolve(new File([compressedBlob], file.name, { type: file.type }));
				}, file.type, 0.7);
			};
		} else {
			resolve(file);
		}
	});
}
/* Tags Input */
const tagsContainer = document.getElementById('tags-container');
const tagsInput = document.getElementById('tags-input');
const tagsAddingBtn = document.getElementById('tags-add-btn');
let coachTags = [];
tagsContainer.innerHTML = '';
tagsInput.addEventListener('focus', () => {
	submitBtn.setAttribute('type', "button");
});
tagsInput.addEventListener('blur', () => {
	// tagsAddingBtn.setAttribute('type', "button");
	submitBtn.setAttribute('type', "submit");
});
tagsInput.addEventListener('keyup', e => {
	if(e.key == "Enter") {
		addTag();
	}
})
tagsAddingBtn.addEventListener('click', addTag);
function addTag() {
	if (tagsInput.value) {
		coachTags.push(tagsInput.value);
    coachTags = [...new Set(coachTags)];
    tagsContainer.innerHTML = '';
		
    coachTags.forEach((tag, index) => {
			let tagSpan = document.createElement('span');
      tagSpan.className = "tag-span";
      tagSpan.innerText = tag;
			
      let removeSpanBtn = document.createElement('button');
      removeSpanBtn.setAttribute('type', 'button');
      removeSpanBtn.innerText = '⛌';
      removeSpanBtn.addEventListener('click', (e) => {
				coachTags.splice(index, 1);
				tagSpan.remove();
				removeSpanBtn.remove();

      });
			
      tagSpan.appendChild(removeSpanBtn);
      tagsContainer.appendChild(tagSpan);
    });

    tagsInput.value = '';
  } else {
    tagsInput.classList.add('invalid');
    setTimeout(() => {
			tagsInput.classList.remove('invalid');
			tagsInput.value = '';
    }, 1000);
  }
}

// Alert...
const sweetAlert = document.querySelector('#alert-container');
const sweetAlertText = sweetAlert.querySelector('.text');
const closeAlert = document.querySelector('#alert-container #close-alert');
closeAlert.addEventListener('click', () => {
	sweetAlert.classList.remove('on');
});
sweetAlert.addEventListener('click', () => {
	sweetAlert.classList.remove('on');
});
let arrowDirection = lang == 'en'? 'right' : 'left';

// Form Validation
function isValid() {
	let valid = true;
	let currentStep = document.querySelector('.fields .step.on');
	const currentInputs = Array.from(currentStep.querySelectorAll('input:not(.unrequired), select, textarea:not(.unrequired)'));
	/* Check All Targeted Input Fields */
	for(let i = 0;i < currentInputs.length; i++) {
		// If There is any empty Input make it invalid
		if (currentInputs[i].value.length) {
			currentInputs[i].classList.remove("invalid");
		} else {
			valid = false;
			currentInputs[i].classList.add("invalid");
		}
	};
	if(tapIndex == 0) {
		let validOne = true;
		let mailInput = currentStep.querySelector('input[name="user_mail"]');
		if(mailInput.value.match(mailPattern)) {
			mailInput.classList.remove('invalid');
		} else {
			mailInput.classList.add('invalid');
			validOne = false;
		}
		// Finally Validation
		if(validOne && valid) {
			valid = true;
		} else {
			valid = false;
			return;
		}
	};
	if(tapIndex == 1) {
		let tapValidation = false;
		// let validOne, validThree, validFour, validFive, validSix, validSeven, validEight, validNine, validTen, validTags;
		let validOne, validThree, validFour, validTen, validTags;
		sweetAlertText.innerHTML = '';
		// Picture File
		let pictureFile = currentStep.querySelector('input[name="image_file"]');
		if(!pictureFile.files[0]) {
			validOne = false;
			pictureFile.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Attach your professional picture file.');
			} else {
				fillAlert('أرفق ملف الصورة الاحترافي الخاص بك.');
			}
		} else {
			validOne = true;
			pictureFile.classList.remove('invalid');
		}
		// // Video File
		// let videoFile = currentStep.querySelector('input[name="video_file"]');
		// if(videoFile.length && !videoFile.files[0]) {
		// 	validTwo = false;
		// 	videoFile.classList.add('invalid');
		// 	if(lang == 'en') {
		// 		fillAlert('Attach 1 minute valid brief Video');
		// 	} else {
		// 		fillAlert('إرفاق مقطع فيديو موجز صالح لمدة دقيقة واحدة');
		// 	}
		// } else {
		// 	validTwo = true;
		// 	videoFile.classList.remove('invalid');
		// }
		// cv File
		let cvFile = currentStep.querySelector('input[name="cv_file"]');
		if(cvFile.length && !cvFile.files[0]) {
			validThree = false;
			cvFile.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Attach valid cv file.');
			} else {
				fillAlert('إرفاق ملف سيرة ذاتية صالح.');
			}
		} else {
			validThree = true;
			cvFile.classList.remove('invalid');
		}
		// Linked In Profile URL
		let linkedInLink = currentStep.querySelector('input[name="linkedIn_link"]');
		let linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin.com\/(company\/[a-zA-Z0-9_\-]+|in\/[a-zA-Z0-9_\-]+)\/?$/;
		if(!linkedInRegex.test(linkedInLink.value)) {
			validFour = false;
			linkedInLink.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Linked in profile url must to be valid.');
			} else {
				fillAlert('يجب أن يكون عنوان url لملف تعريف Linkedin صالحًا.');
			}
		} else {
			validFour = true;
			linkedInLink.classList.remove('invalid');
		}
		// Instagram Profile URL
		/* 
		let instagramLink = currentStep.querySelector('input[name="instagram_link"]');
		let instagramRegex = /^(https?:\/\/)?(www\.)?instagram.com\/[a-zA-Z0-9_\-]+\/?$/;
		if(instagramLink.value.length && !instagramRegex.test(instagramLink.value)) {
			validFive = false;
			instagramLink.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('instagram profile url must to be valid.');
			} else {
				fillAlert('يجب أن يكون عنوان url لملف تعريف instagram صالحًا.');
			}
		} else {
			validFive = true;
			instagramLink.classList.remove('invalid');
		}
		*/
		// Twitter Profile URL
		/*
		let twitterLink = currentStep.querySelector('input[name="twitter_link"]');
		let twitterRegex = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9_]{1,15}\/?$/;
		if(twitterLink.value.length && !twitterRegex.test(twitterLink.value)) {
			validSix = false;
			twitterLink.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Twitter profile url must to be valid.');
			} else {
				fillAlert('يجب أن يكون عنوان url لملف تعريف Twitter صالحًا.');
			}
		} else {
			validSix = true;
			twitterLink.classList.remove('invalid');
		}
		*/
		// Facebook Profile URL
		/*
		let fbLink = currentStep.querySelector('input[name="fb_link"]');
		let fbRegex = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		if(fbLink.value.length && !fbRegex.test(fbLink.value)) {
			validSeven = false;
			fbLink.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Facebook profile url must to be valid.');
			} else {
				fillAlert('يجب أن يكون عنوان url لملف تعريف Facebook صالحًا.');
			}
		} else {
			validSeven = true;
			fbLink.classList.remove('invalid');
		}
		*/
		// Youtube Profile URL
		/*
		let youtubeLink = currentStep.querySelector('input[name="youtube_link"]');
		let youtubeRegex = /^(https?:\/\/)?(www\.)?youtube.com\/(channel\/[a-zA-Z0-9_\-]+|user\/[a-zA-Z0-9_\-]+)\/?$/;
		if(youtubeLink.value.length && !youtubeRegex.test(youtubeLink.value)) {
			validEight = false;
			youtubeLink.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Youtube profile url must to be valid.');
			} else {
				fillAlert('يجب أن يكون عنوان url لملف تعريف Youtube صالحًا.');
			}
		} else {
			validEight = true;
			youtubeLink.classList.remove('invalid');
		} */
		// Tiktok Profile URL
		/*
		let tiktokLink = currentStep.querySelector('input[name="tiktok_link"]');
		let tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok.com\/(@[a-zA-Z0-9.\-_]+|v\/[a-zA-Z0-9.\-_]+|embed\/[a-zA-Z0-9.\-_]+)/;
		if(tiktokLink.value.length && !tiktokRegex.test(tiktokLink.value)) {
			validNine = false;
			tiktokLink.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('Tiktok profile url must to be valid.');
			} else {
				fillAlert('يجب أن يكون عنوان url لملف تعريف Tiktok صالحًا.');
			}
		} else {
			validNine = true;
			tiktokLink.classList.remove('invalid');
		}
		*/
		// Tags Validations.
		/* One of the immediately handling inputs */ 
		if(coachTags.length > 0) {
			validTags = true;
			tagsInput.classList.remove('invalid');
		} else {
			validTags = false;
			tagsInput.classList.add('invalid');
			if(lang == 'en') {
				fillAlert('We need one tag at least that describe your job');
			} else {
				fillAlert('نحتاج إلى علامة واحدة على الأقل تصف وظيفتك');
			}
		}
		// Summarizations
		let textareas = currentStep.querySelectorAll('.summarizations');
		let first = true;
		let second = true;
		for(let i = 0;i < textareas.length; i++) {
			// If There are any empty Input make it invalid
			if (textareas[i].value.length < 200) {
				textareas[i].classList.add("invalid");
				first = false;
				second = false;
			} else {
				textareas[i].classList.remove("invalid");
			}
		};
		if(first && second) {
			validTen = true;
		} else {
			validTen = false;
		}
		if(!validTen) {
			if(lang == 'en') {
				fillAlert('We need from you a long brief about your work, experience, companies and working life 200 charachters at least');
			} else {
				fillAlert('نحتاج منك نبذة طويلة عن عملك وخبرتك وشركاتك وحياتك العملية 200 حرف على الأقل');
			}
		}
		// Finally Validation
		if(validTags && validOne && validThree && validFour && validTen) {
			tapValidation = true;
		} else {
			sweetAlert.classList.add('on');
			tapValidation = false;
			return ;
		}
		if(valid && tapValidation) {
			return true;
		} else {
			if(lang == 'en') {
				fillAlert('Ensure that you have filled the data in the correct way.')
			} else {
				fillAlert('تأكد من أنك ملأت البيانات بالطريقة الصحيحة.')
			}
			sweetAlert.classList.add('on');
		}
	}
	if(tapIndex == 2) {
		// let tapValidation = false;
		valid= true;
		let validOne;
		sweetAlertText.innerHTML = '';
		// Scheduling Systems Inputs Check.
		let calendlyURL = currentStep.querySelector('input[name="calendly_link"]');
		let tidycalURL = currentStep.querySelector('input[name="tidycal_link"]');
		const calendlyRegex = /https:\/\/calendly\.com\/[a-zA-Z0-9_-]+(?:\?.*)?/;
		const tydicalRegex = /https:\/\/tidycal\.com\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*/;
		if(calendlyURL.value.length && tidycalURL.value.length) { // 1 1
			let message = '';
			if(!calendlyRegex.test(calendlyURL.value)) {
				validOne = false;
				calendlyURL.classList.add('invalid');
				message += 'Calendly link is invalid!';
			} else {
				validOne = true;
				calendlyURL.classList.remove('invalid');
			}
			if(!tydicalRegex.test(tidycalURL.value)) {
				validOne = false;
				tidycalURL.classList.add('invalid');
				message += 'Tidycal link is invalid!';
			} else {
				validOne = true;
				tidycalURL.classList.remove('invalid');
			}
			if(lang == 'en') { // to be continued
				fillAlert(message);
			}
		} else if(calendlyURL.value.length && !tidycalURL.value.length) { // 1 0
			if(!calendlyRegex.test(calendlyURL.value)) {
				validOne = false;
				calendlyURL.classList.add('invalid');
				if(lang == 'en') {
					fillAlert('Calendly link is invalid! please try to give us valid one.');
				} else {
					fillAlert('عنوان calnedly link غير صالح! من فضلك حاول أن تعطينا واحدا صالحا.');
				}
			} else {
				validOne = true;
				calendlyURL.classList.remove('invalid');
			}
			tidycalURL.classList.remove('invalid');
		} else if(!calendlyURL.value.length && tidycalURL.value.length) { // 0 1
			if(!tydicalRegex.test(tidycalURL.value)) {
				validOne = false;
				tidycalURL.classList.add('invalid');
				if(lang == 'en') {
					fillAlert('Tidycal link is invalid! please try to give us valid one.');
				} else {
					fillAlert('عنوان tidycal link غير صالح! من فضلك حاول أن تعطينا واحدا صالحا.');
				}
			} else {
				validOne = true;
				tidycalURL.classList.remove('invalid');
			}
			calendlyURL.classList.remove('invalid');
		} else { // 0 0
			validOne = false;
			if(lang == 'en') {
				fillAlert('You have to make an one "Scheduling System" at least make one on calendly or tidycal platforms');
			} else {
				fillAlert('عليك أن تصنع "نظام جدولة" واحد على الأقل على منصات مناسبة أو متدرجة');
			}
		}
		// Finally Validation
		// Check of current Inputs are filled with valid data.
		currentInputs.forEach(inputField => {
			if(inputField.classList.contains('invalid')) {
				valid = false;
				return;
			}
		});
		if(valid && validOne) {
			return true;
		} else {
			if(lang == 'en') {
				fillAlert('Ensure that you have filled the data in the correct way.');
			} else {
				fillAlert('تأكد من أنك ملأت البيانات بالطريقة الصحيحة.');
			}
			sweetAlert.classList.add('on');
			return;
		}
	}
	return valid;
}

function fillAlert(text) {
	let theText = document.createTextNode(text);
	let warnText = document.createElement('h3');
	let arrowIcon = document.createElement('i');
	arrowIcon.className = `bi bi-arrow-${arrowDirection}-short`;
	warnText.appendChild(arrowIcon);
	warnText.appendChild(theText);
	sweetAlertText.appendChild(warnText);
}
let btnReloadingInterval;
function reloadButton() {
	submitBtn.style.pointerEvents = "none;"
	if(lang == 'en') {
		submitBtn.innerHTML = '<span class="spinner"></span> Sending';
	} else {
		submitBtn.innerHTML = '<span class="spinner"></span> قيد الارسال';
	}
	let count = 1
	btnReloadingInterval = setInterval(() => {
		submitBtn.innerHTML += '.';
		count++;
		if(count >= 4) {
			count = 1;
			if(lang == 'en') {
				submitBtn.innerHTML = '<span class="spinner"></span> Sending';
			} else {
				submitBtn.innerHTML = '<span class="spinner"></span> قيد الارسال';
			}
		}
	}, 1000);
}

/*
	---------------------------
	--- End Registration ----
	---------------------------
*/

/* Instead of API */
/* Static Code With Some Countries and Cities */
const citiesByCountry = {
  // Arab countries
  palestine: ['Ramallah', 'Gaza', 'Hebron', 'Nablus', 'Bethlehem', 'Jenin', 'Tulkarm', 'Qalqilya', 'Jericho', 'Tubas', 'Salfit', 'Beitunia', 'Al-Bireh', 'Abasan Al-Kabirah', 'Beit Sahour'],
  sudan: ['Khartoum', 'Omdurman', 'Nyala', 'Port Sudan', 'Kassala', 'Al-Ubayyid', 'Kosti', 'Wad Madani', 'El Fasher', 'Ad-Damazin', 'Geneina', 'Al-Fashir', 'Kaduqli', 'Ed Damer', 'Al-Manaqil'],
  somalia: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Garoowe', 'Beledweyne', 'Jawhar', 'Jilib', 'Baidoa', 'Afgooye', 'Galkayo', 'Qoryooley', 'Bargal', 'Eyl', 'Guriel'],
  yemen: ['Sana\'a', 'Aden', 'Taiz', 'Al Hudaydah', 'Ibb', 'Dhamar', 'Al-Mukalla', 'Zinjibar', 'Saywun', 'Hajjah', 'Zabid', 'Bajil', 'Lahij', 'Al Bayda', 'Sa\'da'],
	algeria: ['Algiers', 'Oran', 'Constantine', 'Batna', 'Blida', 'Annaba', 'Setif', 'Sidi Bel Abbes', 'Skikda', 'Biskra', 'Tlemcen', 'Bejaia', 'Tebessa', 'Tiaret', 'El Oued'],
  bahrain: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', 'Aali', 'Isa Town', 'Sitra', 'Budaiya', 'Jidhafs', 'Al-Malikiyah', 'Adliya', 'Tubli', 'Juffair', 'Sanabis', 'Seef'],
  djibouti: ['Djibouti', 'Ali Sabieh', 'Tadjoura', 'Obock', 'Dikhil', 'Arta', 'Holhol', 'Galafi', 'Loyada', 'Oueda', 'Tew`echi', 'Assa-Gueyla', 'Goubetto', 'Balho', 'Randa'],
  egypt: ['Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'El-Mahalla El-Kubra', 'Asyut', 'Tanta', 'El-Faiyum', 'Ismailia', 'Minya', 'Zagazig', 'Damietta'],
  iraq: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf', 'Karbala', 'Kirkuk', 'Hilla', 'Dahuk', 'Rutba', 'Rania', 'Halabja', 'Ramadi', 'Tikrit', 'Kut'],
  jordan: ['Amman', 'Zarqa', 'Irbid', 'Ajloun', 'Jerash', 'Madaba', 'Mafraq', 'Karak', 'Maan', 'Tafila', 'Sahab', 'Salt', 'Balqa', 'Aqaba', 'Jarash'],
  kuwait: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Al Farwaniyah', 'Kufa', 'As Salimiyah', 'Sabah as Salim', 'Al Fahahil', 'Ar Rumaythiyah', 'Ar Riqqah', 'Salwa', 'Bayan', 'Al Fintas', 'Mubarak Al-Kabeer', 'Janub as Surrah'],
  lebanon: ['Beirut', 'Tripoli', 'Sidon', 'Tyre', 'Jounieh', 'Zahle', 'Batroun', 'Byblos', 'Aley', 'Baalbek', 'Jbeil', 'Chouf', 'Keserwan', 'Metn', 'Nabatieh'],
  libya: ['Tripoli', 'Benghazi', 'Misratah', 'Tarhuna', 'Al Khums', 'Az Zawiyah', 'Zawiya', 'Ajdabiya', 'Sabha', 'Sirte', 'Zliten', 'Al Jadid', 'Tobruk', 'Yafran', 'Nalut'],
  morocco: ['Casablanca', 'Rabat', 'Fes', 'Marrakesh', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Al Hoceima', 'Kenitra', 'Tetouan', 'Safi', 'El Jadida', 'Nador', 'Khouribga'],
  oman: ['Muscat', 'Salalah', 'Seeb', 'Sohar', 'Sur', 'Nizwa', 'Ibri', 'Ibra', 'Barka', 'Rustaq', 'Al Suwaiq', 'Bahla', 'Bidbid', 'Adam', 'Yanqul'],
  qatar: ['Doha', 'Al Rayyan', 'Umm Salal', 'Al Wakrah', 'Al Khor', 'Ash Shahaniyah', 'Dukhan', 'Al Wukayr', 'Al Ghuwariyah', 'Al Jumayliyah', 'Al Khawr', 'Madinat ash Shamal', 'Ar Rayyan Municipality', 'Al Daayen', 'Al Khisa'],
  saudi_arabia: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraidah', 'Khobar', 'Khamis Mushait', 'Abha', 'Hail', 'Najran', 'Yanbu', 'Al Kharj'],
  syria: ['Damascus', 'Aleppo', 'Homs', 'Latakia', 'Hama', 'Deir ez-Zor', 'Raqqa', 'Idlib', 'As-Suwayda', 'Tartus', 'Daraa', 'Al-Hasakah', 'Qamishli', 'Safita', 'Jableh'],
  tunisia: ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabes', 'Ariana', 'Nabeul', 'La Soukra', 'Kasserine', 'Medenine', 'Zarzis', 'Ben Arous', 'Monastir', 'Gafsa'],
  united_arab_emirates: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Al Ain', 'Fujairah', 'Umm Al Quwain', 'Khor Fakkan', 'Dibba Al-Fujairah', 'Dibba Al-Hisn', 'Adh Dhayd', 'Ar Ruways', 'Muzayri`', 'Al Fujairah City'],
  // USA
  united_states: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington'],
  // Europe
  albania: ['Tirana', 'Durres', 'Vlore'],
  andorra: ['Andorra la Vella', 'Encamp', 'Sant Julia de Loria'],
  austria: ['Vienna', 'Graz', 'Linz'],
  belarus: ['Minsk', 'Gomel', 'Mogilev'],
  belgium: ['Brussels', 'Antwerp', 'Ghent'],
  bosnia_and_herzegovina: ['Sarajevo', 'Banja Luka', 'Tuzla'],
  bulgaria: ['Sofia', 'Plovdiv', 'Varna'],
  croatia: ['Zagreb', 'Split', 'Rijeka'],
  cyprus: ['Nicosia', 'Limassol', 'Larnaca'],
  czech_republic: ['Prague', 'Brno', 'Ostrava'],
  denmark: ['Copenhagen', 'Aarhus', 'Odense'],
  estonia: ['Tallinn', 'Tartu', 'Narva'],
  finland: ['Helsinki', 'Espoo', 'Tampere'],
  france: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Etienne', 'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne'],
  germany: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Duisburg', 'Bochum', 'Wuppertal', 'Bielefeld', 'Mannheim', 'Karlsruhe', 'Münster', 'Wiesbaden', 'Augsburg', 'Gelsenkirchen', 'Mönchengladbach', 'Braunschweig', 'Chemnitz', 'Kiel', 'Aachen', 'Halle', 'Magdeburg', 'Freiburg', 'Krefeld', 'Lübeck', 'Oberhausen', 'Erfurt', 'Mainz', 'Rostock', 'Kassel', 'Hagen', 'Saarbrücken', 'Hamm', 'Potsdam', 'Mülheim', 'Leverkusen', 'Oldenburg', 'Neuss', 'Heidelberg', 'Paderborn', 'Darmstadt', 'Herne', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Fürth', 'Ulm', 'Heilbronn', 'Pforzheim', 'Göttingen', 'Bottrop', 'Trier', 'Recklinghausen', 'Reutlingen', 'Koblenz', 'Remscheid', 'Bergisch Gladbach', 'Bremerhaven', 'Jena', 'Gera', 'Erlangen', 'Moers', 'Siegen', 'Hildesheim', 'Salzgitter', 'Cottbus', 'Gießen', 'Gütersloh', 'Schwerin', 'Neuwied', 'Flensburg', 'Ludwigshafen', 'Lüneburg', 'Gladbeck', 'Velbert', 'Hattingen', 'Bünde', 'Bergheim', 'Göppingen', 'Düren', 'Alsdorf', 'Löhne', 'Gummersbach', 'Kerpen', 'Ahaus', 'Wesseling', 'Hückelhoven', 'Rheinberg', 'Selm', 'Vechta', 'Sulingen', 'Burgdorf', 'Lohne', 'Bramsche', 'Syke', 'Arnstadt', 'Mühlhausen', 'Bad Langensalza', 'Ilmenau', 'Sondershausen'],
	greece: ['Athens', 'Thessaloniki', 'Patras'],
  hungary: ['Budapest', 'Debrecen', 'Szeged'],
  iceland: ['Reykjavik', 'Kopavogur', 'Hafnarfjordur'],
  ireland: ['Dublin', 'Cork', 'Galway'],
  italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania', 'Venice', 'Verona', 'Messina', 'Padua', 'Trieste', 'Brescia', 'Parma', 'Taranto', 'Prato', 'Modena'],
  kosovo: ['Pristina', 'Prizren', 'Peja'],
  latvia: ['Riga', 'Daugavpils', 'Liepaja'],
  liechtenstein: ['Vaduz', 'Schaan', 'Triesen'],
  lithuania: ['Vilnius', 'Kaunas', 'Klaipeda'],
  luxembourg: ['Luxembourg City', 'Esch-sur-Alzette', 'Dudelange'],
  malta: ['Valletta', 'Birkirkara', 'Qormi'],
  moldova: ['Chisinau', 'Tiraspol', 'Balti'],
  monaco: ['Monaco-Ville', 'Monte Carlo', 'La Condamine'],
  montenegro: ['Podgorica', 'Niksic', 'Herceg Novi'],
  netherlands: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen'],
  north_macedonia: ['Skopje', 'Bitola', 'Kumanovo'],
  norway: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Porsgrunn', 'Kristiansand', 'Ålesund', 'Tønsberg'],
  poland: ['Warsaw', 'Krakow', 'Lodz', 'Wroclaw', 'Poznan', 'Gdansk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Katowice', 'Bialystok'],
  portugal: ['Lisbon', 'Porto', 'Amadora', 'Braga', 'Setubal', 'Coimbra', 'Funchal', 'Evora', 'Almada', 'Guimaraes'],
  romania: ['Bucharest', 'Cluj-Napoca', 'Timisoara', 'Iasi', 'Constanta', 'Craiova', 'Galati', 'Brasov', 'Ploiesti', 'Oradea'],
  russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk', 'Omsk', 'Samara', 'Rostov-on-Don', 'Ufa', 'Krasnoyarsk', 'Voronezh', 'Perm', 'Volgograd', 'Krasnodar', 'Saratov', 'Tyumen', 'Izhevsk', 'Ulyanovsk'],
  san_marino: ['San Marino', 'Borgo Maggiore', 'Domagnano'],
  serbia: ['Belgrade', 'Novi Sad', 'Nis'],
  slovakia: ['Bratislava', 'Kosice', 'Presov'],
  slovenia: ['Ljubljana', 'Maribor', 'Celje'],
  spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Malaga', 'Murcia', 'Palma de Mallorca', 'Las Palmas de Gran Canaria', 'Bilbao', 'Alicante', 'Cordoba', 'Valladolid', 'Vigo', 'Gijon', 'A Coruña', 'Granada', 'Santander', 'Pamplona'],
  sweden: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Vasteras', 'Orebro', 'Linkoping', 'Helsingborg', 'Jonkoping', 'Norrkoping'],
  switzerland: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne', 'Winterthur', 'St. Gallen', 'Lugano', 'Biel/Bienne'],
  ukraine: ['Kyiv', 'Kharkiv', 'Dnipro', 'Odessa', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol'],
  united_kingdom: ['London', 'Birmingham', 'Glasgow', 'Liverpool', 'Bristol', 'Manchester', 'Leeds', 'Sheffield', 'Edinburgh', 'Leicester', 'Coventry', 'Bradford', 'Cardiff', 'Belfast', 'Stoke-on-Trent', 'Wolverhampton', 'Nottingham', 'Plymouth', 'Southampton', 'Reading'],
};
const countrySelect = document.getElementById('country');
const citySelect = document.getElementById('city');
// When the user selects a country, populate the city select with the cities for that country
countrySelect.addEventListener('change', (event) => {
  const country = event.target.value;
  const cities = citiesByCountry[country] || [];

  // Clear the current options in the city select
  citySelect.innerHTML = '';

  // Add a new option for each city in the array
  cities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
});
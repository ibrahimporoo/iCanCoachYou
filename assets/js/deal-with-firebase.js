import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs,
	query, where,
	updateDoc, doc
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
    })
		pendingContent.innerHTML = '';
		fillInHTML(pendingCoaches, false);
  })
  .catch(err => {
    console.log(err.message);
  });


function fillInHTML(coaches, completed = true) {
	coaches.forEach(coach => {
		if(completed) {
			completedContent.innerHTML += `
				<div class="col-lg-4 col-md-6">
					<div class="member">
						<div class="pic"><img src=${coach.image} class="img-fluid" alt="Coach Image"></div>
						<div class="member-info">
							<div class="">
								<h5 class="text-center coach-answer">${coach.name}</h5>
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
							<span>hourly rate:-</span>
							<p class="coach-answer">${coach.pricing}</p>
							<span>session way:-</span>
							<p class="coach-answer">${coach.session_way}</p>
							<span>job summary is:-</span>
							<p class="coach-answer">${coach.summary}</p>
							<span>location:-</span>
							<p><span class="coach-answer">${coach.country}</span>/<span class="coach-answer">${coach.city}</span></p>
							<span>coach free time:-</span>
							<p class="coach-answer"${coach.coach_free_time}</p>
							<span>coach role model is:-</span>
							<p class="coach-answer">${coach.coach_role_model}</p>
							<span>coach objective life is:-</span>
							<p class="coach-answer">${coach.coach_objective_life}</p>
							<span>Coach Bank Infos:- </span>
							<p class="coach-answer">${coach.coach_bank_infos}</p>
							<span>English Skills:-</span>
							<p class="coach-answer">${coach.english_skills}</p>
							<div class="links">
								<a href="${coach.coach_calendly_link}" target="_blank">Calendly</a>
								<a href="${coach.cv_link}" target="_blank">Coach cv</a>
							</div>
							<div class="social">
								<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
								<a href="https://wa.me/${coach.whats_number}" target="_blank"><i class="bi bi-whatsapp"></i></a>
								<a href="mailto:${coach.mail}" target="_blank"><i class="bi bi-envelope"></i></a>
							</div>
							<i class="bi bi-gear-fill modify-btn"></i>
							<i class="bi bi-check2-square save" data-id="${coach.id}"></i>
							<button class="not-approve-btn" data-id="${coach.id}">don't approve</button>
						</div>
					</div>
				</div>
			`;
		} else {
			pendingContent.innerHTML += `
				<div class="col-lg-4 col-md-6">
					<div class="member">
						<div class="pic"><img src=${coach.image} class="img-fluid" alt="Coach Image"></div>
						<div class="member-info">
							<div class="">
								<h5 class="text-center coach-answer">${coach.name}</h5>
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
							<span>hourly rate:-</span>
							<p class="coach-answer">${coach.pricing}</p>
							<span>session way:-</span>
							<p class="coach-answer">${coach.session_way}</p>
							<span>job summary is:-</span>
							<p class="coach-answer">${coach.summary}</p>
							<span>location:-</span>
							<p><span class="coach-answer">${coach.country}</span>/<span class="coach-answer">${coach.city}</span></p>
							<span>coach free time:-</span>
							<p class="coach-answer"${coach.coach_free_time}</p>
							<span>coach role model is:-</span>
							<p class="coach-answer">${coach.coach_role_model}</p>
							<span>coach objective life is:-</span>
							<p class="coach-answer">${coach.coach_objective_life}</p>
							<span>Coach Bank Infos:- </span>
							<p class="coach-answer">${coach.coach_bank_infos}</p>
							<span>English Skills:-</span>
							<p class="coach-answer">${coach.english_skills}</p>
							<div class="links">
								<a href="${coach.coach_calendly_link}" target="_blank">Calendly</a>
								<a href="${coach.cv_link}" target="_blank">Coach cv</a>
							</div>
							<div class="social">
								<a href="${coach.SM_account}" target="_blank"><i class="bi bi-linkedin"></i></a>
								<a href="https://wa.me/${coach.whats_number}" target="_blank"><i class="bi bi-whatsapp"></i></a>
								<a href="mailto:${coach.mail}" target="_blank"><i class="bi bi-envelope"></i></a>
							</div>
							<i class="bi bi-gear-fill modify-btn"></i>
							<i class="bi bi-check2-square save" data-id="${coach.id}"></i>
							<button class="approve-btn" data-id="${coach.id}">approve</button>
						</div>
					</div>
				</div>
			`;
		}
	});
}
let coachesAnswers;
window.onload = () => {
	setTimeout(() => {
		// To Modify Coach's Infos.
		document.querySelectorAll('.member .modify-btn').forEach(btn => {
			btn.addEventListener('click', e => {
				console.log(e.target);
				console.log(e.target.parentElement);
				console.log(e.target.parentElement.querySelectorAll('.coach-answer'));
				e.target.parentElement.querySelectorAll('.coach-answer').forEach(p => {
					p.classList.add('edit');
					p.setAttribute('contenteditable', true);
				});
			});
		})
		// To Save Coach's Infos.
		document.querySelectorAll('.member .save').forEach(btn => {
			btn.addEventListener('click', e => {
				console.log(e.target);
				console.log(e.target.parentElement);
				console.log(e.target.parentElement.querySelectorAll('.coach-answer'));
				coachesAnswers = e.target.parentElement.querySelectorAll('.coach-answer');
				// Save Changes to every coach's answer.
				coachesAnswers.forEach(p => {
					p.classList.remove('edit');
					p.setAttribute('contenteditable', false);
				});
				// Updata Changes to firebase
				update(e.target, 'save');
			});
		})
		// Approve Coach
		document.querySelectorAll('.approve-btn').forEach(btn => {
			btn.addEventListener('click', e => {
				update(e.target, 'approve');
			});
		})
		// Don't Approve Coach
		document.querySelectorAll('.not-approve-btn').forEach(btn => {
			btn.addEventListener('click', e => {
				update(e.target, 'do-not-approve');
			});
		})
	}, 2000)
}

// Doc Updating 
function update(member, status) {

	let docRef = doc(db, 'coaches', 'languages', lang, member.dataset.id);
	switch(status) {
		case "save":
			updateDoc(docRef, {
				name: coachesAnswers[0].innerText,
				work_experience: coachesAnswers[1].innerText,
				college: coachesAnswers[2].innerText,
				graduation_year: coachesAnswers[3].innerText,
				age: coachesAnswers[4].innerText,
				gender: coachesAnswers[5].innerText,
				pricing: coachesAnswers[6].innerText,
				session_way: coachesAnswers[7].innerText,
				summary: coachesAnswers[8].innerText,
				country: coachesAnswers[9].innerText,
				city: coachesAnswers[10].innerText,
				coach_free_time: coachesAnswers[11].innerText,
				coach_role_model: coachesAnswers[12].innerText,
				coach_objective_life: coachesAnswers[13].innerText,
				coach_bank_infos: coachesAnswers[14].innerText,
				english_skills: coachesAnswers[15].innerText,
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
	}
}
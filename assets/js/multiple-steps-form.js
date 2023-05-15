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
		if (file.size > 1000000 && file.type.startsWith("image/")) {
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
};

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

function filterResults() {
	const selectedJobTitles = getSelectedItems(jobTitleFilter);
  const selectedspecialities = getSelectedItems(specialitiesFilter);
  const selectedCountries = getSelectedItems(countryFilter);
  const selectedGenders = getSelectedItems(genderFilter);
  const selectedYearsOfExperience = getSelectedItems(yearsOfExperienceFilter);
  const selectedModalities = getSelectedItems(modalityFilter);
  // const selectedYears = getSelectedItems(yearsOfExperienceFilter);

	console.log(selectedJobTitles);
	console.log(selectedspecialities);
	console.log(selectedCountries);
	console.log(selectedGenders);
	console.log(selectedYearsOfExperience);


	const filteredData = coaches.filter(coach =>

		(selectedJobTitles.length === 0 || selectedJobTitles.includes(coach.jobTitle.trim().toLowerCase())) &&
		(selectedCountries.length === 0 || selectedCountries.includes(coach.country.trim().toLowerCase())) &&
		(coach.gender && (selectedGenders.length === 0 || selectedGenders.includes(coach.gender.trim().toLowerCase()))) &&
		(selectedspecialities.length === 0 || selectedspecialities.includes(coach.industry.trim().toLowerCase())) &&
		(selectedModalities.length === 0 || selectedModalities.includes(coach.session_way.trim().toLowerCase()))

		)
	console.log("filtered Data.");
	console.log(filteredData);

  displayResults(filteredData);
};
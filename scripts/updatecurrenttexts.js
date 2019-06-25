
function updateTexts(currentGender, currentCountry){

    var currentGenderText = d3.select('#currentgendertext');
    var currentCountryText = d3.select('#currentcountrytext');

    currentGenderText.html(`Current gender: ${currentGender}`);
    currentCountryText.html(`Current country: ${currentCountry}`);
};

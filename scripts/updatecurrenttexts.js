
function updateTexts(currentGender, currentCountry){

    /* This is a function that updates the current country and current gender text in the navigation bar,
    so that the user can keep track of what he has clicked on.
    */

    var currentGenderText = d3.select('#currentgendertext');
    var currentCountryText = d3.select('#currentcountrytext');

    currentGenderText.html(`Current gender: ${currentGender}`);
    currentCountryText.html(`Current country: ${currentCountry}`);
};

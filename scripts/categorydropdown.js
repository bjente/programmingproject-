/* Javascript file to manage dropdown menu and buttons
   Name: Bente de Bruin
   Student number: 11017503 */


function dropDownChange(dataMapDonut, threeLetterCountry, worldCountries, startyear, endyear, dataArtist){

    /* This function keeps track of changes in the dropdown menu.
    If a change is noticed, we update the graphs
    */

    // If the value in dropdown menu changes, currentCategory changes.
    // We update all the graphs using this new category
    d3.select("select")
        .on("change",function(d){
         var selected = d3.select("#dropdown-menu").node().value;
         currentCategory = selected;
         updateMap(threeLetterCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut, worldCountries);
         updateDonut(currentCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut);
         updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
     });
};

function buttonClick(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries){

    /* This function notices when one of two resetbuttons is being clicked on.
    If so, we set the graphs to their default modes (= all countries, all genders)
    */

    var button = d3.select("#resetbutton")
    button.on("click", function(d){
        threeLetterCountry = 'All';
        currentCountry = 'All';
        currentCategory = getCurrentCategory();
        updateTexts(currentGender, currentCountry);
        updateMap(threeLetterCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut, worldCountries);
        updateDonut(threeLetterCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut);
        updateBubbles(gender, threeLetterCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
    });

    var buttonGender = d3.select("#resetbuttongenders")
    buttonGender.on("click", function(d){
        gender = 'All';
        currentGender = 'All';
        currentCategory = getCurrentCategory();
        updateTexts(currentGender, currentCountry);
        updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
    });
};

function getCurrentCategory(){

    /* In this function, we acquire the currentCategory in the dropdown menu.
    */

    var currentCategory = d3.select("#dropdown-menu").node().value;

return currentCategory
};

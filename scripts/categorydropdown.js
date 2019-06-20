/* Javascript file to manage dropdown menu and buttons
   Name: Bente de Bruin
   Student number: 11017503 */


function dropDownChange(dataMapDonut, threeLetterCountry, worldCountries, startyear, endyear, dataArtist){

   d3.select("select")
     .on("change",function(d){
       var selected = d3.select("#dropdown-menu").node().value;
       category = selected
       console.log( selected );

       updateMap(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries)
       updateDonut(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut)
       updateBubbles(gender, threeLetterCountry, dataArtist, startyear, endyear, category)
   })
}

function buttonClick(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries){
    var button = d3.select("#resetbutton")
     button.on("click", function(d){
         threeLetterCountry = 'All'
         currentCountry = 'All'
         var currentCategory = d3.select("#dropdown-menu").node().value
         updateMap(threeLetterCountry, currentCategory, startyear, endyear, dataArtist, dataMapDonut, worldCountries)
         updateDonut(threeLetterCountry, currentCategory, startyear, endyear, dataArtist, dataMapDonut)
         updateBubbles(gender, threeLetterCountry, dataArtist, startyear, endyear, category)
    })

    var buttonGender = d3.select("#resetbuttongenders")
        buttonGender.on("click", function(d){
            gender = 'All'
            currentCategory = d3.select("#dropdown-menu").node().value
            console.log('COUNTRY', currentCountry)
            updateBubbles(gender, currentCountry, dataArtist, startyear, endyear, currentCategory)
    })
}

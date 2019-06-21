/* Javascript file to manage dropdown menu and buttons
   Name: Bente de Bruin
   Student number: 11017503 */


function dropDownChange(dataMapDonut, threeLetterCountry, worldCountries, startyear, endyear, dataArtist){

   d3.select("select")
     .on("change",function(d){
       var selected = d3.select("#dropdown-menu").node().value;
       currentCategory = selected
       console.log( selected );
       console.log('dit is de category VOOR update map', currentCategory)
       updateMap(threeLetterCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut, worldCountries)
       updateDonut(currentCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut)
       // console.log("cur gen", currentGender)
       // console.log("cur coun", currentCountry)
       // console.log('dataart', dataArtist)
       // console.log('cur start', currentStartyear)
       // console.log('cur end', currentEndyear)
       // console.log('cur cat', currentCategory)
       updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory)
   })
}

function buttonClick(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries){
    var button = d3.select("#resetbutton")
     button.on("click", function(d){
         threeLetterCountry = 'All'
         currentCountry = 'All'
         currentCategory = getCurrentCategory()
         updateMap(threeLetterCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut, worldCountries)
         updateDonut(threeLetterCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut)
         updateBubbles(gender, threeLetterCountry, dataArtist, currentStartyear, currentEndyear, currentCategory)
    })

    var buttonGender = d3.select("#resetbuttongenders")
        buttonGender.on("click", function(d){
            gender = 'All'
            currentGender = 'All'
            currentCategory = getCurrentCategory()
            updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory)
    })
}

function getCurrentCategory(){

    var currentCategory = d3.select("#dropdown-menu").node().value

return currentCategory
}

/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

// Initialize values for initial graphs
var startyear = '1965';
var endyear = '2018';
var category = 'All categories';
var threeLetterCountry = 'All'
var gender = 'All'

// Initialize update values
var currentCountry = 'All'
var currentStartyear = '1965'
var currentEndyear = '2018'
var currentCategory = 'All categories'
var currentGender = 'All'

window.onload = function() {

  var newData = "../data/concfilesmapdonut.json"
  var newDataArtist = "../data/concfilesartist.json"
  var worldCountries = "../data/world_countries.json"
  var requests = [d3.json(newData), d3.json(worldCountries), d3.json(newDataArtist)];

  Promise.all(requests).then(function(response) {
    dataMapDonut = response[0]
    worldCountries = response[1]
    dataArtist = response[2]
    dropDownChange(dataMapDonut, threeLetterCountry, worldCountries, startyear, endyear, dataArtist)
    buttonClick(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries)
    drawSlider(threeLetterCountry, category, dataArtist, dataMapDonut, worldCountries)
    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, currentGender)
    var maxAmountAndSvg = drawMap(newData[1], newData[2], worldCountries, newData[3], dataMapDonut, dataArtist)
    drawInitialDonut(newData[4], newData[5], newData[6], newData[7])
    drawInitialBubble(newData[8], startyear, endyear, category)
    drawLegend(maxAmountAndSvg[0], maxAmountAndSvg[1], maxAmountAndSvg[2])

  })
  .catch(function(e){
      throw(e);
  })
};

/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

var startyear = '1965';
var endyear = '2018';
var category = 'All categories';
var threeLetterCountry = 'DEU'

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
    var maxAmountAndSvg = drawMap(dataMapDonut, worldCountries, startyear, endyear, category, dataArtist)

    drawLegend(maxAmountAndSvg[0], maxAmountAndSvg[1], maxAmountAndSvg[2])
    drawInitialDonut(maxAmountAndSvg[3], dataArtist, category)
    drawInitialBubble(dataArtist, startyear, endyear, category)
    createRangeSlider()
    // categorydropdown()
  })
  .catch(function(e){
      throw(e);
  })
};

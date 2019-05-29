/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

window.onload = function() {
  var data = "../data/newjson.json"
  var worldCountries = "../data/world_countries.json"
  var startyear = '1965';
  var endyear = '1985';
  var category = 'Architecture & Design';
  var requests = [d3.json(data), d3.json(worldCountries)];

  Promise.all(requests).then(function(response) {
    data = response[0]
    worldCountries = response[1]
    // hier filter functie aanroepen vanuit heatmap.js. waarden die je moet meegeven: minimum jaar, maximum jaar en categorie
    var finalDict = filterMapData(startyear, endyear, category, data)
    var maxAmountAndSvg = drawMap(finalDict, worldCountries)
    // var svg = drawMap(finalDict, worldCountries)[1]
    drawLegend(maxAmountAndSvg[0], maxAmountAndSvg[1], maxAmountAndSvg[2])
    createRangeSlider()
  })
  .catch(function(e){
      throw(e);
  })
};

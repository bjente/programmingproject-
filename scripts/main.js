/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

window.onload = function() {
  var data = "../data/newjson.json"
  var worldCountries = "../data/world_countries.json"
  var startyear = '1965';
  var endyear = '2018';
  var category = 'All categories';
  var requests = [d3.json(data), d3.json(worldCountries)];

  Promise.all(requests).then(function(response) {
    data = response[0]
    worldCountries = response[1]
    // hier filter functie aanroepen vanuit heatmap.js. waarden die je moet meegeven: minimum jaar, maximum jaar en categorie
    var finalDict = filterData(startyear, endyear, category, data)
    // var finalDict = filterMapData(startyear, endyear, category, data)
    var maxAmountAndSvg = drawMap(finalDict[0], worldCountries)
    // var svg = drawMap(finalDict, worldCountries)[1]
    drawLegend(maxAmountAndSvg[0], maxAmountAndSvg[1], maxAmountAndSvg[2])
    drawInitialDonut(finalDict[0], finalDict[1], finalDict[2], finalDict[3])
    // createRangeSlider()
    // var totals = filterDonutData(startyear, endyear, category, data, finalDict)
    // var amounts = calcAmounts(finalDict)
    // drawDonuts(finalDict[0], finalDict[1], finalDict[2], finalDict[3], maxAmountAndSvg[1])
    filterBubbleData(startyear, endyear, category, data)

  })
  .catch(function(e){
      throw(e);
  })
};

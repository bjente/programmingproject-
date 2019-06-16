/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

window.onload = function() {
  var newData = "../data/concfilesmapdonut.json"
  var newDataArtist = "../data/concfilesartist.json"
  var worldCountries = "../data/world_countries.json"
  var startyear = '1965';
  var endyear = '2018';
  var category = 'All categories';
  var requests = [d3.json(newData), d3.json(worldCountries), d3.json(newDataArtist)];

  Promise.all(requests).then(function(response) {
    dataMapDonut = response[0]
    worldCountries = response[1]
    dataArtist = response[2]

    var maxAmountAndSvg = drawMap(dataMapDonut, worldCountries, startyear, endyear, category)

    drawLegend(maxAmountAndSvg[0], maxAmountAndSvg[1], maxAmountAndSvg[2])
    drawInitialDonut(maxAmountAndSvg[3])
    drawInitialBubble(dataArtist, startyear, endyear, category)

  })
  .catch(function(e){
      throw(e);
  })
};

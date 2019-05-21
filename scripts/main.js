/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

window.onload = function() {
  var data = "../data/newjson.json"
  var startyear = '1935';
  var endyear = '2018';
  var category = 'All categories';
  var requests = [d3v5.json(data)];

  Promise.all(requests).then(function(response) {
    data = response[0]
    // hier filter functie aanroepen vanuit heatmap.js. waarden die je moet meegeven: minimum jaar, maximum jaar en categorie
    filterMapData(startyear, endyear, category, data)
  })
  .catch(function(e){
      throw(e);
  })
};

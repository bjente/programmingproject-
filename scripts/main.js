/* Name: Bente de Bruin
   Studentnumber: 11017503
*/

window.onload = function() {
  // var firsthalf = "../data/firsthalf.json"
  // var secondhalf = "../data/secondhalf.json"
  var firsthalf = "firsthalf.json"
  var secondhalf = "secondhalf.json"
  var requests = [d3.json(firsthalf), d3.json(secondhalf)];

  Promise.all(requests).then(function(response) {
    console.log(requests)
  })
  .catch(function(e){
      throw(e);
  })
};

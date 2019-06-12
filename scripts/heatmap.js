/* JavaScript program to draw heatmap
Name: Bente de Bruin
Studentnumber: 11017503
*/

// In deze functie maak ik de data klaar voor het goed weergeven van de worldmap
// function filterMapData(startyear, endyear, category, data) {
//
//   var listWithDicts = []
//
//   // werk ALLEEN met het gegeven start en end year en gekozen department
//   let actualData = {};
//
//   if (category !== 'All categories'){
//     for (let a in data){
//       // maak int van dateacquired en blijf binnen range van start en end en de gekozen department
//       if ((+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) && data[a]['Department'] === category){
//         actualData[a] = data[a];
//         }
//       }
//     }
//   else {
//     for (let a in data){
//       if (+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) {
//         actualData[a] = data[a];
//       }
//     }
//   };
//   for (artwork in actualData){
//
//     // eerst alle landen die we nu al hebben opgeslagen in een lijst zetten
//     allcountries = []
//     for (i = 0; i < listWithDicts.length; i++) {
//       allcountries.push(listWithDicts[i].Nationality.trim())
//     };
//
//     // als huidige nationality nog niet in allcountries staat, maken we een nieuwe dict en stoppen
//     // we deze in listWithDicts
//     if (!(allcountries.indexOf(data[artwork].Nationality.trim()) >= 0)){
//       var countryDict = {};
//       countryDict.Nationality = data[artwork].Nationality.trim();
//       // countryDict.Artist = data[artwork].Artist.trim()
//       countryDict.Count = 1;
//       countryDict.Males = 0;
//       countryDict.Females = 0;
//       countryDict.Unknown = 0;
//       listWithDicts.push(countryDict);
//     }
//     // als de nationality er al wel in staat, verhogen we de count met 1
//     else {
//       for (i = 0; i < listWithDicts.length; i++) {
//         if (listWithDicts[i].Nationality === data[artwork].Nationality.trim()) {
//           listWithDicts[i].Count += 1;
//         }
//       }
//     };
//   };
//   // check of er meerdere nationaliteiten in een nationaliteit zitten
//   // n is elke individuele nationaliteit in nationalities
//   // je loopt over elke individuele nationaliteit met nationalities.forEach(function(n))
//   // Daarna kijk je per kunstwerk(= singleNat) (nationaliteit van het kunstwerk = singleNat.Nationality)
//   // in de listWithDicts of dit gelijk is aan n. Als dat zo is tel je het aandeel van die nationaliteit van het totaal
//   // nationailteiten VAN het kunstwerk op bij de count van dat land in listWithDicts
//   listWithDicts.forEach(function(potentialMultipleNat){
//
//     let nationalities = potentialMultipleNat.Nationality.split(" ");
//
//     if (nationalities.length > 1){
//       nationalities.forEach(function(n){
//
//         listWithDicts.forEach(function(singleNat){
//           if (singleNat.Nationality === n) {
//             singleNat.Count += potentialMultipleNat.Count/nationalities.length;
//             singleNat.Count = Math.round(singleNat.Count * 100) / 100;
//           }
//         })
//       })
//     }
//   })
//
//   // verwijder dubbele nationaliteiten uit listWithDicts
//   var finalListWithDicts = []
//   listWithDicts.forEach(function(potentialMultipleNat){
//     let nationalities = potentialMultipleNat.Nationality.split(" ");
//     if ((nationalities.length === 1) && potentialMultipleNat.Nationality !== 'unknown'){
//       finalListWithDicts.push(potentialMultipleNat);
//     }
//   })
//   return finalListWithDicts
// };

function drawMap(finalDict, worldCountries, artistDict) {

  var allAmounts = []
  finalDict.forEach(function(d){
    allAmounts.push(d.Count)
  })

  var maxAmount = Math.max.apply(Math, allAmounts);

  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Amount of works: </strong><span class='details'>" + format(d.Count) +"</span>";
              })

  var margin = {top: 0, right: 0, bottom: 0, left: -100},
              width = 1000 - margin.left - margin.right,
              height = 600 - margin.top - margin.bottom;

  var superMax = 8083;

  function convert(x){

    return Math.round(x / superMax * maxAmount);
  }
  // als het resultaat van de convert 0 is, dan maakt d3 daar geen ticks voor want dan zouden er meerdere ticks met 0 waarde hebben dus dat maakt geen sense
  // dit komt omdat de domains heel erg verschillen als je de jaren aanpast, domain van 1965-2018 is heel groot in vergelijking met 1965-1985 WHAT TO DO
  var color = d3.scaleThreshold()
      .domain([0,convert(100),convert(200),convert(300),convert(400),convert(500),convert(1000),convert(2500),maxAmount])
      .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);

  var path = d3.geoPath();

  var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append('g')
              .attr('class', 'map');

  var projection = d3.geoMercator()
                     .scale(115)
                    .translate( [width / 1.8, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  svg.call(tip);

  var worksPerCountry = {};
  finalDict.forEach(function(d) { worksPerCountry[d.Nationality] = +d.Count; });
  worldCountries.features.forEach(function(d) {
    if (d.id in worksPerCountry){
      d.Count = worksPerCountry[d.id]}
    else {
      d.Count = 0
    }
  });

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(worldCountries.features)
    .enter().append("path")
      .attr("d", path)
      // HIER ADD IK DIE ID MAAR WAT MOET IK DAARMEE?
      .attr("id", function(d){return d.id})
      .style("fill", function(d) {if(d.Count === 0){return 'white'}else{return color(worksPerCountry[d.id])}})
      .style('stroke', 'black')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","black")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);
          d3.select(this)
            .style("opacity", 1)
            .style("stroke","#004529")
            .style("stroke-width",2);
        })
        .on('click', function(d){
          updateDonut(finalDict, d.id)
          updateBubbles(artistDict, d.id)
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","black")
            .style("stroke-width",0.3);
        });

  svg.append("path")
      .datum(topojson.mesh(worldCountries.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);


  return [maxAmount, svg, allAmounts]
};

function drawLegend(maxAmount, svg, allAmounts) {

  // LEGEND NOG AANPASSEN ALS ER ANDERE JAREN OF CATEGORIEEN ZIJN
  var marginLegend = 80;
  var height = 550;
  var width = 25;
  var heightRect = height / 9

  var superMax = 8083;

  function convert(x){
    return Math.round(x / superMax * maxAmount);
  }


    var color = d3.scaleThreshold()
        .domain([0,convert(100),convert(200),convert(300),convert(400),convert(500),convert(1000),convert(2500),maxAmount])
        .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);


  var legend = svg.selectAll('.legend')
                  .data(color.domain())
                  .enter()
                  .append('g')
                  .attr('class', 'legend')
                  .attr('transform', function(d, i) {return 'translate(' + marginLegend + ',' + ((i * (heightRect)) + 20) + ')'; });


      legend.append('rect')
            .attr('x', 0)
            .attr('width', width)
            .attr('height', heightRect)
            .style('fill', function(d, i) {return color(d)});


  var yScale = d3.scaleLinear()
          .range([0, heightRect, (heightRect * 2), (heightRect * 3), (heightRect * 4), (heightRect * 5), (heightRect * 6), (heightRect * 7), (heightRect * 8)])
          .domain([0,convert(100),convert(200),convert(300),convert(400),convert(500),convert(1000),convert(2500),maxAmount])

  var yAxis = d3.axisLeft()
          .scale(yScale)
          .ticks(9)
          .tickValues([0,convert(100),convert(200),convert(300),convert(400),convert(500),convert(1000),convert(2500),maxAmount]);


  svg.append('g')
     .attr('class', 'y axis')
     .attr('transform', 'translate(' + marginLegend + ',' +  '20)')
     .call(yAxis)


  svg.append('g')
     .append('text')
     .attr('class', 'legend-text-map')
     .attr('y', marginLegend - 39)
     .attr('x', - height / 1.7)
     .attr('transform', 'rotate(-90)')
     .text('← More works')
     .attr("font-family", "Helvetica")

};
function createRangeSlider() {


}

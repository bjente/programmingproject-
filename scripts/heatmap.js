/* JavaScript program to draw heatmap
Name: Bente de Bruin
Studentnumber: 11017503
*/

//In deze functie maak ik de data klaar voor het goed weergeven van de worldmap
function filterMapData(startyear, endyear, category, data) {
  var listWithDicts = []
  var count = 0

  // werk ALLEEN met het gegeven start en end year en gekozen department
  let actualData = {};

  if (category !== 'All categories'){
    for (let a in data){
      // maak int van dateacquired en blijf binnen range van start en end en de gekozen department
      if ((+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) && data[a]['Department'] === category){
        actualData[a] = data[a];
        }
      }
    }
  else {
    for (let a in data){
      if (+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) {
        actualData[a] = data[a];
      }
    }
  };

  for (artwork in actualData){

    // eerst alle landen die we nu al hebben opgeslagen in een lijst zetten
    allcountries = []
    for (i = 0; i < listWithDicts.length; i++) {
      allcountries.push(listWithDicts[i].Nationality.trim())
    };

    // als huidige nationality nog niet in allcountries staat, maken we een nieuwe dict en stoppen
    // we deze in listWithDicts
    if (!(allcountries.indexOf(data[artwork].Nationality.trim()) >= 0)){
      var countryDict = {};
      countryDict.Nationality = data[artwork].Nationality.trim();
      countryDict.Count = 1;
      listWithDicts.push(countryDict);
    }
    // als de nationality er al wel in staat, verhogen we de count met 1
    else {
      for (i = 0; i < listWithDicts.length; i++) {
        if (listWithDicts[i].Nationality === data[artwork].Nationality.trim()) {
          listWithDicts[i].Count += 1;
        }
      }
    };
  };

  // check of er meerdere nationaliteiten in een nationaliteit zitten
  // n is de elke individuele nationaliteit in nationalities
  // je loopt over elke individuele nationaliteit met nationalities.forEach(function(n))
  // Daarna kijk je per kunstwerk(= singleNat) (nationaliteit van het kunstwerk = singleNat.Nationality)
  // in de listWithDicts of dit gelijk is aan n. Als dat zo is tel je het aandeel van die nationaliteit van het totaal
  // nationailteiten VAN het kunstwerk op bij de count van dat land in listWithDicts
  listWithDicts.forEach(function(potentialMultipleNat){

    let nationalities = potentialMultipleNat.Nationality.split(" ");

    if (nationalities.length > 1){
      nationalities.forEach(function(n){

        listWithDicts.forEach(function(singleNat){
          if (singleNat.Nationality === n) {
            singleNat.Count += potentialMultipleNat.Count/nationalities.length;
            singleNat.Count = Math.round(singleNat.Count * 100) / 100;
          }
        })
      })
    }
  })

  // verwijder dubbele nationaliteiten uit listWithDicts
  var finalListWithDicts = []
  listWithDicts.forEach(function(potentialMultipleNat){
    let nationalities = potentialMultipleNat.Nationality.split(" ");
    if ((nationalities.length === 1) && potentialMultipleNat.Nationality !== 'unknown'){
      finalListWithDicts.push(potentialMultipleNat);
    }
  })
  return finalListWithDicts
};

function drawMap(finalDict, worldCountries) {

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

  var color = d3.scaleThreshold()
      .domain([0,10,50,100,500,1000,2000,3000,maxAmount])
      .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529']);


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
      d.Count = worksPerCountry[d.id] }
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
      .style("fill", function(d) {return color(worksPerCountry[d.id]); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

  svg.append("path")
      .datum(topojson.mesh(worldCountries.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

  return [maxAmount, svg]
};

function drawLegend(maxAmount, svg) {
  // LEGEND NOG AANPASSEN ALS ER ANDERE JAREN OF CATEGORIEEN ZIJN
  var marginLegend = 50;
  var height = 550;
  var width = 25;
  var heightRect = height / 9

  // Define legend color
  var color = d3.scaleThreshold()
                .domain([0, 10, 50, 100, 250, 500, 1000, 2500, maxAmount])
                .range(['#004529','#006837', '#238443', '#41ab5d', '#78c679', '#addd8e', '#d9f0a3', '#f7fcb9', '#ffffe5'])



  // Append legend to svg
  var legend = svg.selectAll('.legend')
                  .data(color.domain())
                  .enter()
                  .append('g')
                  .attr('class', 'legend')
                  .attr('transform', function(d, i) { return 'translate(' + marginLegend + ',' + ((i * (heightRect)) + 20) + ')'; });

  // Draw legend colored rectangles
      legend.append('rect')
            .attr('x', 0)
            .attr('width', width)
            .attr('height', heightRect)
            .style('fill', color);

  // Set y scale
  var yScale = d3.scaleLinear()
          // Set range manually because scale is not linear
          .range([0, heightRect, (heightRect * 2), (heightRect * 3), (heightRect * 4), (heightRect * 5), (heightRect * 6), (heightRect * 7), (heightRect * 8), height])
          .domain([maxAmount, 2500, 1000, 500, 250, 100, 50, 10, 5, 0]);

  // Scale y axis
  var yAxis = d3.axisLeft()
          .scale(yScale)
          // Set ticks and tick values for these specific values
          .ticks(9)
          .tickValues([0, 5, 10, 50, 100, 250, 500, 1000, 2500, maxAmount]);

  // Draw axis next to legend
  svg.append('g')
     .attr('class', 'y axis')
     .attr('transform', 'translate(' + marginLegend + ',' +  '20)')
     .call(yAxis)

  // Add text to legend
  svg.append('g')
     .append('text')
     .attr('class', 'legend-text-map')
     .attr('y', marginLegend - 39)
     .attr('x', - height / 1.7)
     .attr('transform', 'rotate(-90)')
     .text('More works →')
     .attr("font-family", "Helvetica")

}

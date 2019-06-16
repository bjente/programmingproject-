/* JavaScript program to draw heatmap
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawMap(dataMapDonut, worldCountries, startyear, endyear, category) {

  var values = []

  if(category !== 'All categories'){

    for(var key in dataMapDonut){

      if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear && dataMapDonut[key].department === category){
        values.push(dataMapDonut[key].values)
      }
  }
}
  else{
    for(var key in dataMapDonut){
      if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear){
        values.push(dataMapDonut[key].values)
      }
    }
  }
  var worksPerCountry = {};
  var allAmounts = []

  values.forEach(function(d){
    d.forEach(function(e){
      if (e.Nationality in worksPerCountry){
        worksPerCountry[e.Nationality] += +e.Count
        allAmounts.push(worksPerCountry[e.Nationality])
      }
      else {
        worksPerCountry[e.Nationality] = +e.Count
        allAmounts.push(worksPerCountry[e.Nationality])
      }
    })
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


  worldCountries.features.forEach(function(d){
    if (d.id in worksPerCountry){
      d.Count = worksPerCountry[d.id]
    }
    else {
      d.Count = 0
    }
  })


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
          updateDonut(values, d.id)
          updateBubblesMap(values, d.id)
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


  return [maxAmount, svg, allAmounts, values]
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

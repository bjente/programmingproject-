/* JavaScript program to draw heatmap
Name: Bente de Bruin
Studentnumber: 11017503
*/
var legendHeight = 550;
var marginLegend = 80;
var superMax = 8083;

function drawMap(worksPerCountry, maxAmount, worldCountries, allAmounts) {

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

// function convert(x){
// return Math.round(x / superMax * maxAmount);
// }

var newLegendValues = makeNewLegendValues(maxAmount)
var newDomain = newLegendValues[0]
var newRange = newLegendValues[1]
var newColorRange = newLegendValues[2]


var color = d3.scaleThreshold()
    .domain(newDomain)
    .range(newColorRange);

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
else{
    d.Count = 0
    }
})

svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(worldCountries.features)
    .enter().append("path")
        .attr('class', "pathcountries")
        .attr("d", path)
        .attr("id", function(d){return d.id})
        .style("fill", function(d) {
            if(d.Count === 0){ return 'white'}
            else{ return color(worksPerCountry[d.id])}})
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
    currentCountry = d.id
    updateDonut(currentCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut)
    updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory)
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

function convert(x, maxAmount){
return Math.round(x / superMax * maxAmount);
}

function drawLegend(maxAmount, svg, allAmounts) {

var newLegendValues = makeNewLegendValues(maxAmount)
var newDomain = newLegendValues[0]
var newRange = newLegendValues[1]
var newColorRange = newLegendValues[2]
var heightRect = newLegendValues[3]
var legendWidth = 25;

var color = d3.scaleThreshold()
    .domain(newDomain)
    .range(newColorRange);

var legend = svg.selectAll('.legend')
      .data(newDomain)
      .enter()
      .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {return 'translate(' + marginLegend + ',' + ((i * (heightRect)) + 20) + ')'; });


legend.append('rect')
    .attr('x', 0)
    .attr('width', legendWidth)
    .attr('height', heightRect)
    .style('fill', function(d, i) {return color(d)});


var yScale = d3.scaleLinear()
    .range([d3.min(newRange), d3.max(newRange)])
    .domain([d3.min(newDomain), d3.max(newDomain)])


svg.append('g')
    .call(d3.axisLeft(yScale))
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + marginLegend + ', 20)')


svg.append('g')
    .append('text')
        .attr('class', 'legend-text-map')
        .attr('y', marginLegend - 39)
        .attr('x', - legendHeight / 1.7)
        .attr('transform', 'rotate(-90)')
        .text('← More works')
        .attr("font-family", "Helvetica")

};

function updateMap(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries){


    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, currentGender)
    var worksPerCountry = newData[1]
    var maxAmount = newData[2]
    var allAmounts = newData[3]
    var path = d3.geoPath();
    var newLegendValues = makeNewLegendValues(maxAmount)
    var newDomain = newLegendValues[0]
    var newRange = newLegendValues[1]
    var newColorRange = newLegendValues[2]

    var color = d3.scaleThreshold()
        .domain(newDomain)
        .range(newColorRange);

    // updates legend
    var newYScale = d3.scaleLinear()
        .range([d3.min(newRange), d3.max(newRange)])
        .domain([d3.min(newDomain), d3.max(newDomain)])

    d3.select(".y-axis")
        .transition().duration(1000)
        .call(d3.axisLeft(newYScale)
        .tickValues(newDomain))

    d3.select(".legend")
        .data(newDomain)
        .selectAll('rect')


    // updates worldmap
    worldCountries.features.forEach(function(d){
        if (d.id in worksPerCountry){
            d.Count = worksPerCountry[d.id]
        }
    else{
        d.Count = 0
        }
    })

var countries = d3.selectAll(".pathcountries")

countries
    .style("fill", function(d) {
        if(d.Count === 0){ return 'white'}
        else{ return color(worksPerCountry[d.id])}})
}

function makeNewLegendValues(maxAmount){

    var newDomain = []
    var newRange = []
    var oldColorRange = ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']
    var newColorRange = []

    if(maxAmount >= 9){
        var numberOfRects = 9
    } else{
        var numberOfRects = maxAmount
    }
    var heightRect = legendHeight / numberOfRects

    for(var i = 0; i <= numberOfRects; i++){
        newDomain.push((maxAmount / numberOfRects) * i)
        newRange.push(heightRect * i)
        newColorRange.push(oldColorRange[i])
    }
    return[newDomain, newRange, newColorRange, heightRect]
}

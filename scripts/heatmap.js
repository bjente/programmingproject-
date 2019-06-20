/* JavaScript program to draw heatmap
Name: Bente de Bruin
Studentnumber: 11017503
*/

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
    // In updatedonut dan weer filterdata aanroepen en daarmee nieuwe donut tekenen
    // en hetzelfde geldt voor bubblemap
    // ik kan dus filterdata aanroepen vanuit elke update functie en met die nieuwe data het nieuwe figuur tekenen!!!
    currentCountry = d.id
    updateDonut(d.id, category, startyear, endyear, dataArtist, dataMapDonut)
    console.log('gendertjeee', gender)
    updateBubbles(gender, d.id, dataArtist, startyear, endyear, category)
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
var height = 550;
var width = 25;
var heightRect = height / 9

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

var dataTime = d3.range(0, 9).map(function(d) {
return new Date(1965 + d, 10, 4);
});

var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(100 * 60 * 60 * 24 * 365)
    .width(300)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1998, 10, 4))
    .on('onchange', val => {
        d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
    });

var gTime = d3
    .select('#slider-time')
    .attr('id', 'rangeslider')
    .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(' + (marginLegend + 100) + ',30)');

gTime.call(sliderTime);

d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
}

function updateMap(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries){

    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut)
    var worksPerCountry = newData[1]
    var maxAmount = newData[2]
    var allAmounts = newData[3]

    var path = d3.geoPath();

    function convert(x){
    return Math.round(x / superMax * maxAmount);
    }

    var color = d3.scaleThreshold()
        .domain([0,convert(100),convert(200),convert(300),convert(400),convert(500),convert(1000),convert(2500),maxAmount])
        .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);

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

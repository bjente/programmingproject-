/* JavaScript program to draw heatmap,
update heatmap and draw and update corresponding legend.
Name: Bente de Bruin
Studentnumber: 11017503
*/

var legendHeight = 600;
var marginLegend = 80;
var superMax = 8083;

function drawMap(worksPerCountry, maxAmount, worldCountries, allAmounts) {

    /* In this function, the initial worldmap is drawn.
    Source: https://bl.ocks.org/piwodlaiwo/3734a1357696dcff203a94012646e932
    */

    var format = d3.format(",");

    // Set tooltips
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Amount of works: </strong><span class='details'>" + format(d.Count) +"</span>";
        });

    // Set margin
    var margin = {top: 0, right: 0, bottom: 0, left: -100},
        width = document.getElementById("heatmap").clientWidth,
        height = 725 - margin.top - margin.bottom;


    // Create values needed for drawing legend
    var newLegendValues = makeNewLegendValues(maxAmount);
    var newDomain = newLegendValues[0];
    var newRange = newLegendValues[1];
    var newColorRange = newLegendValues[2];

    // Define colors for countries according to domain
    var color = d3.scaleThreshold()
        .domain(newDomain)
        .range(newColorRange);

    var path = d3.geoPath();

    // Create SVG for map
    var svg = d3.select("#heatmap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map');

    var projection = d3.geoMercator()
        .scale(160)
        .translate( [width / 2, height / 1.5]);

    var path = d3.geoPath()
        .projection(projection);

    svg.call(tip);

    // Assign proper value to d.id, d.id being three letters that represent a specific country
    // d.Count represents amount of works per country
    worldCountries.features.forEach(function(d){
        if (d.id in worksPerCountry){
            d.Count = worksPerCountry[d.id];
        }
        else{
            d.Count = 0;
        }
    });

    // Append g, draw countries, fill country according to amount of works they have
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(worldCountries.features)
        .enter().append("path")
        .attr('class', "pathcountries")
        .attr("d", path)
        .attr("id", function(d){
            return d.id})
            .style("fill", function(d){
                if(d.Count === 0){
                    return 'white'}
                else{
                    return color(worksPerCountry[d.id])}})
        .style('stroke', 'black')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)

        // Show tooltip
        .style("stroke","black")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
                .style("opacity", 1)
                .style("stroke","#004529")
                .style("stroke-width",2);
            })

        // When a country is being clicked on, donutchart and bubblechart need to update, they only show data from that specific country
        // set currentCountry to current d.id, so it is updated in the whole program
        .on('click', function(d){
            if(d.Count > 0){
                currentCountry = d.id;
                updateTexts(currentGender, currentCountry);
                updateDonut(currentCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut);
                updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
            };
        })

        // Hide tooltip
        .on('mouseout', function(d){
            tip.hide(d);

        d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","black")
            .style("stroke-width",0.3);
        });

    svg.append("path")
        .datum(topojson.mesh(worldCountries.features, function(a, b){
            return a.id !== b.id; }))
        .attr("class", "names")
        .attr("d", path);

    return [maxAmount, svg, allAmounts]
};

function drawLegend(maxAmount, svg, allAmounts) {

    /* In this function, the initial legend corresponding to the initial worldmap is drawn.
    */

    // Create variables to create values for domain and range of legend
    var newLegendValues = makeNewLegendValues(maxAmount);
    var newDomain = newLegendValues[0];
    var newRange = newLegendValues[1];
    var newColorRange = newLegendValues[2];
    var heightRect = newLegendValues[3];
    var legendWidth = 25;

    // Define colors for legend
    var color = d3.scaleThreshold()
        .domain(newDomain)
        .range(newColorRange);

    // Attach domain to legend, append rects
    var legend = svg.selectAll('.legend')
        .data(newDomain)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i){
            return 'translate(' + marginLegend + ',' + ((i * (heightRect)) + 20) + ')'; });

    legend.append('rect')
        .attr('x', 0)
        .attr('width', legendWidth)
        .attr('height', heightRect)
        .style('fill', function(d, i){
            return color(d)});

    // Define y scale
    var yScale = d3.scaleLinear()
        .range([d3.min(newRange), d3.max(newRange)])
        .domain([d3.min(newDomain), d3.max(newDomain)]);

    // Make y axis with new domain as ticks
    svg.append('g')
        .call(d3.axisLeft(yScale)
        .tickValues(newDomain))
        .attr('class', 'y-axis')
        .attr('transform', 'translate(' + marginLegend + ', 20)');

    // Append text to legend
    svg.append('g')
        .append('text')
        .attr('class', 'legend-text-map')
        .attr('y', marginLegend - 39)
        .attr('x', - legendHeight / 1.7)
        .attr('transform', 'rotate(-90)')
        .text('← More works')
        .attr("font-family", "Helvetica");
};

function updateMap(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, worldCountries){

    /* In this function, the map and its corresponding legend are updated.
    */

    // First filterData is called, it filters out data we don't need
    // Below, we acquire needed data to draw new map and legend
    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, currentGender);
    var worksPerCountry = newData[1];
    var maxAmount = newData[2];
    var allAmounts = newData[3];

    var newLegendValues = makeNewLegendValues(maxAmount);
    var newDomain = newLegendValues[0];
    var newRange = newLegendValues[1];
    var newColorRange = newLegendValues[2];
    var path = d3.geoPath();

    var color = d3.scaleThreshold()
        .domain(newDomain)
        .range(newColorRange);

    // Range and domain of y-axis change according to new data
    var newYScale = d3.scaleLinear()
        .range([d3.min(newRange), d3.max(newRange)])
        .domain([d3.min(newDomain), d3.max(newDomain)]);

    var heatmapSelect = d3.select("#heatmap").select("svg");

    // Make sure there IS a new domain, if there is no data, there is no domain
    // Only draw new y-axis of legend if there is a new domain
    if(newDomain.length !== 0){
        // Add a transition to the y-axis and change tickvalues to new domain
        heatmapSelect.select(".y-axis")
            .transition().duration(1000)
            .call(d3.axisLeft(newYScale)
            .tickValues(newDomain));
    }

    // Iterate over worldCountries id's, check if id exists in new data
    // if so, amount of works of that specific country is d.Count
    worldCountries.features.forEach(function(d){
        if (d.id in worksPerCountry){
            d.Count = worksPerCountry[d.id];
        }
        else{
            d.Count = 0;
        }
    });

    // Select countries and change their color corresponding to new data
    var countries = d3.selectAll(".pathcountries");

    countries
        .style("fill", function(d) {
            if(d.Count === 0){
                return 'white'}
            else{
                return color(worksPerCountry[d.id])}
            });
};

function makeNewLegendValues(maxAmount){

    /* This is a function that calculates a new domain, range and a new color range for the legend and the map
    */

    // newColorRange is used to color countries
    var newDomain = [];
    var newRange = [];
    var oldColorRange = ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929'];
    var newColorRange = [];

    // Height of rects is defined by dividing the height of the legend by the amount of rects
    if(maxAmount >= 9){
        var numberOfRects = 9;
    }
    else{
        var numberOfRects = maxAmount;
    };

    var heightRect = legendHeight / numberOfRects;

    // Domain changes according to new maximum amount
    // We divide the amount of rectangles by the max amount and multiply this by the index of the rectangle
    // This provides the new  domain
    for(var i = 0; i <= numberOfRects; i++){
        newDomain.push((maxAmount / numberOfRects) * i);
        newRange.push(heightRect * i);
        newColorRange.push(oldColorRange[i]);
    };

    return[newDomain, newRange, newColorRange, heightRect]
};

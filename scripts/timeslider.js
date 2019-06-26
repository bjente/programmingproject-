/* Javascript file to manage dropdown menu and buttons
   Name: Bente de Bruin
   Student number: 11017503 */

function drawSlider(threeLetterCountry, category, dataArtist, dataMapDonut, worldCountries){

    /* In this function, a two-handled time slider with a specific range is created.
    Due to the 'marks' attribute, it only stops at the defined sliderYears.
    When one handle is released, the map, the donutchart and the bubble chart are being updated.
    Source: https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
    */

// Define years where slider can stop.
// Make width of the slider the same as the width of the map.
var sliderYears = [1965, 1975, 1985, 1995, 2005, 2015, 2016, 2017, 2018]
var width = document.getElementById("slidermap").clientWidth
var paddingLeft = 150

var sliderSimple = d3
    .sliderBottom()
    .min(d3.min(sliderYears))
    .max(2018)
    .width(width - paddingLeft)
    .ticks(53)
    .tickFormat(d3.format('d'))
    .marks(sliderYears)
    .fill('#4a9e5c')
    .default([d3.min(sliderYears),d3.max(sliderYears)])
    .on('onchange', val => {
        d3.select('p#value-range').text(val.map(d3.format('d')).join('-'));
        })
    .on('end', function(values){
        startyear = values[0];
        endyear = values[1];
        currentCategory = d3.select("#dropdown-menu").node().value;
        currentStartyear = values[0];
        currentEndyear = values[1];
        updateMap(currentCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut, worldCountries);
        updateDonut(currentCountry, currentCategory, currentStartyear, currentEndyear, dataArtist, dataMapDonut);
        updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
    });

var gSimple = d3
    .select('div#slider-range')
    .append('svg')
        .attr('width', width)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(115,10)');

gSimple.call(sliderSimple);

// Rotate text ticks 90 degrees so that they are readable.
var ticks = d3
    .select('#slider-range').selectAll('text')
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");
};

/* JavaScript program to draw  and update donut chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialDonut(donutValues, totalMales, totalFemales, totalUnknown){

    /* This is a function that draws the initial donut chart with the default data.
    Default data being all countries, all categories, all years.
    */

    // Set margin, width, height and radius for svg and circle
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        w = 500 - margin.right - margin.left,
        h = 500 - margin.top - margin.bottom,
        radius = w/2;

    data = [{"category": "Male", "amount": totalMales}, {"category": 'Female', "amount": totalFemales}, {"category": 'Unknown', "amount": totalUnknown}]

    var color = d3.scaleOrdinal()
        .range(["#5f93ef", "#f1b7ff", "black"]);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.amount});

    // Make div foor tooltips
    var tooltip = d3.select("body")
        .append("div")
            .attr('id', 'donuttip')

    var arc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 80);

    var labelArc = d3.arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 60);

    // Create svg for donutchart
    var svg2 = d3.select("#donut")
        .append("svg")
            .attr("id", 'donutchart')
            .attr("class", "pie")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    // Create paths according to data.amount
    // Create hover events to show and hide tooltip
    // When a path is clicked on, we update the current texts in the navigation bar and the bubblechart according to current gender.
    var g = svg2.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
            .attr("class", "arc")

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i){
            return color(i)
            })
        .on("mouseover", function(d) {
            tooltip.text(d.data.category + " " + "artists" + " " + "Amount of works:" + " " + d.data.amount);
            tooltip.style("visibility", "visible");
        })
        .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
        .on('click', function(d){
            currentGender = d.data.category;
            updateTexts(currentGender, currentCountry);
            updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
        });

    // Create legend for donut chart
    var legendG = svg2.selectAll(".legend")
        .data(pie(data))
        .enter().append("g")
            .attr("transform", function(d,i){
                return "translate(" + -20 + "," + (i * 25 - 35) + ")";
            })
        .attr("class", "legend");

    legendG
        .append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("stroke", "#ffffe5")
            .attr("stroke-width", "2px");

    legendG
        .append("text")
            .text(function(d){
                return d.data.category;
            })
            .style("font-size", 12)
            .attr("y", 9)
            .attr("x", 20);
    };

function updateDonut(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut){

    /* In this function, donut charts are updated if the user clicked a country, changed the time period or chose a category.
    */

    // Pass data to the filterdata function, it returns the new amount of males, females and unknown artists.
    // With these new amounts, we update the donutchart.
    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, currentGender);
    var males = newData[5];
    var females = newData[6];
    var unknown = newData[7];

    data = [{"category": "Male", "amount": males}, {"category": "Female", "amount": females}, {"category": "Unknown", "amount": unknown}];

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        w = 500 - margin.right - margin.left,
        h = 500 - margin.top - margin.bottom,
        radius = w/2;

    var color = d3.scaleOrdinal()
        .range(["#5f93ef", "#f1b7ff", "black"]);

    var pie = d3.pie()
        .sort(null)
        .value(function(d){
            return d.amount});

    var arc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 80);

    var labelArc = d3.arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 60);

    // Attach new data to paths
    var path = d3.select("#donutchart").select("g").selectAll(".path")
        .data(pie(data));

    // Select and update tooltip
    var tooltip = d3.select("#donuttip");

    // We append a new path if there are more datapoints than paths
    // We update the current texts in the navigation bar and the bubblechart if someone clicks on a path.
    path.enter()
        .append("path")
            .style("fill", function(d, i){
                    return color(i)})
                .on("mouseover", function(d) {
                    tooltip.text(d.data.category + " " + "artists" + " " + "Amount of works:" + " " + d.data.amount);
                    tooltip.style("visibility", "visible");
                })
                .on("mousemove", function() {
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", function(){
                    return tooltip.style("visibility", "hidden");})
                .on('click', function(d){
                    currentGender = d.data.category;
                    updateTexts(currentGender, currentCountry);
                    updateBubbles(currentGender, currentCountry, dataArtist, currentStartyear, currentEndyear, currentCategory);
                })
                .attr("d", arc)
                .attr("stroke", '#ffffe5')
                .attr("stroke-width", "6px");

    // Remove paths we don't need anymore.
    path.exit().remove();

};

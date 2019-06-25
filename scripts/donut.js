/* JavaScript program to draw donut chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialDonut(donutValues, totalMales, totalFemales, totalUnknown){


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

    var tooltip = d3.select("body")
        .append("div")
            .attr('id', 'donuttip')
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "15px sans-serif");

    var arc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 80);

    var labelArc = d3.arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 60);


    var svg2 = d3.select("#donut")
        .append("svg")
            .attr("id", 'donutchart')
            .attr("class", "pie")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var g = svg2.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
            .attr("class", "arc")

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d){
            if (d.data.category === 'Male'){
                return "#5f93ef"}
            else if(d.data.category === 'Female'){
                return "#f1b7ff"}
            else{
                return "black"}
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

    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, currentGender);
    var males = newData[5];
    var females = newData[6];
    var unknown = newData[7];

    data = [{"category": "Male", "amount": males}, {"category": "Female", "amount": females}, {"category": "Unknown", "amount": unknown}];

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        w = 500 - margin.right - margin.left,
        h = 500 - margin.top - margin.bottom,
        radius = w/2;

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

    var path = d3.select("#donutchart").select("g").selectAll(".path")
        .data(pie(data));

    var tooltip = d3.select("#donuttip");

    path.enter()
        .append("path")
            .style("fill", function(d){
                if (d.data.category === 'Male'){
                    return "#5f93ef";
                }else if( d.data.category === 'Female'){
                    return "#f1b7ff";
                }else {
                    return "black";
                }})
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

    path.exit().remove();

};

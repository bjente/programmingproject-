/* JavaScript program to draw and update bubble chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialBubble(childrenDict, startyear, endyear, category){

    /* This is a function that draws the initial bubble chart.
    It creates nodes, nodes containing circles and text.
    source: http://bl.ocks.org/mmattozzi/7018021
    */

    var diameter = 600;
    format = d3.format(",d");

    var color = d3.scaleOrdinal()
        .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);

    // Create new pack layout
    var bubble = d3.pack(childrenDict)
        .size([diameter, diameter])
        .padding(1.5);

    // Create svg for bubblechart
    var svg = d3.select("#bubbles")
        .append("svg")
            .attr("id", "bubblechart")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

    // Set tooltips
    var tooltip = d3.select("body")
        .append("div")
            .attr('id', 'bubbletip')
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "15px sans-serif");

    // Create nodes. Nodes contain circles and text
    // The bigger the artistCount, the bigger the circle
    // Show tooltip when hovering over with mouse
    var nodes = d3.hierarchy(childrenDict)
        .sum(function(d) {
            return d.artistCount
        });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

    node.append("circle")
        .attr("class", "circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i){
            return color(i);
        })
        .on("mouseover", function(d){
            tooltip.text("Artist:" + " " + d.data.Artist + "," + " " + "Amount of works:" + " " + format(d.data.artistCount));
            tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(){
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){
            return tooltip.style("visibility", "hidden");
        });

    node.append("text")
        .attr("dy", ".2em")
        .attr("class", "bubbletext")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Artist + ": " + format(d.data.artistCount);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "pink");

    d3.select(self.frameElement)
        .style("height", diameter + "px");

};

function updateBubbles(gender, threeLetterCountry, dataArtist, startyear, endyear, category){

    /* This is a function that updates the bubble chart.
    It looks at how many circles need to be added, which circles need to be updated according to the new data
    and if there are circles that need to be removed
    Source: https://bl.ocks.org/HarryStevens/54d01f118bc8d1f2c4ccd98235f33848
    */

    var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, gender);
    var childrenDict = newData[8];
    var diameter = 600

    // Check if new data !== 0. Otherwise, don't execute the update bubbles function
    if(newData[8].children.length !== 0){

        var color = d3.scaleOrdinal()
            .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);

        var bubble = d3.pack(childrenDict)
            .size([diameter, diameter])
            .padding(1.5);

        var t = d3.transition()
            .duration(750);

        var nodes = d3.hierarchy(childrenDict)
            .sum(function(d) {
                return d.artistCount
            });

        // Attach new data
        var tooltip = d3.select("#bubbletip")
        var newNode = d3.select("#bubblechart").selectAll(".node")
            .data(bubble(nodes).children)

        // Identify how many nodes need to be added when there are more datapoints than nodes in new data
        var nodeEnter = newNode.enter()

        var newGNode = nodeEnter
            .append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

        // If there are more datapoints, we append new circles to node
        newGNode
            .append("circle")
                .attr("r", function(d){ return d.r;})
                .style("fill", function(d,i) {
                    return color(i);
                })
                .on("mouseover", function(d) {
                    tooltip.text("Artist:" + " " + d.data.Artist + "," + " " + "Amount of works:" + " " + format(d.data.artistCount));
                    tooltip.style("visibility", "visible");
                })
                .on("mousemove", function() {
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", function(){
                    return tooltip.style("visibility", "hidden");
                });

        // If there are more datapoints, we append new text to node
        newGNode
            .append("text")
                .attr("class", "bubbletext")
                .style("text-anchor", "middle")
                .text(function(d) {
                    return d.data.Artist + ": " + format(d.data.artistCount);
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", function(d){
                    return d.r/5;
                })
        .       attr("fill", "pink");

        // Size of existing circles is changed according to new data
        newNode.select("circle")
            .transition().duration(1000)
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d, i) {
        return color(i);
        });

        // Text in existing nodes is altered according to new data
        newNode.select("text")
            .text(function (d) {
                return d.data.Artist + ": " + format(d.data.artistCount);
            })
            .attr("font-size", function(d){
                return d.r/5;
            });

        // Existing nodes are being moved to new location
        newNode.transition().attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // If there are fewer datapoints in new data, unnecessary nodes are removed
        newNode.exit().remove()

    };

};

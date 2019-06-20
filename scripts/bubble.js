/* JavaScript program to draw bubble chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialBubble(childrenDict, startyear, endyear, category){

  var diameter = 600;
      format = d3.format(",d")

  var color = d3.scaleOrdinal()
      .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);

  var bubble = d3.pack(childrenDict)
      .size([diameter, diameter])
      .padding(1.5);

  var svg = d3.select("body")
      .append("svg")
      .attr("id", "bubblechart")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");

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
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


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

// return [svg, tooltip]
}


function updateBubbles(gender, threeLetterCountry, dataArtist, startyear, endyear, currentCategory){

var newData = filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut)
var childrenDict = newData[8]

  var diameter = 600

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

  var tooltip = d3.select("#bubbletip")
  var newNode = d3.select("#bubblechart").selectAll(".node")
                .data(bubble(nodes).children)


  // kijken hoeveel datapoints we hebben tov het aantal circles
  var nodeEnter = newNode.enter()

  var newGNode = nodeEnter
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
      });

// als er meer datapoints zijn dan circles, voegen we meer circles toe
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
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

// nieuwe tekst wordt toegevoegd
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
    .attr("fill", "pink");

// al bestaande circles worden groter of kleiner gemaakt, hangt van nieuwe datawaarde af
newNode.select("circle")
    .transition().duration(1000)
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d, i) {
        return color(i);
    });

// al bestaande text wordt aangepast
newNode.select("text")
    .text(function (d) {
        return d.data.Artist + ": " + format(d.data.artistCount);
    })
    .attr("font-size", function(d){
        return d.r/5;
    });

// al bestaande circles worden verplaatst dmv een transition
newNode.transition().attr("class", "node")
    .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
});

// overbodige circles worden weggegooid
newNode.exit().remove()

}

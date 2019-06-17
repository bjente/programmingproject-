/* JavaScript program to draw bubble chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialBubble(dataArtist, startyear, endyear, category){

  var valuesBubble = []
  if(category !== 'All categories'){

    for(var key in dataArtist){

      if(dataArtist[key].year >= startyear && dataArtist[key].year <= endyear && dataArtist[key].department === category){
        valuesBubble.push(dataArtist[key].values)
      }
  }
}
  else{
    for(var key in dataArtist){
      if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear){
        valuesBubble.push(dataArtist[key].values)
      }
    }
  }

var bubbleList = []

valuesBubble.forEach(function(d){
  d.forEach(function(e){
    bubbleList.push(e)
  })
})

var childrenDict = {children: bubbleList}
console.log(childrenDict)

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
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("border-radius", "6px")
      .style("font", "12px sans-serif")
      .text("tooltip");

  var nodes = d3.hierarchy(childrenDict)
      .sum(function(d) {
        return d.artistCount
    });

  console.log(bubble(nodes).descendants())
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

  node.append("title")
      .text(function(d) {
          return d.Artist + ": " + d.artistCount;
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
      .attr("class", "donuttext")
      .style("text-anchor", "middle")
      .text(function(d) {
          return d.data.Artist.substring(0, d.r / 3);
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "pink");

  node.append("text")
      .attr("dy", "1.3em")
      .attr("class", "donuttext")
      .style("text-anchor", "middle")
      .text(function(d) {
          return d.data.artistCount;
      })
      .attr("font-family",  "Gill Sans", "Gill Sans MT")
      .attr("font-size", function(d){
          return d.r/5;
      })
      .attr("fill", "pink");

  d3.select(self.frameElement)
      .style("height", diameter + "px");

// return [svg, tooltip]
}

// function updateBubbles(gender, threeLetterCountry, dataArtist, startyear, endyear, category){
//
//   d3.select('#bubblechart').remove();
//   var valuesBubble = []
//
//   if(threeLetterCountry !== 'all'){
//
//     if(category !== 'All categories'){
//
//       for(var key in dataArtist){
//
//         if(dataArtist[key].year >= startyear && dataArtist[key].year <= endyear && dataArtist[key].department === category){
//           valuesBubble.push(dataArtist[key].values)
//         }
//     }
//   }
//     else{
//       for(var key in dataArtist){
//         if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear){
//           valuesBubble.push(dataArtist[key].values)
//         }
//       }
//     }
//
//   var bubbleList = []
//
//
//   valuesBubble.forEach(function(d){
//     d.forEach(function(e){
//       var multipleGenders = e.Gender.split(" ")
//       var multipleNationalities = e.Nationality.split(" ")
//       if(multipleNationalities.length > 1 && multipleGenders.length > 1){
//         if(multipleNationalities.includes(threeLetterCountry) && multipleGenders.includes(gender.toLowerCase())){
//           bubbleList.push(e)
//         }
//       }
//       else if(e.Nationality === threeLetterCountry && e.Gender === gender){
//         bubbleList.push(e)
//       }
//
//   // console.log(bubbleList)
//       })
//     })
//   }
//
//   else {
//     if(category !== 'All categories'){
//
//       for(var key in dataArtist){
//
//         if(dataArtist[key].year >= startyear && dataArtist[key].year <= endyear && dataArtist[key].department === category){
//           valuesBubble.push(dataArtist[key].values)
//         }
//     }
//   }
//     else{
//       for(var key in dataArtist){
//         if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear){
//           valuesBubble.push(dataArtist[key].values)
//         }
//       }
//       valuesBubble.forEach(function(d){
//         d.forEach(function(e){
//           var multipleGenders = e.Gender.split(" ")
//           if(multipleGenders.length > 1){
//             if(multipleGenders.includes(gender.toLowerCase())){
//               bubbleList.push(e)
//             }
//           }
//           else if(e.Nationality === threeLetterCountry && e.Gender === gender){
//             bubbleList.push(e)
//           }
//         })
//       })
//     }
//   }
//   var childrenDict = {children: bubbleList}
//   // console.log("childrendict", childrenDict)
//
//   var diameter = 600;
//       format = d3.format(",d")
//
//   var color = d3.scaleOrdinal()
//       .range(['#ffffe5','#f7fcb9','#d9f0a3','#addd8e', '#78c679','#41ab5d', '#238443','#006837','#004529', '#292929']);
//
//   var bubble = d3.pack(childrenDict)
//       .size([diameter, diameter])
//       .padding(1.5);
//
//   var svg = d3.select("body")
//       .append("svg")
//       .attr("id", "bubblechart")
//       .attr("width", diameter)
//       .attr("height", diameter)
//       .attr("class", "bubble");
//
//   var tooltip = d3.select("body")
//       .append("div")
//       .style("position", "absolute")
//       .style("z-index", "10")
//       .style("visibility", "hidden")
//       .style("color", "white")
//       .style("padding", "8px")
//       .style("background-color", "rgba(0, 0, 0, 0.75)")
//       .style("border-radius", "6px")
//       .style("font", "12px sans-serif")
//       .text("tooltip");
//
//
//   var nodes = d3.hierarchy(childrenDict)
//       .sum(function(d) {
//         return d.artistCount
//     });
//
//
//
//   var node = svg.selectAll(".node")
//       .data(bubble(nodes).descendants())
//       .enter()
//       .filter(function(d){
//           return  !d.children
//       })
//       .append("g")
//       .attr("class", "node")
//       .attr("transform", function(d) {
//           return "translate(" + d.x + "," + d.y + ")";
//       });
//
//   node.append("title")
//       .text(function(d) {
//           return d.Artist + ": " + d.artistCount;
//       });
//
//   node.append("circle")
//       .attr("r", function(d) {
//           return d.r;
//       })
//       .style("fill", function(d,i) {
//           return color(i);
//       })
//       .on("mouseover", function(d) {
//               // console.log(d.data.Artist)
//               tooltip.text("Artist:" + " " + d.data.Artist + "," + " " + "Amount of works:" + " " + format(d.data.artistCount));
//               tooltip.style("visibility", "visible");
//       })
//       .on("mousemove", function() {
//           return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
//       })
//       .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
//
//
//   node.append("text")
//       .attr("dy", ".2em")
//       .style("text-anchor", "middle")
//       .text(function(d) {
//           return d.data.Artist.substring(0, d.r / 3);
//       })
//       .attr("font-family", "sans-serif")
//       .attr("font-size", function(d){
//           return d.r/5;
//       })
//       .attr("fill", "pink");
//
//   node.append("text")
//       .attr("dy", "1.3em")
//       .style("text-anchor", "middle")
//       .text(function(d) {
//           return d.data.artistCount;
//       })
//       .attr("font-family",  "Gill Sans", "Gill Sans MT")
//       .attr("font-size", function(d){
//           return d.r/5;
//       })
//       .attr("fill", "pink");
//
//   d3.select(self.frameElement)
//       .style("height", diameter + "px");
//
// }

function updateBubbles(gender, threeLetterCountry, dataArtist, startyear, endyear, category){

  var valuesBubble = []

  if(threeLetterCountry !== 'all'){

    if(category !== 'All categories'){

      for(var key in dataArtist){

        if(dataArtist[key].year >= startyear && dataArtist[key].year <= endyear && dataArtist[key].department === category){
          valuesBubble.push(dataArtist[key].values)
        }
    }
  }
    else{
      for(var key in dataArtist){
        if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear){
          valuesBubble.push(dataArtist[key].values)
        }
      }
    }

  var bubbleList = []

  valuesBubble.forEach(function(d){
    d.forEach(function(e){
      var multipleGenders = e.Gender.split(" ")
      var multipleNationalities = e.Nationality.split(" ")
      if(multipleNationalities.length > 1 && multipleGenders.length > 1){
        if(multipleNationalities.includes(threeLetterCountry) && multipleGenders.includes(gender.toLowerCase())){
          bubbleList.push(e)
        }
      }
      else if(e.Nationality === threeLetterCountry && e.Gender === gender){
        bubbleList.push(e)
      }
      })
    })
  }

  else {
    if(category !== 'All categories'){

      for(var key in dataArtist){

        if(dataArtist[key].year >= startyear && dataArtist[key].year <= endyear && dataArtist[key].department === category){
          valuesBubble.push(dataArtist[key].values)
        }
    }
  }
    else{
      for(var key in dataArtist){
        if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear){
          valuesBubble.push(dataArtist[key].values)
        }
      }
      valuesBubble.forEach(function(d){
        d.forEach(function(e){
          var multipleGenders = e.Gender.split(" ")
          if(multipleGenders.length > 1){
            if(multipleGenders.includes(gender.toLowerCase())){
              bubbleList.push(e)
            }
          }
          else if(e.Nationality === threeLetterCountry && e.Gender === gender){
            bubbleList.push(e)
          }
        })
      })
    }
  }
  var childrenDict = {children: bubbleList}
  console.log("nieuwe data", childrenDict)
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

  var node = d3.selectAll(".node")
            .data(bubble(nodes).descendants());
            console.log("BUBBLE", bubble(nodes).descendants())

  // var node = d3.selectAll(".node")
  //   .data(
  //       bubble.nodes(classes(nodes)).filter(function (d){return !d.children;}),
  //       function(d) {return d.className} // key data based on className to keep object constancy
  //   );


  var circle = node.selectAll(".circle")
  console.log("circle", circle)
  // var text = d3.selectAll(".donuttext")
  //           .data(bubble(nodes).descendants())
  console.log(node.exit())
  console.log("zonder exit", node)
  node.exit().remove()
    //   .style('fill', 'black')
    // .transition(t)
    //   .attr("r", 1e-6)

  // text.exit()
  //   .transition(t)
  //     .attr("opacity", 1e-6)
  //     .remove();

  node
    .transition(t)
    .filter(function(d){
        return  !d.children
    })
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    })

  node.selectAll(".circle")
    .transition(t)
    .style("fill", function(d,i) {
        return color(i);
    })
      .attr("r", function(d){ return d.r })
      .attr("cx", function(d){ return d.x })
      .attr("cy", function(d){ return d.y })


  // text
  //   .transition(t)
  //     .attr("x", function(d){ return d.x; })
  //     .attr("y", function(d){ return d.y; });


  node.enter().append("circle")
      .attr("r", 1e-6)
      .attr("cx", function(d){ return d.x; })
      .attr("cy", function(d){ return d.y; })
      .style("fill", function(d,i) {
          return color(i);
      })
    .transition(t)
    .style("fill", function(d,i) {
        return color(i);
    })
      .attr("r", function(d){ return d.r });

  // text.enter().append("text")
  //     .attr("opacity", 1e-6)
  //     .attr("x", function(d){ return d.x; })
  //     .attr("y", function(d){ return d.y; })
  //     .text(function(d){ return d.data.name; })
  //   .transition(t)
  //     .attr("opacity", 1);


}
function updateBubblesMap(values, threeLetterCountry, dataArtist){
  console.log(threeLetterCountry)
}

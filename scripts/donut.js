/* JavaScript program to draw donut chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialDonut(dataDonut){

  // console.log(dataDonut)
  totalMales = 0
  totalFemales = 0
  totalUnknown = 0
  dataDonut.forEach(function(d){
    d.forEach(function(e){
      totalMales += e.Males
      totalFemales += e.Females
      totalUnknown += e.Unknown
    })
  })
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      w = 500 - margin.right - margin.left,
      h = 500 - margin.top - margin.bottom,
      radius = w/2;

      data = [{"category": "Male", "amount": totalMales}, {"category": 'Female', "amount": totalFemales}, {"category": 'Unknown', "amount": totalUnknown}]

      var pie = d3.pie()
          .sort(null)
          .value(function(d) { return d.amount});

      var arc = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 80);

      var labelArc = d3.arc()
          .outerRadius(radius - 60)
          .innerRadius(radius - 60);


      var svg2 = d3.select("body").append("svg").attr("class", "pie")
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
                    if (d.data.category === 'Male'){return "#5f93ef"} else if(d.data.category === 'Female'){return "#f1b7ff"}else{return "white"}
                  })
                  .on('click', function(d){
                    updateBubbles(d.data.category)
                  })

                 g.append("text")
               	 .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
               	 .text(function(d) { return d.data.amount
                   ;})
                  .attr("dy", ".35em")
               	 .style("fill", "black")
                  .style("font-size", "0.70em")

}


function updateDonut(dataDonut, threeLetterCountry){

  // waarom update ie de donut niet...
  console.log(threeLetterCountry)

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      w = 500 - margin.right - margin.left,
      h = 500 - margin.top - margin.bottom,
      radius = w/2;

  males = 0
  females = 0
  unknown = 0

  dataDonut.forEach(function(d){
    d.forEach(function(e){
      if (e.Nationality === threeLetterCountry){
        males += e.Males
        females += e.Females
        unknown += e.Unknown
      }
    })
  })
  data = [{"category": "Male artists", "amount": males}, {"category": "Female artists", "amount": females}, {"category": "Unknown gender", "amount": unknown}]

  console.log(data)

  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.amount});

  var arc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 80);

  var labelArc = d3.arc()
      .outerRadius(radius - 60)
      .innerRadius(radius - 60);

  // We create the pie based on the amounts of categories.

  var g = d3.select(".pie")
    .selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc")

     g.append("path")
      .attr("d", arc)
      .style("fill", function(d){
        if (d.data.category === 'Male artists'){return "#5f93ef"} else if(d.data.category === 'Female artists'){return "#f1b7ff"}else{return "white"}
      })

     g.append("text")
     .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
     .text(function(d) { return d.data.amount
       ;})
      .attr("dy", ".35em")
      .style("fill", "black")
      .style("font-size", "0.70em")
  }

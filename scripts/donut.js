/* JavaScript program to draw donut chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function drawInitialDonut(dataDonut, dataArtist, startyear, endyear, category){

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
      threeLetterCountry = 'all'
      var pie = d3.pie()
          .sort(null)
          .value(function(d) { return d.amount});

      var arc = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 80);

      var labelArc = d3.arc()
          .outerRadius(radius - 60)
          .innerRadius(radius - 60);


      var svg2 = d3.select("body")
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
                        else if(d.data.category === 'Female'){ return "#f1b7ff"}
                        else{ return "white"}
                  })
                  .on('click', function(d){
                    updateBubbles(d.data.category, threeLetterCountry, dataArtist, startyear, endyear, category)
                  })


                 g.append("text")
               	 .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
               	 .text(function(d) { return d.data.amount
                   ;})
                  .attr("dy", ".35em")
               	  .style("fill", "black")
                  .style("font-size", "0.70em")

}

  function updateDonut(dataDonut, threeLetterCountry, dataArtist, startyear, endyear, category){

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
    data = [{"category": "Male", "amount": males}, {"category": "Female", "amount": females}, {"category": "Unknown", "amount": unknown}]

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        w = 500 - margin.right - margin.left,
        h = 500 - margin.top - margin.bottom,
        radius = w/2;

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.amount});

    var arc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 80);

    var labelArc = d3.arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 60);

    var path = d3.select("#donutchart").select("g").selectAll(".path")
          .data(pie(data));

    var text = d3.select("#donutchart").select("g").selectAll("text")
    console.log("text",text)

    path.enter()
        .append("path")
            .style("fill", function(d){
            if (d.data.category === 'Male'){
              return "#5f93ef"
            } else if( d.data.category === 'Female'){
              return "#f1b7ff"
            } else {
              return "white"
            }})
          .attr("d", arc)
          .on('click', function(d){
            updateBubbles(d.data.category, threeLetterCountry, dataArtist, startyear, endyear, category)
          })
          .attr("stroke", "white")
          .attr("stroke-width", "6px");


    path.exit().remove()

  }

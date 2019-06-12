/* JavaScript program to draw donut chart
Name: Bente de Bruin
Studentnumber: 11017503
*/


// function filterDonutData(startyear, endyear, category, data, finalDict) {
//
//   // function addToGender(gender, potentialMultipleValues){
//   //   finalDict.forEach(function(country){
//   //     if (country.Nationality === potentialMultipleValues.Nationality){
//   //       country.gender += 1
//   //     }
//   //   })
//   // }
//
//   var listWithGenderDicts = []
//   var totalFemales = 0
//   var totalMales = 0
//   var totalUnknown = 0
//   // var finalDict = []
//
//   // werk ALLEEN met het gegeven start en end year en gekozen department
//   let actualData = {};
//
//   if (category !== 'All categories'){
//     for (let a in data){
//       // maak int van dateacquired en blijf binnen range van start en end en de gekozen department
//       if ((+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) && data[a]['Department'] === category){
//         actualData[a] = data[a];
//         }
//       }
//     }
//   else {
//     for (let a in data){
//       if (+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) {
//         actualData[a] = data[a];
//       }
//     }
//   };
//
//   for (artwork in actualData){
//
//     var genderDict = {};
//
//     genderDict.Nationality = data[artwork].Nationality.trim();
//     genderDict.Genders = data[artwork].Gender.trim()
//     listWithGenderDicts.push(genderDict);
// }
//   // loop over listWithGenderDicts en verander () in unknown en maak lists van genders en nationalities
//   listWithGenderDicts.forEach(function(potentialMultipleValues){
//
//     let nationalities = potentialMultipleValues.Nationality.split(" ")
//     let genders = potentialMultipleValues.Genders.split(" ")
//     if (genders.length > 1){
//       for (i = 0; i < genders.length; i++){
//         if(genders[i] === "()"){
//           genders[i] = 'unknown'
//         }
//       }
//     } else {
//       if (genders[0] === "()"){
//         genders[0] = 'unknown'
//       }
//     }
//     potentialMultipleValues.Genders = genders
//     potentialMultipleValues.Nationality = nationalities
//
//     // vergelijk lengte van arrays met elkaar, genders[0] hoor bij nationalities[0] etc
//     // we tellen 1 bij males females of unknown op van het juiste land
//     if (potentialMultipleValues.Genders.length === potentialMultipleValues.Nationality.length){
//       for (i = 0; i < potentialMultipleValues.Genders.length; i++){
//         if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
//           finalDict.forEach(function(country){
//             if (country.Nationality === potentialMultipleValues.Nationality[i]){
//               country.Females += 1
//               totalFemales += 1
//             }
//           })
//         }
//         else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
//           finalDict.forEach(function(country){
//             if (country.Nationality === potentialMultipleValues.Nationality[i]){
//               country.Males += 1
//               totalMales += 1
//             }
//           })
//         }
//         else {
//           finalDict.forEach(function(country){
//             if (country.Nationality === potentialMultipleValues.Nationality[i]){
//               country.Unknown += 1
//               totalUnknown += 1
//             }
//           })
//         }
//       }
//     }
//    else if (potentialMultipleValues.Genders.length > potentialMultipleValues.Nationality.length){
//      for (i = 0; i < potentialMultipleValues.Nationality.length; i++){
//
//        if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
//          finalDict.forEach(function(country){
//            if (country.Nationality === potentialMultipleValues.Nationality[i]){
//              country.Females += 1
//              totalFemales += 1
//            }
//          })
//        }
//        else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
//          finalDict.forEach(function(country){
//            if (country.Nationality === potentialMultipleValues.Nationality[i]){
//              country.Males += 1
//              totalMales += 1
//            }
//          })
//        }
//        else {
//          finalDict.forEach(function(country){
//            if (country.Nationality === potentialMultipleValues.Nationality[i]){
//              country.Unknown += 1
//              totalUnknown += 1
//            }
//          })
//        }
//      }
//    } else {
//      for (i = 0; i < potentialMultipleValues.Genders.length; i++)
//      {
//        if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
//          finalDict.forEach(function(country){
//            if (country.Nationality === potentialMultipleValues.Nationality[i]){
//              country.Females += 1
//              totalFemales += 1
//            }
//          })
//        }
//        else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
//          finalDict.forEach(function(country){
//            if (country.Nationality === potentialMultipleValues.Nationality[i]){
//              country.Males += 1
//              totalMales += 1
//            }
//          })
//        }
//        else {
//          finalDict.forEach(function(country){
//            if (country.Nationality === potentialMultipleValues.Nationality[i]){
//              country.Unknown += 1
//              totalUnknown += 1
//            }
//          })
//        }
//      }
//    }
//   })
//   // console.log(finalDict)
//   return [finalDict, totalFemales, totalUnknown, totalMales]
// };
//
// function calcAmounts(finalDict){
//   var amounts = []
//   finalDict.forEach(function(country){
//     amounts.push({
//       key: country.Nationality,
//       value: [country.Males, country.Females, country.Unknown]
//     })
//   })
//   return amounts
// }

function drawInitialDonut(finalDict, totalFemales, totalUnknown, totalMales){

  // console.log(amounts)
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      w = 500 - margin.right - margin.left,
      h = 500 - margin.top - margin.bottom,
      radius = w/2;

      data = [{"category": "Male artists", "amount": totalMales}, {"category": 'Female artists', "amount": totalFemales}, {"category": 'Unknown gender', "amount": totalUnknown}]

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


function updateDonut(finalDict, threeLetterCountry){

  // waarom update ie de donut niet...
  console.log(threeLetterCountry)

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      w = 500 - margin.right - margin.left,
      h = 500 - margin.top - margin.bottom,
      radius = w/2;

  finalDict.forEach(function(countryObject){
    if (countryObject.Nationality === threeLetterCountry){
      data = [{"category": "Male artists", "amount": countryObject.Males}, {"category": "Female artists", "amount": countryObject.Females}, {"category": "Unknown gender", "amount": countryObject.Unknown}]
    }
  })
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

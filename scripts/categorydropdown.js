/* Javascript file to manage dropdown menu
   Name: Bente de Bruin
   Student number: 11017503 */


   // $('#categories a').click(function(){
   //   $('#selected').text($(this).text())
   //   console.log('HALLOOOOOO')
   //   console.log("THIS", this);
   // });


   function dropDownChange(dataMapDonut, threeLetterCountry, worldCountries, startyear, endyear, dataArtist){

       d3.select("select")
         .on("change",function(d){
           var selected = d3.select("#dropdown-menu").node().value;
           category = selected
           console.log( selected );

           updateMap(dataMapDonut, worldCountries, startyear, endyear, category, dataArtist)
           // hier map donut en bubbles updaten
           // drawMap(dataMapDonut, worldCountries, startyear, endyear, category, dataArtist)
           // console.log("values", values)
           // for(var key in dataMapDonut){
           //
           //     if(dataMapDonut[key].year >= startyear && dataMapDonut[key].year <= endyear && dataMapDonut[key].department === category){
           //         values.push(dataMapDonut[key].values)
           //     }
           // }
           // // ik moet dataMapDonut sorteren op department, in values staat dat niet meer
           // updateDonut(values, threeLetterCountry, dataArtist, startyear, endyear, category)
       // })
   })
}

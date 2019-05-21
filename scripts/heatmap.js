/* JavaScript program to draw heatmap
Name: Bente de Bruin
Studentnumber: 11017503
*/

//In deze functie maak ik de data klaar voor het goed weergeven van de worldmap
function filterMapData(startyear, endyear, category, data) {
  var listWithDicts = []
  var count = 0

  // werk ALLEEN met het gegeven start en end year en gekozen department
  let actualData = {};

  if (category !== 'All categories'){
    for (let a in data){
      // maak int van dateacquired en blijf binnen range van start en end en de gekozen department
      if ((+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) && data[a]['Department'] === category){
        actualData[a] = data[a];
        }
      }
    }
  else {
    for (let a in data){
      if (+data[a]["DateAcquired"] >= +startyear && +data[a]["DateAcquired"] <= +endyear) {
        actualData[a] = data[a];
      }
    }
  };

  for (artwork in actualData){

    // eerst alle landen die we nu al hebben opgeslagen in een lijst zetten
    allcountries = []
    for (i = 0; i < listWithDicts.length; i++) {
      allcountries.push(listWithDicts[i].Nationality.trim())
    };

    // als huidige nationality nog niet in allcountries staat, maken we een nieuwe dict en stoppen
    // we deze in listWithDicts
    if (!(allcountries.indexOf(data[artwork].Nationality.trim()) >= 0)){
      var countryDict = {};
      countryDict.Nationality = data[artwork].Nationality.trim();
      countryDict.Count = 1;
      listWithDicts.push(countryDict);
    }
    // als de nationality er al wel in staat, verhogen we de count met 1
    else {
      for (i = 0; i < listWithDicts.length; i++) {
        if (listWithDicts[i].Nationality === data[artwork].Nationality.trim()) {
          listWithDicts[i].Count += 1;
        }
      }
    };
  };

  // check of er meerdere nationaliteiten in een nationaliteit zitten
  // n is de elke individuele nationaliteit in nationalities
  // je loopt over elke individuele nationaliteit met nationalities.forEach(function(n))
  // Daarna kijk je per kunstwerk(= singleNat) (nationaliteit van het kunstwerk = singleNat.Nationality)
  // in de listWithDicts of dit gelijk is aan n. Als dat zo is tel je het aandeel van die nationaliteit van het totaal
  // nationailteiten VAN het kunstwerk op bij de count van dat land in listWithDicts
  listWithDicts.forEach(function(potentialMultipleNat){

    let nationalities = potentialMultipleNat.Nationality.split(" ");

    if (nationalities.length > 1){

      nationalities.forEach(function(n){

        listWithDicts.forEach(function(singleNat){
          if (singleNat.Nationality === n) {
            singleNat.Count += potentialMultipleNat.Count/nationalities.length
            singleNat.Count = Math.round(singleNat.Count * 100) / 100
          }
        })
      })
    }
  })
  console.log(listWithDicts)
};

var map = new Datamap({
        element: document.getElementById('container'),
        fills: {
            HIGH: '#afafaf',
            LOW: '#123456',
            MEDIUM: 'blue',
            UNKNOWN: 'rgb(0,0,0)',
            defaultFill: 'green'
        },
        data: {
            IRL: {
                fillKey: 'LOW',
                numberOfThings: 2002
            },
            USA: {
                fillKey: 'MEDIUM',
                numberOfThings: 10381
            }
        }
    });

    // Draw a legend for this map
    map.legend();

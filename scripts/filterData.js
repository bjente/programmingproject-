function filterData(startyear, endyear, category, data){

  var listWithArtistDicts = []
  var listWithDicts = []
  var listWithGenderDicts = []
  var totalFemales = 0
  var totalMales = 0
  var totalUnknown = 0

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

    allArtists = []
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
      // countryDict.Artist = data[artwork].Artist.trim()
      countryDict.Count = 1;
      countryDict.Males = 0;
      countryDict.Females = 0;
      countryDict.Unknown = 0;
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
    var genderDict = {};

    genderDict.Nationality = data[artwork].Nationality.trim();
    genderDict.Genders = data[artwork].Gender.trim()
    listWithGenderDicts.push(genderDict);

    for (i = 0; i < listWithArtistDicts.length; i++) {
      allArtists.push(listWithArtistDicts[i].Artist.trim())
    };

    if (!(allArtists.indexOf(data[artwork].Artist.trim()) >= 0)){
      var artistDict = {}
      artistDict.artistCount = 1
      artistDict.Artist = data[artwork].Artist.trim()
      artistDict.Gender = data[artwork].Gender.trim()
      artistDict.Nationality = data[artwork].Nationality.trim()
      listWithArtistDicts.push(artistDict)
    }
    else {
      for (i = 0; i < listWithArtistDicts.length; i++) {
        if (listWithArtistDicts[i].Artist === data[artwork].Artist.trim()) {
          listWithArtistDicts[i].artistCount += 1;
        }
      }
    }
  }
  // check of er meerdere nationaliteiten in een nationaliteit zitten
  // n is elke individuele nationaliteit in nationalities
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
            singleNat.Count += potentialMultipleNat.Count/nationalities.length;
            singleNat.Count = Math.round(singleNat.Count * 100) / 100;
          }
        })
      })
    }
  })

  // verwijder dubbele nationaliteiten uit listWithDicts
  var finalListWithDicts = []
  listWithDicts.forEach(function(potentialMultipleNat){
    let nationalities = potentialMultipleNat.Nationality.split(" ");
    if ((nationalities.length === 1) && potentialMultipleNat.Nationality !== 'unknown'){
      finalListWithDicts.push(potentialMultipleNat);
    }
  })

  listWithGenderDicts.forEach(function(potentialMultipleValues){

    let nationalities = potentialMultipleValues.Nationality.split(" ")
    let genders = potentialMultipleValues.Genders.split(" ")
    if (genders.length > 1){
      for (i = 0; i < genders.length; i++){
        if(genders[i] === "()"){
          genders[i] = 'unknown'
        }
      }
    } else {
      if (genders[0] === "()"){
        genders[0] = 'unknown'
      }
    }
    potentialMultipleValues.Genders = genders
    potentialMultipleValues.Nationality = nationalities

    // vergelijk lengte van arrays met elkaar, genders[0] hoor bij nationalities[0] etc
    // we tellen 1 bij males females of unknown op van het juiste land
    if (potentialMultipleValues.Genders.length === potentialMultipleValues.Nationality.length){
      for (i = 0; i < potentialMultipleValues.Genders.length; i++){
        if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
          finalListWithDicts.forEach(function(country){
            if (country.Nationality === potentialMultipleValues.Nationality[i]){
              country.Females += 1
              totalFemales += 1
            }
          })
        }
        else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
          finalListWithDicts.forEach(function(country){
            if (country.Nationality === potentialMultipleValues.Nationality[i]){
              country.Males += 1
              totalMales += 1
            }
          })
        }
        else {
          finalListWithDicts.forEach(function(country){
            if (country.Nationality === potentialMultipleValues.Nationality[i]){
              country.Unknown += 1
              totalUnknown += 1
            }
          })
        }
      }
    }
   else if (potentialMultipleValues.Genders.length > potentialMultipleValues.Nationality.length){
     for (i = 0; i < potentialMultipleValues.Nationality.length; i++){

       if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
         finalListWithDicts.forEach(function(country){
           if (country.Nationality === potentialMultipleValues.Nationality[i]){
             country.Females += 1
             totalFemales += 1
           }
         })
       }
       else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
         finalListWithDicts.forEach(function(country){
           if (country.Nationality === potentialMultipleValues.Nationality[i]){
             country.Males += 1
             totalMales += 1
           }
         })
       }
       else {
         finalListWithDicts.forEach(function(country){
           if (country.Nationality === potentialMultipleValues.Nationality[i]){
             country.Unknown += 1
             totalUnknown += 1
           }
         })
       }
     }
   } else {
     for (i = 0; i < potentialMultipleValues.Genders.length; i++)
     {
       if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
         finalListWithDicts.forEach(function(country){
           if (country.Nationality === potentialMultipleValues.Nationality[i]){
             country.Females += 1
             totalFemales += 1
           }
         })
       }
       else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
         finalListWithDicts.forEach(function(country){
           if (country.Nationality === potentialMultipleValues.Nationality[i]){
             country.Males += 1
             totalMales += 1
           }
         })
       }
       else {
         finalListWithDicts.forEach(function(country){
           if (country.Nationality === potentialMultipleValues.Nationality[i]){
             country.Unknown += 1
             totalUnknown += 1
           }
         })
       }
     }
   }
  })
  return [finalListWithDicts, totalFemales, totalUnknown, totalMales, listWithArtistDicts]
};

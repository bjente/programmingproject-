/* Name: Bente de Bruin
Studentnumber: 11017503
This is a file that filters data
*/


function filterData(startyear, endyear, category, data){

    /* This is a function that is used for the creation of JSON files.
    It pre-calculates values so that we don't have to do that anymore in the actual program.
    It outputs JSON files which I saved locally.
    */

var listWithDicts = [];
var listWithGenderDicts = [];
var totalFemales = 0;
var totalMales = 0;
var totalUnknown = 0;

// Only work with proper start and endyear and correct category
let actualData = {};

if (category !== 'All categories'){
    for (let a in data){
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

    // Put all countries we've seen so far in a list
    allcountries = [];
    for (i = 0; i < listWithDicts.length; i++) {
        allcountries.push(listWithDicts[i].Nationality.trim())
    };

    // If current nationality is not in allcountries, make a new countrydict and put this in listWithDicts
    if (!(allcountries.indexOf(data[artwork].Nationality.trim()) >= 0)){
        var countryDict = {};
        countryDict.Nationality = data[artwork].Nationality.trim();
        countryDict.Count = 1;
        countryDict.Males = 0;
        countryDict.Females = 0;
        countryDict.Unknown = 0;
        listWithDicts.push(countryDict);
    }
    // If current nationality does exist, we increase the count of that nationality with 1
    else {
        for (i = 0; i < listWithDicts.length; i++) {
            if (listWithDicts[i].Nationality === data[artwork].Nationality.trim()) {
                listWithDicts[i].Count += 1;
            }
        }
    };

// Make a seperate dictionary for the genders
var genderDict = {};
genderDict.Nationality = data[artwork].Nationality.trim();
genderDict.Genders = data[artwork].Gender.trim()
listWithGenderDicts.push(genderDict);
}

// Check if there are multiple nationalities in nationality
// If so, we count how many nationalities there are and increase the Count of that nationality by nationality divided by total nationalities
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

// Remove double nationalities
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


// Compare length of gender array with nationality array, if it is the same length,
// the female/male/unknown count of that country is increased.
// Genders[0] belongs to Nationality[i] etc...
if (potentialMultipleValues.Genders.length === potentialMultipleValues.Nationality.length){
    for (i = 0; i < potentialMultipleValues.Genders.length; i++){
        if (potentialMultipleValues.Genders[i] === 'female' || potentialMultipleValues.Genders[i] === 'Female'){
            finalListWithDicts.forEach(function(country){
                if (country.Nationality === potentialMultipleValues.Nationality[i]){

                    country.Females += 1;
                    totalFemales += 1;
                }
            })
        }
        else if (potentialMultipleValues.Genders[i] === 'male' || potentialMultipleValues.Genders[i] === 'Male'){
            finalListWithDicts.forEach(function(country){
                if (country.Nationality === potentialMultipleValues.Nationality[i]){
                    country.Males += 1;
                    totalMales += 1;
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
         };
       });
      };
    };
   };
 });
 // To make JSON object:
 // finalJSON = JSON.stringify(finalListWithDicts)
};

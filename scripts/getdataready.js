
function filterData(threeLetterCountry, category, startyear, endyear, dataArtist, dataMapDonut, gender){

    /* This function is being called when an update function is being called.
    It filters out data that's not necessary to draw new graphs.
    It returns only data we need to draw the new graphs.
    */

    // Copy data so we can filter out only what we need
    dataArtistCopy = JSON.parse(JSON.stringify(dataArtist));
    dataMapDonutCopy = JSON.parse(JSON.stringify(dataMapDonut));

    // Filter 1: Filter categories. Delete categories we don't need
    if(category !== 'All categories'){
        for(var key in dataArtistCopy){
            if(dataArtistCopy[key].department !== category){
                delete dataArtistCopy[key];
            };
        };
        for(var key in dataMapDonutCopy){
            if(dataMapDonutCopy[key].department !== category){
                delete dataMapDonutCopy[key];
            };
        };
    };

    // Filter 2: Filter out years we don't need
    for(var key in dataArtistCopy){
        if(!(dataArtistCopy[key].year >= startyear && dataArtistCopy[key].year <= endyear)){
            delete dataArtistCopy[key];
        };
    };
    for(var key in dataMapDonutCopy){
        if(!(dataMapDonutCopy[key].year >= startyear && dataMapDonutCopy[key].year <= endyear)){
            delete dataMapDonutCopy[key];
        };
    };

    // Filter 3: Filter out nationalities we don't need
    if(threeLetterCountry !== 'All'){
        for(var key in dataMapDonutCopy){
            var indicesToRemove = [];
            dataMapDonutCopy[key].values.forEach(function(singleObject, i){
                if(singleObject.Nationality !== threeLetterCountry){
                    indicesToRemove.push(i);
                };
            });
            indicesToRemove = indicesToRemove.reverse();
            indicesToRemove.forEach(function(index){
                dataMapDonutCopy[key].values.splice(index, 1);
            })
            if(dataMapDonutCopy[key].values.length === 0){
                delete dataMapDonutCopy[key];
            };
        };

        for(var key in dataArtistCopy){
            var indicesToRemoveArtist = [];
            dataArtistCopy[key].values.forEach(function(singleObject, i){
                var multipleNationalities = singleObject.Nationality.split(" ");
                if(!(multipleNationalities.includes(threeLetterCountry))){
                    indicesToRemoveArtist.push(i);
                };
            });
            indicesToRemoveArtist = indicesToRemoveArtist.reverse();
            indicesToRemoveArtist.forEach(function(index){
                dataArtistCopy[key].values.splice(index, 1);
            })
            if(dataArtistCopy[key].values.length === 0){
                delete dataArtistCopy[key];
            };
        };
    };

    //Filter 4: Filter out genders we don't need
    if(gender !== 'All'){
        for(var key in dataArtistCopy){
            var indicesToRemoveArtistGender = [];
            dataArtistCopy[key].values.forEach(function(singleObject, i){
                var multipleGenders = singleObject.Gender.split(" ");
                if(multipleGenders.length > 1){
                    if(!(multipleGenders.includes(gender.toLowerCase()))){
                        indicesToRemoveArtistGender.push(i);
                    };
                }
                else{
                    if(!(singleObject.Gender.toLowerCase() === gender.toLowerCase())){
                        indicesToRemoveArtistGender.push(i)
                    };
                };
            });
            indicesToRemoveArtistGender.reverse();
            indicesToRemoveArtistGender.forEach(function(index){
                dataArtistCopy[key].values.splice(index, 1);
            })
            if(dataArtistCopy[key].values.length === 0){
                delete dataArtistCopy[key];
            };
        };
    };

    var createMapValues = createWorksPerCountryDict(dataMapDonutCopy);
    var donutValues = createDonutValues(dataMapDonutCopy);
    var bubbleValues = createBubbleValues(dataArtistCopy);

return[dataArtistCopy, createMapValues[0], createMapValues[1], createMapValues[2], dataMapDonutCopy,
        donutValues[1], donutValues[2], donutValues[3], bubbleValues]
};

function createWorksPerCountryDict(dataMapDonutCopy){

    /* This is a function that creates a dictionary for drawing the new worldmap.
    It iterates over the filtered data and returns a dictionary containing how many works each country had in the updated situation.
    */

    var values = [];
    var worksPerCountry = {};
    var allAmounts = [];

    for(var key in dataMapDonutCopy){
        values.push(dataMapDonutCopy[key].values);
    };

    values.forEach(function(singleRow){
        singleRow.forEach(function(singleElement){
            if(singleElement.Nationality in worksPerCountry){
                worksPerCountry[singleElement.Nationality] += singleElement.Count;
                allAmounts.push(worksPerCountry[singleElement.Nationality]);
            }
            else{
                worksPerCountry[singleElement.Nationality] = +singleElement.Count;
                allAmounts.push(worksPerCountry[singleElement.Nationality]);
            };
        });
    });
    var maxAmount = Math.max.apply(Math, allAmounts);

return[worksPerCountry, maxAmount, allAmounts]
};

function createDonutValues(dataMapDonutCopy){

    /* This is a function that calculates the new amounts for drawing a new donutchart.
    It iterates over the filtered data and returns the new values.
    */

    var donutValues = [];
    var totalMales = 0;
    var totalFemales = 0;
    var totalUnknown = 0;

    for(var key in dataMapDonutCopy){
        donutValues.push(dataMapDonutCopy[key].values);
    };

    donutValues.forEach(function(singleRow){
        singleRow.forEach(function(singleElement){
            totalMales += singleElement.Males;
            totalFemales += singleElement.Females;
            totalUnknown += singleElement.Unknown;
        });
    });
    return[donutValues, totalMales, totalFemales, totalUnknown]
};

function createBubbleValues(dataArtistCopy){

    /* This is a function that calculates new values for the new bubblechart.
    It iterates over the filtered data and returns a new dictionary.
    */

    var bubbleValues = [];
    var bubbleList = [];

    for(var key in dataArtistCopy){
        bubbleValues.push(dataArtistCopy[key].values);
    };

    bubbleValues.forEach(function(singleRow){
        singleRow.forEach(function(singleElement){
            var multipleGenders = singleElement.Gender.split(" ");
            if(multipleGenders.length > 1){
                if(multipleGenders.includes(gender.toLowerCase()) || gender === 'All'){
                    bubbleList.push(singleElement);
                };
            }
            else if(singleElement.Gender.toLowerCase() === gender.toLowerCase() || gender === 'All'){
                bubbleList.push(singleElement)
            };
        });
    });
    var childrenBubble = {children: bubbleList};

    return childrenBubble
};

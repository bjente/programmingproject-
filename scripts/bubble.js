/* JavaScript program to draw bubble chart
Name: Bente de Bruin
Studentnumber: 11017503
*/

function filterBubbleData(startyear, endyear, category, data){

    var listWithArtistDicts = []

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
    // console.log(listWithArtistDicts)
}

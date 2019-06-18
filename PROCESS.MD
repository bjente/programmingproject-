### **Process book**
###### Bente de Bruin
###### Studentnumber: 11017503

#### 24-04-2019
- Committed the first version of my proposal to this repository.
- Created my design doc.

#### 07-05-2019
- Started preprocessing my data using python and pandas.


#### 14-05-2019
- On this day, I found out that my data wasn't processed properly.
  I had to throw away lots of data because the database was simply too big.
  I decided to only use the years: 1965, 1975, 1985, 1995, 2005, 2015, 2016, 2017, 2018.
- For the worldmap I needed to know how many works from a specific country were acquired. I had to write a function in Javascript to do so.
  Since there can be artworks made by several artist from a variety of countries, I decided to assign a ratio for each country. 
  For example: Artwork "The apple" can be a collaboration between artist John, who is Belgian and artist Henry who is French. I decided to increase the amount of works acquired from Belgium by 0.5 as well as the amount of works acquired from France.
  I decided to do so because otherwise the user would get an incorrect idea of how many works MoMA has in its collection.

#### 21-05-2019
- I was still busy with getting the data in a proper format.
- I decided that the dropdown menu would consist out of categories in stead of male/female, because a piece of art can be a collaboration between males and females. This was getting too complex. An artwork can only belong to one category (i.e. photography, sculpture, etc).
- I also created the first version of the world map.

#### 29-05-2019
- I altered the Nationality in my JSON file. I used the ISO code of each country, since that comes in handy using topoJSON.
- I added a stylesheet.
- I started working on a legend and a slider, both not working yet.

#### 04-06-2019
- I tried to fix the slider, didn't succeed yet.
- I started with the donut charts, they're not finished yet. If you click on a country, it is not drawing the right donut chart yet. 
- I thought about how to preprocess the data for the bubble chart.

#### 11-06-2019
- I fixed the on click method for the worldmap. Donuts are not properly shown yet.
- I began filtering data for the bubble chart.
- I did some designing for the look of my website.
- I have to discuss with a tutor about filtering data: when should I do it?

#### 12-06-2019
- I made a demo of the bubble chart, I decided that I would let in multiple artists in for now because otherwise it'd get too complicated.
- I tried to write an update function for the donut charts, but my understanding of D3 is not good enough to do so. Therefore, I started studying the 'general update pattern' of D3. It covers the enter-update-exit pattern. I still have a hard time understanding this. 

#### Weekend 14-06-2019/16-06-2019
- I decided to completely change my datastructure. I made JSON files with the help of the functions I wrote in filterdata.js. After consultation with student assistants, we came to the conclusion that my program was a bit slow. To solve this, I needed to pre-calculate values and I had to write them to a JSON file. This enabled me to completely remove filterdata.js. Since the data was in a different format, I had to make a couple of changes to the functions that draw the map, the donut and the bubbles. Most of the calculations are already done on forehand now. This makes the program a bit faster, but it still has to do some calculations when running, so it's still not super fast. 

#### 18-06-2019
- I made an update function for both the bubble and the donutchart. The update function for the bubble chart is not working properly yet. I have an idea why, I will discuss this tomorrow with a tutor.
- I added a default time slider and a dropdown menu. I think I'll implement two time sliders. One represents the startyear, the other represents the end year.

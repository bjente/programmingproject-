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
![Worldmap first version](https://github.com/bjente/programmingproject-/blob/master/doc/uitsnedeworldmap.jpg)

#### 29-05-2019
- I altered the Nationality in my JSON file. I used the ISO code of each country, since that comes in handy using topoJSON.
- I added a stylesheet.
- I started working on a legend and a slider, both not working yet.

#### 04-06-2019
- I tried to fix the slider, didn't succeed yet.
- I started with the donut charts, they're not finished yet. If you click on a country, it is not drawing the right donut chart yet. It makes new donuts if you click multiple countries.
- I thought about how to preprocess the data for the bubble chart.
![Donut charts](https://github.com/bjente/programmingproject-/blob/master/doc/uitsnededonuts.jpg)

#### 11-06-2019
- I fixed the on click method for the worldmap. Donuts are not properly shown yet.
- I began filtering data for the bubble chart.
- I did some designing for the look of my website.
- I have to discuss with a tutor about filtering data: when should I do it?

![Donuts](https://github.com/bjente/programmingproject-/blob/master/doc/startpage.jpg)
![Img](https://github.com/bjente/programmingproject-/blob/master/doc/startpage2.jpg)

#### 12-06-2019
- I made a demo of the bubble chart, I decided that I would let in multiple artists in for now because otherwise it'd get too complicated.
- I tried to write an update function for the donut charts, but my understanding of D3 is not good enough to do so. Therefore, I started studying the 'general update pattern' of D3. It covers the enter-update-exit pattern. I still have a hard time understanding this. 

#### Weekend 14-06-2019/16-06-2019
- I decided to completely change my datastructure. I made JSON files with the help of the functions I wrote in filterdata.js. I saved and concatenated these files into two big JSON files. One for the map and the donut and one for the bubblechart.  After consultation with student assistants, we came to the conclusion that my program was a bit slow. To solve this, I needed to pre-calculate values and I had to write them to a JSON file. This enabled me to completely remove filterdata.js. Since the data was in a different format, I had to make a couple of changes to the functions that draw the map, the donut and the bubbles. Most of the calculations are already done on forehand now. This makes the program a bit faster, but it still has to do some calculations when running, so it's still not super fast. 

![Data](https://github.com/bjente/programmingproject-/blob/master/doc/newdata.jpg)

#### 18-06-2019
- I made an update function for both the bubble and the donutchart. The update function for the bubble chart is not working properly yet. I have an idea why, I will discuss this tomorrow with a tutor.
- I added a default time slider and a dropdown menu. I think I'll implement two time sliders. One represents the startyear, the other represents the end year.

#### 19-06-2019
- I fixed the update function for the bubble chart and I fixed the update function for the donutchart. However, the update bubble function only works when a country is clicked and when a gender is selected from the donutchart. It doesn't respond yet if only a country is clicked. I want to add a transition to the donutchart update function as well.
- I created an update function for the colors of the map. 
- I added a dropdown menu. The colors of the map respond to which category is chosen from the dropdown menu. 

![Dropdown](https://github.com/bjente/programmingproject-/blob/master/doc/dropdown.jpg)

#### 20-06-2019
- Today, I made some huge steps. I decided that I wasn't filtering my data correctly. I had to inverse my logic and I decided to copy my programmingproject folder to made some drastic changes to the program. In stead of adding data to a new list, I decided to begin with copying the JSON data and removing entries I didn't need. Every update function now uses my filterdata function. Filterdata calls different functions to get data in the proper format for the specific graphs. The updatefunctions are all working. Every graph responds to the dropdown menu, both the donut- and the bubblechart change according to which country has been clicked in the map, and my bubblechart changes if you click on the donutchart. 
- I decided to add two reset buttons, so that you don't get stuck in one country and one gender. 
- I still have to add checkboxes to specify the time range. 
- I want to add text blocks with some explanation on the graphs.

![Version 1](https://github.com/bjente/programmingproject-/blob/master/doc/versie1.jpg)
![Version 1](https://github.com/bjente/programmingproject-/blob/master/doc/versie1_2.jpg)

#### 23-06-2019
- I implemented a bootstrap grid system to organize my page. 
- I added textboxes for explanation of the graphs, and textboxes so that the user can keep track of the current years.

#### 24-06-0291
- I added textboxes so that the user can keep track of current gender and current country.
- I cleaned up my code and added comments

#### 25-06-2019
- I was busy cleaning up my code
- I did a code review with fellow student Michael Stroet

#### 26--6-2019
- Still busy cleaning up my code, removing global variables
- Final touch to style document
- Started writing final report
- Handed in code

![Final version](https://github.com/bjente/programmingproject-/blob/master/doc/siteaf.jpg)
![Final version](https://github.com/bjente/programmingproject-/blob/master/doc/siteaf_2.jpg)

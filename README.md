Name: Bente de Bruin

Student number: 11017503

# Insights in the collection of the Museum of Modern Art New York
### Link to website: https://bjente.github.io/programmingproject-/
### Github page: https://github.com/bjente

## **Page walkthrough**
This page gives the user insight in the collection of the Museum of Modern Art New York, abbreviated as MoMA. MoMA is one of the worlds leading museums in introducing the public to contemporary art. In my opinion, art can influence the way you see the world. Therefore, it is important to have an understanding of where MoMA acquired their works. Important questions to ask are for example: how culturally diverse is their collection? In what way are female artists represented in the collection? Which artists are overly represented, what is their gender and where do they come from? This page tries to formulate an answer to these questions. 

The website contains of two pages. The first page is the homepage. A caroussel with pictures from highlights of the collection is shown. The user can scroll down to read a little background information on the project, view the datasource that is used and read the bio of MoMA. The user can navigate to the visualisation page by clicking 'Visualisations' in the navigationbar on top.

## Homepage
![Startpage](https://github.com/bjente/programmingproject-/blob/master/doc/startpage_1.jpg)
![Startpage2](https://github.com/bjente/programmingproject-/blob/master/doc/startpage_2.jpg)

If the user clicks on the visualisations tab in the navigation bar, a new page is loaded. On this page, there are three linked datavisualisations, two of them with legend, a navigationbar at the top with additional buttons and a dropdown menu and a timeslider. The first visualisation is a worldmap.


## Worldmap
![Worldmap](https://github.com/bjente/programmingproject-/blob/master/doc/worldmap.jpg)
This worldmap represents how many works a country has in the collection of MoMA. The darker the color, the more works MoMA acquired from that specific country. In the legend, one can see which color represent which amount. The user can change the period of time by sliding the timeslider below the worldmap. Next to the worldmap, there is an explanation on how to use and read it. In the navigation bar, the user can alter additional filters. In the dropdown menu, the category can be changed. The reset buttons are for resetting the filters and changing the graphs to their initial state. The user can keep track of which country and which gender he has clicked on, by looking at the current gender and current country text in the navigation bar. The user can also click on a country to see additional information on that country. 
![Buttons](https://github.com/bjente/programmingproject-/blob/master/doc/buttons.jpg)


## Donutchart
![Donutchart](https://github.com/bjente/programmingproject-/blob/master/doc/donut.jpg)
The donutchart illustrates how the genders are represented in the collection. By default, it shows how the genders are represented for all countries, in all years in all categories. If the user clicks on a country, the chart updates to show only information about that specific country. Idem when the category or the years are specified. If a user clicks on, for example, the pink part of the chart, only female artists are shown in the bubblechart.

## Bubblechart
![Bubblechart1](https://github.com/bjente/programmingproject-/blob/master/doc/bubble2.jpg)
![Bubblechart2](https://github.com/bjente/programmingproject-/blob/master/doc/bubble1.jpg)
The bubblechar illustrates how many works from specific artists are in the collection of MoMA. The user can specify this by applying different filters to it: country, gender, category and years.

If there is no data available, countries in the worldmap are colored white. Both the donut- and the bubblechart disappear when there is no data. They re-appear when there is data again.

## Repository explained
The repository consists of several folders. 
- Data folder: cleandata.py, filterData.js, toJSON.py are for filtering data and converting a csv file to a JSON file.
               cleanedmoma2.csv is a cleaned csv file, museum_modern_art.csv is the original dataset, world_countries.json is                a json file that is needed to draw the map.
- Design folder: In this folder you can find my design documents.
- Doc folder: In this folder you can find all the images used in this repository.
- Scripts folder: In this folder you can find all the JavaScript files to draw visualisations, manage dropdown menu and buttons and timeslider.
- Style folder: In this folder, you can find the css file which I use to style my page.

### **Dataset and plug-ins**
The dataset used was downloaded from Kaggle. Not all data from this dataset is used, because the file size was too large.
- The worldmap is inspired by: https://bl.ocks.org/piwodlaiwo/3734a1357696dcff203a94012646e932
- The bubblechart is inspired by: http://bl.ocks.org/mmattozzi/7018021
- The update function for the bubblechart is inspired by: https://bl.ocks.org/HarryStevens/54d01f118bc8d1f2c4ccd98235f33848
- The timeslider is inspired by: https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
- The dropdown menu is inspired by: https://codepen.io/tarsusi/pen/reovOV
Dataset source: https://www.kaggle.com/tboyle10/new-york-museum-of-modern-art

#### Plug - ins
- Bootstrap
- D3 tooltip
- D3 simple slider
- D3 V5, license: https://github.com/d3/d3/blob/master/LICENSE
- jQuery, license: MIT license

ⓒ Bente de Bruin, MIT license
ⓒ Universiteit van Amsterdam

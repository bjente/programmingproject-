Bente de Bruin
Studentnumber: 11017503
Final report


# Insights in the collection of the Museum of Modern Art New York

This page gives the user insight in the collection of the Museum of Modern Art New York, abbreviated as MoMA. 
MoMA is one of the worlds leading museums in introducing the public to contemporary art. 
In my opinion, art can influence the way you see the world. Therefore, it is important to have an understanding of where MoMA acquired their works. 
Important questions to ask are for example: how culturally diverse is their collection? In what way are female artists represented in the collection? Which artists are overly represented, what is their gender and where do they come from? 
This page tries to formulate an answer to these questions.

![Worldmap](https://github.com/bjente/programmingproject-/blob/master/doc/worldmap.jpg)
![Donut and Bubble](https://github.com/bjente/programmingproject-/blob/master/doc/siteaf_2.jpg)


# Technical design

My folder structure looks like this: 
![Folder structure](https://github.com/bjente/programmingproject-/blob/master/doc/folderstructure.jpg)
I have a folder for data and dataprocessing called data, a design folder in which I've stored my design document and my initial design, 
a folder called doc in which I stored all the images used in this repository, a script folder in which I have stored all my JavaScript code
and a style folder in which I stored my css file. 
First, I will explain the data folder and how I processed my data.

My data folder looks like this: 
![Data folder](https://github.com/bjente/programmingproject-/blob/master/doc/datafolder.jpg)

Dataprocessing:
- I downloaded a CSV file from kaggle (museum_modern_art.csv) and started processing it with python and pandas (cleandata.py). 
The output of this program was a cleaned csv file (cleanedmoma2.csv). I converted this to a JSON file using tojson.py. The output of this was newjson.json.
- In the beginning of the project, I worked with this newjson.json file. But later on I discovered this wasn't the way to go. I'll explain this more comprehensively in the 'Important details' section.
- Filterdata.js is used for the creation of concfilesmapdonut.json and concilesartist.json. Eventually I worked with these JSON files to create my visualisations.

Datavisualisastions:
For the realization of my datavisualisations, I used several functions, all stored in my scripts folder. 
The scripts folder looks like this:
![Scripts folder](https://github.com/bjente/programmingproject-/blob/master/doc/scriptsfolder.jpg)

- main.js is used to call initial functions and set initial, global variables. It loads data needed to draw the graphs.
Main calls dropDownChange which manages the dropdownmenu, it calls buttonClick, which manages the buttons, it calls drawSlider, which draws and manages the slider,
it calls filterData and stores its return values in a variable newData, it calls drawMap which draws the initial worldmap, it calls drawInitialDonut, which draws the initial donut chart,
it calls drawInitialBubble, which draws the initial bubble chart and it calls updateTexts which is a function that updates certain html elements on the page.
- bubble.js contains two functions: drawInitialBubble for drawing the initial bubble chart and updateBubbles for updating the bubble chart. 
- categorydropdown.js contains three functions: dropDownChange which is a function that keeps track of changes in the dropdown menu and calls update functions for the map, the donut chart and the bubble chart if another category is selected from the dropdownmenu.
buttonClick is a function that keeps track of when one of two resetbuttons is clicked. If so, it resets either currentCountry, currentGender or both to their default values. After that, it updates the graphs that need to be updated.
getCurrentCategory is a very short function that gets the current category from the dropdown menu.
- d3-tip.js is a file that I copied from Justin Palmer. It is for the creation of D3 tooltips.
- getDataReady.js is a file that contains four functions. filterData is a function that is being called when the initial graphs are drawn or when the update functions are being called. It filters out data we don't need and returns new data to draw the new graphs with.
createWorksPerCountryDict is a function that gets called from filterData and takes in the filtered data as an argument. With this new data, it creates a new dictionary for updating the worldmap.
createDonutValues is a function that also gets called from filterData and takes in the filtered data as an argument. It returns the new amounts used for updating the donut chart.
createBubbleValues also gets called from filterData, takes in new filtered data as an argument and returns a new dictionary for updating the bubble chart.
- heatmap.js contains four functions. drawMap is a function that draws the initial worldmap. It also calls update functions for texts, the bubble chart and the donut chart when a user clicked on a country.
drawLegend is a function that draws the initial legend corresponding to the initial worldmap. It calls makeNewLegendValues to get the domain, range, the height of the rectangles and a new color range for the legend.
updateMap is a function that updates the map and its corresponding legend. It also calls makeNewLegendValues to get a new domain, range and height of rectangles for the legend and an new color range for the countries on the map.
makeNewLegendValues is a function that provides a domain, a range a height of rectangles and a new color range for the worldmap and its legend.
- timeslider.js contains one function: drawSlider. It draws the range timeslider and updates the map, the bubble chart and the donut chart when one handle is released.
- updatecurrenttexts.js contains one function: updateTexts. updateTexts updates the html elements 'current country: ' and 'current gender: ' in the navigation bar at the top. 


In the diagram below you see an overview of the file structure for drawing initial graphs and in the other diagram you see how my update pattern works.
![file structure](https://github.com/bjente/programmingproject-/blob/master/doc/overviewinitial.png)

![Update pattern](https://github.com/bjente/programmingproject-/blob/master/doc/updatepattern.png)

HTML pages:
The html files are not stored in a seperate folder. They can be found in the main programmingproject- folder. There are two HTML files:
- index.html is the homepage of the website. It consists of a caroussel with pictures and some background information on the project.
- project.html is an html file that shows the visualisation page with three linked visualisation, a dropdown menu, a time slider and two explanatory textboxes.


# Challenges and important decisions
- The first important decision I made considering processing the data, is that I decided to discard a lot of data. The dataset was huge and it made my program run very slow.
Therefore, I decided to only use data covering the years 1965, 1975, 1985, 1995, 2005, 2015, 2016, 2017 and 2018. In my opinion this still provides a proper representation of the development of the collection of MoMA, because every decade is represented.

- Another important decision was made when I discovered that in the dataset, it was possible that a piece of art was made by several artist with different nationalities and genders. 
This raised an important question: because if a work of art was made by for example a German male and a Hungarian female, which country would get the credits? Every country one 'point'? Or every country 0.5 'points'?
I decided to go for the second option because I didn't want to give a wrong impression on how many works of art MoMA has in their collection. That's why in my visualization, a country can have a decimal number of works.

- My initial idea was to make a worldmap, a bar chart and a bubble chart. There would be a dropdown menu where a user could choose a gender. The bar chart would represent how many works of art a country has per category (i.e. film, photography, etc...)
But since a work of art can be made by multiple artists with multiple genders, I decided that it would be more clear if the options available in the dropdown menu would be the categories. A work of art belongs namely to only one category.
This resulted in changing the initial design idea of my page. I still wanted a chart that would illustrate the male/female ratio, but I found a bar chart not suitable for just three categories. Therefore, I chose to make a donut chart. 
The donut chart now represents how many male-/female-/ and unknown gender artists have contributed to the collection of MoMA.

Initial idea for the bar chart:
![Initial idea bar chart](https://github.com/bjente/programmingproject-/blob/master/doc/barchart.jpg)

How it eventually turned out:
![Donut chart](https://github.com/bjente/programmingproject-/blob/master/doc/donut.jpg)

- Like I stated in the paragraph 'Dataprocessing' above, I used both Python and JavaScript for processing my data. This was not my intention in the first place.
I started processing the dataset with Python and Pandas. Initially, I started working with the JSON file 'newjson.json'. This file was the result of my preprocessing in Python.
At first, the data was in the following format:

"2552": {
        "Artist": "The Aluminum Cooking Utensil Co., New York, NY",
        "Nationality": "USA",
        "Gender": "unknown",
        "Department": "Architecture & Design",
        "DateAcquired": "1955"
    },
    "2555": {
        "Artist": "Thomas Lamb",
        "Nationality": "USA",
        "Gender": "Male",
        "Department": "Architecture & Design",
        "DateAcquired": "1955"
    },
    "2558": {
        "Artist": "Irving Harper",
        "Nationality": "USA",
        "Gender": "Male",
        "Department": "Architecture & Design",
        "DateAcquired": "1955"
    }
    
But when I started creating the graphs, I discovered that a lot of calculations had to be made when running the program. 
For every update, the program needed to iterate over the entire dataset and it had to do a lot of calculations. 
I decided that I had to change my datastructure completely. I needed a JSON file in which calculations were done on forehand.
I had already written a function, called filterData, which can be found in the data folder in the file filterData.js.
This function ran everytime the user requested an update. A technical assistant adviced me to still use this function, but only once, for the creation of the new JSON files: concfilesmapdonut.json and concfilesartist.json.
With these new json files, my program would be a lot faster due to calculations that were made on forehand.

The data for the creation of the map and the donut chart now looked like this:
    
{
	"0": {
		"year": "1965",
		"department": "Architecture & Design",
		"values": [{
			"Nationality": "USA",
			"Count": 39.99,
			"Males": 37,
			"Females": 6,
			"Unknown": 1
		}, {
			"Nationality": "ITA",
			"Count": 23,
			"Males": 22,
			"Females": 2,
			"Unknown": 0
		}, {
			"Nationality": "DEU",
			"Count": 21.99,
			"Males": 24,
			"Females": 0,
			"Unknown": 1
		}, {
			"Nationality": "CHE",
			"Count": 6,
			"Males": 7,
			"Females": 0,
			"Unknown": 0
		}, {
			"Nationality": "FRA",
			"Count": 4,
			"Males": 4,
			"Females": 0,
			"Unknown": 0
		}, {
			"Nationality": "AUT",
			"Count": 2,
			"Males": 2,
			"Females": 0,
			"Unknown": 0
		}, {
			"Nationality": "JPN",
			"Count": 1,
			"Males": 1,
			"Females": 0,
			"Unknown": 0
		}]
	},
	"1": {
		"year": "1975",
		"department": "Architecture & Design",
		"values": [{
			"Nationality": "ITA",
			"Count": 2,
			"Males": 2,
			"Females": 0,
			"Unknown": 0
		}, {
			"Nationality": "USA",
			"Count": 5,
			"Males": 5,
			"Females": 0,
			"Unknown": 0
		}, {
			"Nationality": "GBR",
			"Count": 10,
			"Males": 2,
			"Females": 8,
			"Unknown": 0
		}, {
			"Nationality": "GRC",
			"Count": 1,
			"Males": 1,
			"Females": 0,
			"Unknown": 0
		}]
	}
}

As you can see the data is first organized by year and department (i.e. category). 
It is a lot easier to see how many works in the department 'Architecture & Design' in the year 1965 were produced by American male artists.
This made updating the graphs a bit faster. 

- In week 3, I was busy writing update functions for all my graphs. I have a lot of filters that can be applied and these filters change all of my graphs. 
The graphs do not appear one after another, they are all there when loading the initial page so changing a value in the dropdown menu influences all of the graphs, not just one.
When writing my update functions, I found out that there were a lot of possibilities, especially for the bubble chart. For example: a category could be selected or not, a different period of time could be specified or not, a gender could be selected or not, a country could be selected or not.
In my updateBubble function, I first started simulating all these possibilities with if-else statements. After approximately five if-else statements I decided this was not the way to go. If I would proceed this way, I had to write 24 if-else statements per update function.
This is when I came up with the idea to create one central function that every update function calls before updating the graph. This function is the filterData function in getdataready.js in my scripts folder.
It makes a copy of the original JSON files and applies so called 'filters' to these copies. I have made four filters: one for filtering out nationalities we don't need, one for filtering out genders we don't need, one for categories we don't need and one for years we don't need.
This function returns the new data with which a graph can be updated. This made the update functions a lot shorter and more clear and I didn't have to simulate all the possibilities with if-else statements.

- Furthermore, I decided to add resetbuttons to reset the country and the gender. I implemented this, because otherwise the user would get stuck in his chosen filters meaning that the visualizations can not go back to their default states.
With these buttons, they can.

- In my first design document, I wanted to make a timeslider with equal steps of 1. But since I threw away lots of years, I had to make a custom timeslider. 
At first I thought it would be easier to work with checkboxes, but I didn't really like how this looked. So I made a custom range timeslider with steps of 10 and after 2015 steps of 1. 
I used an attribute called marks in stead of steps. With marks, I could define where the slider should stop so it wouldn't stop at years that are not in my dataset.

There were lots of challenges in the process of creating these visualizations. Since I hadn't worked with JavaScript for five months when I started this project, I even had to look up what a forEach loop was in the beginning.
Secondly, getting the data in the proper format was something I struggled with heavily. As described above, in week 3, I completely changed the structure of my data. This turned out to be the right decision, but getting there was quite difficult.
Another thing that was challenging was getting my head around D3's enter, update exit pattern. I really wanted to implement nice update functions in stead of throwing away the complete svg everytime a graph needed to be updated. 
In the course before this project, 'dataprocessing', I always used to throw away the complete svg. I did not want to do this for this project. Therefore, I had to dive into this pattern, which is kind of essential when using D3. 
I couldn't get my head around it, until the end of week 3. I finally understood it and this enabled me to write my current update functions. At last, I never build a JavaScript file structure like I have in this programmingproject. I have a lot of different files containing different functions. 
In the beginning this was quite difficult to get my head around, but due to this project, I'm getting better at it one function at a time.


# Defense and the ideal situation

### Defense
During this project, I gained quite a deep understanding of JavaScript and D3. Especially if you take into account my prior knowledge of JavaScript and D3.
Changes that I hadn't plan on on forehand were made during this process. For example, the fact that I decided to discard the bar chart and made a donut chart in stead. 
Or the fact that I, in quite a late stage, completely changed the structure of my data. I preprocessed it with Python and Pandas but eventually I finished processing it with JavaScript.
This contributed heavily to me gaining a deeper understanding of JavaScript. Both these changes were beneficial for the final product. What also has been challening but on the other hand very valuable, 
is that I had quite a big dataset. It covered over 60 years of data. What this means among other things, is that this dataset is preserverd and maintained by a lot of different people.
All these people add or remove data in different ways. For example: if a gender is unknown, one can put this in the dataset in a lot of different ways. One can say "gender unknown", "()", "-", "no data available", etc.
Because of this, I learned a lot about working with messy data and filtering data just as long until it is in a workable format. 
The last thing that was pretty convenient for my final result, is that I gained an understanding of an essential but very important concept in D3: the enter update exit pattern. This took me quite some days, but it enabled me to write nice, relatively short, update functions.

### In an ideal situation: 
- I would use way more data.
- I would add a nice transition for the donutcharts.
- I would add links to wikipedia pages of the artists when a user clicks on a specific bubble chart.
- I would add the possibility for the user to compare countries/categories with eachother. By this I mean that when the user clicks a country or a category, two donut charts appear. The user can directly compare these two charts with each other.
- I would add another html page with additional information on contemporary art and its importance for society in general.
- I would seperate functions into smaller functions even more. 
- I would make more seperate JavaScript files.








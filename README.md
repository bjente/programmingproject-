# Programmingproject proposal
### Bente de Bruin
### Studentnumber: 11017503

### Problem statement
In this project I'd like to highlight the EPI per country. EPI stands for environmental perfomance index. The following sentence is quoted from their website: *''The 2018 EPI provides a quantitative basis for comparing, analyzing, and understanding environmental performance for 180 countries. We score and rank these countries on their environmental performance using the most recent year of data available as well as data from approximately a decade earlier.''* source: https://epi.envirocenter.yale.edu/2018/report/category/hlt I think this is important to visualize because in my opinion, more people will become aware of the way their country scores as it comes to environmental performance. In stead of reading a whole report on these issues, it can now be seen through a clear visualization. 


### Solution
I want to make at least three clear visualizations of the environmental performance index per country, understandable for everybody. In the image below, you can see my visual sketch. I gathered images from internet and created a sort of collage of how I want my visualization to look and work. You can find this visualization in the doc folder.
Image sources:
- [World map] (https://fr.wikipedia.org/wiki/Fichier:Newworldmap_grayscale.svg)
- [Horizontal bar chart] (https://konradsobon.gitbooks.io/mandrill-primer/content/horizontal_bar_chart.html)
- [Vertical bar chart] (https://www.qimacros.com/excel-charts-qimacros/excel-bar-graph/)


1. The minimum viable product will contain:
  - A clickable worldmap. The countries will have different colors. The colors correspond to their EPI score.
  - A slide bar. The user can slide to the baseline year or the current year. The colors of the countries in the worldmap will     change with the slide.
  - A barchart with on the y-axis the categories and on the x-axis the score. This is for one specific country, on which the       user has clicked.
  - A barchart with on the y-axis the scores and on the x-axis the countries. This barchart is about one specific category. 
  
2. *Nice to have:*
  - A checkbox for filtering. If the user has chosen one specific category, he/she has to be able to filter out specific           countries, so that the user can compare the scores of *n* different countries.
  - In stead of the *comparison* bar chart, I can implement a different bar chart or another visualization. The user can click     on a specific category, 
    and information on how this particular EPI score was calculated will appear. Since I have access to the raw data that was     used in calculation of the EPI, I can provide the user with information on how the particular score for the category           was calculated. 

Link to the data sources that will be used:
1. [EPI](https://epi.envirocenter.yale.edu/epi-downloads).
I will use the 2018 EPI Scores – Current & Baseline CSV file and perhaps also the raw data files.

External components that will be used:
1. d3-tip
2. d3-bar
3. Some library to help me create a clickable wordlmap: [Worldmap](http://datamaps.github.io/) However, I'm not exactly sure if I can use this and if there is a particular library for this.
4. Pandas

**Hardest part**
The hardest part of this project will be implementing the clickable worldmap if I'm not allowed to use a library for this. Furthermore, I didn't work with interaction before so I think that will be a challenge too. I cannot go into further detail about this interaction part, since I don't know yet how hard this is to implement using D3. This also applies to use of libraries. I'm not sure what all the possibilities of D3 are. Also, if I do choose to use the raw data, it'll be a challenge to retrieve all the data I need and want for all 180 countries. This is something I should take into consideration. I must have a clear question so that I can properly process this data and turn it into a useful addition to my main visualization. 

**Working with the data**
The data I retrieved from [EPI](https://epi.envirocenter.yale.edu/epi-downloads) is already in a CSV format. This means that I'll have to convert it to JSON. I assume that this won't be the hardest part, since I already have a working CSV to JSON converter written in python, using Pandas. I have to use data from the baseline year and the current year, but since there is a database which is **only** about the current year, I can use this database in combination with the database which contains both the values for current and baseline year. I can filter out the current year in this database so that I have one database about current year and one database about baseline year. Furthermore, as mentioned above, I have access to the raw data. This raw data was used to calculate the EPI score. This gives me the opportunity to go into further detail about the EPI score and educate my users in a better way.

**Example**
['Unicef'](https://works.periscopic.com/unicef-child-violence/#all) This is an example of a clickable worldmap. Also, this map contains colors which indicate something about that country. I think this is clearly visualized. A difficult part about this worldmap however, is the fact that it is a globe and the user is able to turn around this globe. This is, I'd say *nice to have*, but not necessary. 





# Programmingproject proposal
### Bente de Bruin
### Studentnumber: 11017503

### Problem statement
**'Feeling happy, feeling sad'.**

In this project I'd like to make an interactive website in which I want to give the user the opportunity to choose between a 'happy' version and a 'sad' version. In the happy version, I'd like to illustrate the numbers of the world happiness report. In the sad version I want to illustrate death rates, for example suicide rates, infant mortality and life expectancy. I want to give the user insight in these numbers because in my opinion it's kind of peculiar to rate things such as happiness and save them in a big database. If your country scores high on the average happiness score, you kind of have to feel happy too, even if that's not the case at all. This database shows for me that there is kind of an obsession with happiness going on. Why do we have to rate these things? Comparing these ratings is at the same time interesting but also a bit weird. Perhaps some users can relate to the ratings, maybe they don't agree at all. The contradictive 'sad' part, I added more as a 'joke'.  


### Solution
I want to make at least three visualizations. On the front page, the user is asked how he/she feels: happy, sad or both. 

1. If the user chooses happy, a bar chart about the world happiness scores per country appears. Nice to have would be if the user can click on a specific bar to get more insight in the score for that specific country. This will be shown in a pie chart. There are several variables that contribute to the happiness score of a certain country. For example: the extent to which GDP contributes to the calculation of the Happiness Score and the extent to which family contributes to the calculation of the Happiness Score. 

2. If the user chooses sad, a bar chart about suicide rates per country appears. 

3. If the user chooses both, two scatterplot appear, one with on the x-axis the world happiness scores and on the y-axis suicide rates per country and one with on the x-axis the extent to which life expectancy contributed to the calculation of the happiness score and on the y-axis the life expectancy.


1. The minimum viable product will contain:
  - A checkbox menu containing the following sentence: 'I'm feeling...' and below three options; happy, sad, both
  - Two bar charts: one about the happiness score per country, one about suicide rates per country.
  - A scatterplot with on the x-axis the world happiness scores and on the y-axis the suicide rates per country
  - A scatterplot with on the x-axis the extent to which life expectancy contributed to the calculation of the Happiness Score     and on the y-axis the life expectancy.
 
  
2. *Nice to have:*
  - In stead of the checkbox as the beginning of the site, a well designed frontpage which leads you to the rest of the page.
  - Several pie charts which display what factors contribute to the happiness score to what extent. 
  - A dropdown menu for the scatterplots where the user can choose between three years. The scatterplots will change according to the year that is being chosen.
 
Link to the data sources that will be used:
1. [World happiness report](https://www.kaggle.com/unsdsn/world-happiness#2017.csv).
2. [Suicide rates](https://data.oecd.org/healthstat/suicide-rates.htm#indicator-chart).
3. [Life expectancy](https://data.oecd.org/healthstat/life-expectancy-at-birth.htm#indicator-chart)

External components that will be used:
1. d3-tip
2. d3-bar
3. d3pie
4. Pandas
5. Bootstrap

### Hardest part
The hardest part of this project will be implementing interactive elements. I had a hard time implementing these during the latest assignment, so that will be challenging. Another challenging part will be keeping my github and code tidy and organized. Working with javascript classes is something I'll have to dive in order to do this correctly. Because I had a hard time preprocessing data with Javascript, I decided that I'm going to use pandas and python to preprocess my data. 

### Working with the data
The data I'll retrieve from Kaggle and OECD is already in a CSV format. This means that I'll have to convert it to JSON. I assume that this won't be the hardest part, since I already have a working CSV to JSON converter written in python, using Pandas. 

### Examples
1.['What makes us happy'](https://charts.animateddata.co.uk/whatmakesushappy/) In this visualization we see an interactive scatterplot which I like a lot, especially designwise. I'd also like to implement a trendline and the fact that the corresponding country is visible when you hover over a dot with your mouse is something that I like as well. 

2.['Pie chart'](http://d3pie.org/) Normally, I don't think pie charts are very clear but the fact that you can see the percentages and the ticks with their corresponding country in this pie chart, makes this one a lot better, in my opinion.

3.['Bar chart'](https://data.oecd.org/healthstat/suicide-rates.htm#indicator-chart) I think this is a perfect and clear way to visualize a bar chart. Especially the countries on the x-axis are readable. The readability of the countries is something I struggled with in my own bar chart. 



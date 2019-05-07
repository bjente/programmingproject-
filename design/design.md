## Design document
#### Bente de Bruin
#### Student number: 11017503

## The data source
The dataset I'll be using is the public dataset from MoMA on their collection: https://www.kaggle.com/tboyle10/new-york-museum-of-modern-art
I downloaded it from Kaggle in a CSV file. 
The categories I need for the realisation of this project are:
- Artist
- Nationality
- Gender
- Department
- Date acquired
- ObjectID

I have to convert the CSV file into a JSON file. I will do this using python and pandas. 
The JSON file will be indexed on the unique objectID's and the columns that are not needed for this project will be dropped.
I have to alter the variable 'date acquired' since it is in this format '1996-05-09'. I only need the year.
Below, there is an example of the format of my JSON file:

{"objectID": 2 {  
Artist: Otto Wagner  
Nationality: Austrian  
Gender: Male  
Department: Architecture & Design  
Date acquired: 1996  
}}

## Which visualizations represent what and how are they linked?
My page will be a 'one pager', meaning that there are three visualizations visible by default:
- A heat world map
- A bar chart
- A bubble chart
- Alongside the world map, you'll find a dropdown menu. 
- Below the world map, there is a range slider with events (years).

### Heat world map
By default, the world map illustrates the amount of works acquired per country from minimum year to maximum year for both genders.
The user can specify the period of time by sliding two handles on the bar. He can adjust the minimum year as well as the maximum year. 
In the dropdown menu, the user can choose between 'female, male or both'. The colors of the world map will change according to the chosen period of time and gender. 
The darker the color, the more works acquired. 

### Bar chart
By default, the bar chart illustrates the amount of works in a specific department acquired for every country in the world.
However, if the user clicks on a country, the bart chart will change according to this choice. So the amount of works in a specific department for that specific country will be shown.
Also, if the user alters the period of time or gender, the bar chart will update as well.

### Bubble chart
By default, the bubble chart illustrates how all the artists are represented in the collection. 
However, if the user clicks on a bar (i.e. a specific department), the bubble chart shows only artists in that specific department.
Also, if the user clicks on a specific country, only artists from that country will be shown. 
Ditto if the user alters period of time or gender.

## D3 Plug ins
- Bootstrap
- jQuery
- TopoJSON
- d3 tip
- d3 legend
- d3 range slider with events






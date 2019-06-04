## Name: Bente de Bruin
## Student number: 11017503

### Proposal programmingproject summer 2019

### Insights in the collection of the Museum of Modern Art New York

### **Introduction**
The aim of this project is to give insight in the collection of the Museum of Modern Art New York. 
I want to make three linked visualizations. 
Questions that the visualizations will answer are the following:
- What is the male/female ratio? 
- How are all the countries represented in the collection?
- In what year MoMA acquired what?
- How many works in a specific category (i.e photography, video installation, sculpture, etc...) from a specific country does MoMA own?
- Which artists in a specific category from a specific country are represented best?

### **Why**
In my opinion it is important that people realise what kind of artworks MoMA, one of world's leading museums in modern art, have in their collection. How well is every country represented? How is the male/female ratio?
Art lets us think about the world surrounding us, art gives us different insights into our society, it's important to realise where art comes from. Who is the creator? This might be a misconception, but I have the feeling that there is one group overly represented: the white male artist. With this project I want to investigate that and if I see my bias confirmed, I think people should know this. 

### **What will these visualizations look like?**
The first visualizations will be a clickable world map. This tells you how many works of art from a specific country in a specific period of time are acquired by MoMA. If you hover over the countries, a tooltip with additional information on each country appears. Below the world map, there is a slider bar. With this slider you can adjust the minimum year on the left side and the maximum year on the right side. There is also a dropdown menu which allows you to choose between 'male', 'female' and both. If you click on a country, a bar chart appears. This bar chart shows the amount of works per category acquired by MoMA in the specific time period. If you click on a bar, a bubble chart appears. This bubble chart shows how every artist is represented in the specific category in the specific time period. 
See my design for further information.

### **Difficulties**
The hardest part will be getting the data in a proper format. Besides that, I never made a clickable world map and a bubble chart before. But since there are lots of examples online, I don't think that's my biggest concern. It has been a while since I worked with JavaScript, so that will take some days of getting used to again.

### **Dataset and libraries**
Dataset source: https://www.kaggle.com/tboyle10/new-york-museum-of-modern-art
Bootstrap
World map: http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f
D3

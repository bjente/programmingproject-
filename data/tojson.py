# Name: Bente de Bruin
# Studentnumber: 11017503
# A program to convert a csv file to a JSON file


import csv, json

csvFilePath = "cleanedmoma2.csv"
jsonFilePath = "newjson.json"

#read the csv and add the data to a dictionary

data = {}
with open (csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:
        id = csvRow["ObjectID"]
        del csvRow["ObjectID"]
        data[id] = csvRow

# write the data to a json file
with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(data, indent = 4))

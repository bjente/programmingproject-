import csv, json

csvFilePath = "datacsv/output_1.csv"
jsonFilePath = "firsthalf.json"

#read the csv and add the data to a dictionary

data = {}
with open (csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:
        id = csvRow["ObjectID"]
        del csvRow["ObjectID"]
        data[id] = csvRow


# print(data)

# write the data toa json file
with open(jsonFilePath, "w") as jsonFile:
    jsonFile.write(json.dumps(data, indent = 4))

import csv
from collections import Counter

data = {}

with open('cleanedmoma.csv', 'r') as f:
    for row in csv.reader(f):
        data[row[5][0: 4]] = {"Male": [], "Female": []}
        count = 0
        for space in row[2]:
            temp = row[2].split(" ")
            temp = set(temp)
            # print(temp)
            # print(row[3])
            sexes = row[4].split(" ")
            sexes = set(sexes)
            for (s,i in sexes):
                data[row[5][0: 4]][s].append(temp[i])
            # data[row[5][0: 4]]
            #string.strip()
            # print(row[5][0: 4])

            if (space.isspace()):
                count += 1
                if count > 1:
                    pass

print(data)


        # if '' in row[2]:
        #     print(row[2])
        # print(len(row[2]))
        # print(type(row[2]))
    # c = Counter(row[2] for row in csv.reader(f))
    # print(c['German'])

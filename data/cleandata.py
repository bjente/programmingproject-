import pandas as pd
import csv
import json
import numpy as np


INPUT_CSV = "museum_modern_art.csv"
values = ['1935','1945','1955','1965','1975','1985','1995','2005','2015','2016','2017','2018']

def organize_data():
    data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8', engine='python')
    data_frame = data_frame.drop(columns=["Title", "Unnamed: 0", "ConstituentID", "ArtistBio", "BeginDate", "EndDate", "Date", "Medium", "Dimensions", "CreditLine", "AccessionNumber", "Classification", "Cataloged", "URL", "ThumbnailURL", "Circumference (cm)", "Depth (cm)", "Diameter (cm)", "Height (cm)", "Length (cm)", "Weight (kg)", "Width (cm)", "Seat Height (cm)", "Duration (sec.)"])
    data_frame = data_frame.replace(to_replace='()', value='unknown')
    data_frame["Nationality"] = data_frame["Nationality"].str.replace("(", "")
    data_frame["Nationality"] = data_frame["Nationality"].str.replace(")", "")
    data_frame = data_frame.replace(to_replace='(Male)', value='Male')
    data_frame = data_frame.replace(to_replace='(Female)', value='Female')
    data_frame["DateAcquired"] = data_frame["DateAcquired"].str.slice(0, -6)
    data_frame = data_frame[data_frame['DateAcquired'].isin(values)]
    data_frame = data_frame.dropna()
    data_frame = data_frame.set_index(["ObjectID"])
    return data_frame

organized = organize_data()

def toCSV(organized):
    CSVoutfile = organized.to_csv('cleanedmoma2.csv')

if __name__ == '__main__':
    organize_data()
    toCSV(organized)

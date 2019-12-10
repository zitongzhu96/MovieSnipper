import pandas as pd
import re
import json
import langdetect

keywords=pd.read_csv("./keywords.csv")
row_count=1
for curr_row in range(keywords.shape[0]):
    line=keywords["keywords"][curr_row]
    new_line='['
    if len(line)>2:
        words=re.split(",",line)
        if langdetect.detect(line)=="en":
            if len(words)%2==0:
                words=[re.sub("[^A-Za-z0-9: ]+","",x) for x in words]
                count=0
                for word in words:
                    prefix=re.sub(" ","",word.split(":")[0],count=1)
                    if len(word.split(":"))==2:
                        value=re.sub(" ","",word.split(":")[1],count=1)
                    else:
                        continue
                    count+=1
                    if count%2==1:
                        new_line+='{\"'+prefix+'\":\"'+value+'\",'
                    elif count%2==0:
                        new_line+='\"'+prefix+'\":\"'+value+'\"}'
                        if count<len(words)-1:
                            new_line+=','
                keywords["keywords"][curr_row]=json.loads(new_line+']')
        else:
            keywords.drop(curr_row,axis=0)
    else:
        keywords.drop(curr_row,axis=0)
    print("Now processing row %d" % row_count)
    row_count+=1

keywords.to_json("./keywords.json",orient="records")




metadata=pd.read_csv("./movies_metadata.csv")
for curr_row in range(metadata.shape[0]):
    genres=metadata["genres"][curr_row]
    prodcution_countries=metadata["production_countries"][curr_row]
    spoken_languages=metadata["spoken_languages"][curr_row]

    if not pd.isna(genres):
        genres=re.sub("\'","\"",genres)
        metadata["genres"][curr_row]=json.loads(genres)
    if not pd.isna(prodcution_countries):
        prodcution_countries=re.sub("\'","\"",prodcution_countries)
        metadata["production_countries"][curr_row]=json.loads(prodcution_countries)
    if not pd.isna(spoken_languages):
        spoken_languages=re.sub("\'","\"",spoken_languages)
        metadata["spoken_languages"][curr_row]=json.loads(spoken_languages)

metadata.to_json("./metadata.json",orient="records")
# mongoimport --db cis550 --collection metadata --drop --file ./metadata.json --jsonArray

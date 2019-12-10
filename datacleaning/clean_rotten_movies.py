import pandas as pd
import re
import json

# rotten_tomatoes_movies=pd.read_csv("./rotten-tomatoes-movies-and-critics-datasets/rotten_tomatoes_movies.csv")

import pandas as pd

f=pd.read_csv("./the-movies-dataset/movies_metadata.csv")
keep_col = ['adult','budget','id','imdb_id',
            'original_language','original_title','popularity','poster_path',
            'release_date','revenue','runtime','status','tagline',
            'title','video','vote_average','vote_count']
new_f = f[keep_col]
print('hi')
new_f.to_csv("new_movies_metadata.csv", index=False)


# keywords.to_json("./keywords.json",orient="records")




# metadata=pd.read_csv("./movies_metadata.csv")
# for curr_row in range(metadata.shape[0]):
#     genres=metadata["genres"][curr_row]
#     prodcution_countries=metadata["production_countries"][curr_row]
#     spoken_languages=metadata["spoken_languages"][curr_row]
#
#     if not pd.isna(genres):
#         genres=re.sub("\'","\"",genres)
#         metadata["genres"][curr_row]=json.loads(genres)
#     if not pd.isna(prodcution_countries):
#         prodcution_countries=re.sub("\'","\"",prodcution_countries)
#         metadata["production_countries"][curr_row]=json.loads(prodcution_countries)
#     if not pd.isna(spoken_languages):
#         spoken_languages=re.sub("\'","\"",spoken_languages)
#         metadata["spoken_languages"][curr_row]=json.loads(spoken_languages)
#
# metadata.to_json("./metadata.json",orient="records")
# # mongoimport --db cis550 --collection metadata --drop --file ./metadata.json --jsonArray

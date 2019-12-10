# import pandas as pd
# # Read data from file 'filename.csv'
# # (in the same directory that your python process is based)
# # Control delimiters, rows, column names with read_csv (see later)
# data = pd.read_csv("/Users/zhengyang/Desktop/CIS_550/final project/rotten-tomatoes-movies-and-critics-datasets/rotten_tomatoes_movies.csv")
# # Preview the first 5 lines of the loaded data
#
# #data_top = data.head()
# #
# #data_top
#
# #for col in data.columns:
# #    print(col)
#
#
# #data['directors'] = data['directors'].str.split(', ')
# #
# ## convert list of pd.Series then stack it
# #data = (data
# # .set_index(['rotten_tomatoes_link','movie_title','movie_info','critics_consensus','poster_image_url','rating','genre','writers','cast','in_theaters_date','on_streaming_date','runtime_in_minutes','studio_name','tomatometer_status','tomatometer_rating','tomatometer_count','audience_status','audience_rating','audience_count','audience_top_critics_count','audience_fresh_critics_count','audience_rotten_critics_count'])['directors']
# # .apply(pd.Series)
# # .stack()
# # .reset_index()
# ## .drop('level_22', axis=1)
# # .rename(columns={0:'directors'}))
# #
# #data_top = data.head()
# ##
# #data_top
#
# #export_csv = data_top.to_csv (r'/Users/wang/Documents/penn_cis550/Project/test2.csv', index = None, header=True)
# # for col in data.columns:
# #     print(col)
#
#
# data['genre'] = data['genre'].str.split(', ')
#
# # convert list of pd.Series then stack it
# data = (data
#  .set_index(['rotten_tomatoes_link','movie_title','movie_info','critics_consensus','poster_image_url','rating','directors','writers','cast','in_theaters_date','on_streaming_date','runtime_in_minutes','studio_name','tomatometer_status','tomatometer_rating','tomatometer_count','audience_status','audience_rating','audience_count','audience_top_critics_count','audience_fresh_critics_count','audience_rotten_critics_count'])['genre']
#  .apply(pd.Series)
#  .stack()
#  .reset_index()
#  .drop('level_22', axis=1)
#  .rename(columns={0:'genre'}))
#
# data_top = data.head()
# #
# data_top
#
# export_csv = data_top.to_csv (r'/Users/zhengyang/Desktop/CIS_550/final project/rotten-tomatoes-movies-and-critics-datasets/A.csv', index = None, header=True)
#
#


import pandas as pd
# Read data from file 'filename.csv'
# (in the same directory that your python process is based)
# Control delimiters, rows, column names with read_csv (see later)
data = pd.read_csv("/Users/zhengyang/Desktop/CIS_550/final project/rotten-tomatoes-movies-and-critics-datasets/rotten_tomatoes_movies.csv")


for col in data.columns:
    print(col)


data['genre'] = data['genre'].str.split(', ')

# convert list of pd.Series then stack it
data = (data
 .set_index(['rotten_tomatoes_link','movie_title','critics_consensus','poster_image_url','rating','directors','writers','cast','in_theaters_date','on_streaming_date','runtime_in_minutes','studio_name','tomatometer_status','tomatometer_rating','tomatometer_count','audience_status','audience_rating','audience_count','audience_top_critics_count','audience_fresh_critics_count','audience_rotten_critics_count'])['genre']
 .apply(pd.Series)
 .stack()
 .reset_index()
 .drop('level_21', axis=1)
 .rename(columns={0:'genre'}))

#data_top = data.head()
##
#data_top

export_csv = data.to_csv (r'/Users/zhengyang/Desktop/CIS_550/final project/rotten-tomatoes-movies-and-critics-datasets/cleanedMovies.csv', index = None, header=True)# Preview the first 5 lines of the loaded data
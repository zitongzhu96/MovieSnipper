# Project: Movie Snipper

##### [Final Project in CIS550]
##### [Group Member: Chengzhuo Wang, Zhengyang Fang, Zitong Zhu, Yifeng Mao]

### Introduction

We want to find a topic that has a large and useful dataset accumulated over the years and is both useful to improve people’s living quality and entertaining at the same time. Therefore, we pick movies as a broad topic. One interesting fact about movies is that even though there are a lot of movie reviews websites, the ones that can combine and compare different movie ratings and reviews are rare. We aim to create a website that can provide movie lovers as much information about a specific movies as possible and find relief from the busy modern daily lives when visiting our website.

IMDB contains the most comprehensive information about basic movies information on the world. Rotten tomatoes, on the other hand, is a movie and television review aggregation website that has started accumulating review data ever since 1998. Since both of them contains ratings on movies, it intrigued us to find out the difference between the ratings. For example, we are interested in seeing what movies has been rated high in IMDB but low in Rotten Tomatoes and vice versa. We also define a score for each movie combining both the rating from IMDB and Rotten Tomatoes to find out the overall top rated movies across two different databases. It will also be useful to find recommended movies using our website. Once a user clicks on a movie, we will recommend five movies that are either directed by the same director or contain genre that are roughly a superset of the movies selected.

Users will login to our website and our website will store each movies they have viewed before. Since we want to provide the user as enjoyable as possible a visit of our website, we create a feature that can recommend each user with another user based on the most common genre both users have seen and also recommend the movies that the recommended user has seen but the current user has not.


### Technologies used
Our full stack web application employed Angular.js as frontend, Node.js and express as controller, sql database as backend. We store our data in two databases. Everything except “movie_info” in “rotten_tomatoes_movies” is stored in MySQL since the relationship between rotten tomatoes dataset and IMDB dataset is well-defined. We will store movie_info in Mongo.

### Build Instructions
![#f03c15](https://placehold.it/15/f03c15/000000?text=+) `Attention: Please download the whole MySql Data from the shared google drive file. From the MySqlDataImport, there will be two files missing since over 100mb.`
- Dump all cleaned data into MySql Workbench, remember user, port, password and database name
- Unzip MovieSnipper.zip
- open terminal; cd MovieSnipper
- npm install → install required modules
- Edit routes/index.js file 
 1. Under `mysql.createConnection()` change `user, port, password, database` to your local database 
 2. Under `MongoClient.connect()` change `db.db()` to your mongoDB database
- node app → launch the app listening on port 8001
- website could be accessed at http://localhost:8001/


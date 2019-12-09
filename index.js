var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:'3306',
  password: 'longpassword',
  database: 'cis550_proj'
});

connection.connect(function(err) {
  if (err) {
    console.log("Error Connection to DB" + err);
    return;
  }
  console.log("Connection established...");
});

//Mongdb connection
const MongoClient = require('mongodb').MongoClient;
// Create a database named "students":
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, (err, db) => {
  if (err) {
    // error creating database
    console.error(err.message);
    throw err;
  } else {
    // Create a db
    const myDb = db.db('CIS550');
    console.log('Database created! Connected to the movie database.');
    // Create a collection named students
  }
});
//_________

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'Login.html'));
});

router.post('/register', (req, res) => {
  var username=req.body.username;
  var pwd=req.body.password;
  var icon=req.body.icon;
  var check = 'SELECT password FROM user_info WHERE username = "' + username + '"';
  var register = "INSERT INTO user_info (username, password, icon) VALUES (\""+username+"\",\""+pwd+"\",\""+icon+"\");";
  connection.query(check, function(err, result) {
    var message = JSON.stringify(result);
    if (message.length==2){
      connection.query(register,function(err) {
        if (err) console.log('insert error: ', err);
        else {
          res.json({
            name: username,
            status: 'success'
          });
        }        
    });
    }else{
      res.json({
        status: 'fail'
      });
      console.log("The user is already existed");
    }
  });
});

router.post('/login', (req, res) => {
  var username=req.body.username;
  var pwd=req.body.password;
  var check = 'SELECT password FROM user_info WHERE username = "' + username + '"';
  connection.query(check, function(err, result) {
    var message = JSON.stringify(result);
    if (message.length==2){
      res.json({
        status: 'unexist'
      });
    }else{
      message = JSON.parse(message);
      if (err) {
        res.json({
          status: 'error'
        });
      }
      if (message[0].password == pwd) {
        res.json({
          status: 'success',
          user: username,
        });
        router.get('/MainPage/'+username, function (req, res) {
          res.sendFile(path.join(__dirname, '../', 'views', 'MainPage.html'));
        });
        router.get('/HistoryPage/'+username, function (req, res) {
          res.sendFile(path.join(__dirname, '../', 'views', 'HistoryPage.html'));
        });
        router.get('/Login', function (req, res) {
          res.sendFile(path.join(__dirname, '../', 'views', 'Login.html'));
        });
      } else {
        res.json({
          status: 'fail'
        });
      }
    }
  });
});

router.post('/popularList',(req, res) => {
  var query1='WITH mp as \
    (SELECT rotten_tomatoes_movies.movie_title, poster_image_url \
    FROM movies_metadata inner join rotten_tomatoes_movies on rotten_tomatoes_movies.movie_title = movies_metadata.title \
    WHERE title <> "" \
    ORDER BY popularity DESC \
    LIMIT 100)\
    SELECT movie_title, poster_image_url \
    FROM mp \
    ORDER BY RAND() \
    LIMIT 5;'
  connection.query(query1, function(err, rows) {
    res.json(rows);
  });
});
router.post('/ratingList',(req, res) => {
  var query2='with hr as (SELECT movie_title, poster_image_url FROM rotten_tomatoes_movies ORDER BY audience_rating DESC LIMIT 100) \
    SELECT movie_title, poster_image_url from hr ORDER BY RAND() \
    LIMIT 5;'
  // SELECT movie_title, poster_image_url FROM rotten_tomatoes_movies ORDER BY RAND() LIMIT 5;'
  connection.query(query2, function(err, rows) {  
    res.json(rows);
  });
});
router.post('/recentList',(req, res) => {
  var query3='WITH mp as \
  (SELECT movie_title, poster_image_url \
  FROM rotten_tomatoes_movies ORDER BY in_theaters_date \
  LIMIT 100) \
  SELECT movie_title, poster_image_url \
  FROM mp \
  ORDER BY RAND() \
  LIMIT 5;'
  connection.query(query3, function(err, rows) {
    res.json(rows);
  });
});
router.post('/imdbHighList',(req, res) => {
  var query4='with diff as\
  (select movie_title, (rtm.audience_rating - mm.vote_average*10) as ranks \
  from rotten_tomatoes_movies rtm inner join movies_metadata mm on mm.title = rtm.movie_title and mm.original_language = "en"), \
  diff_n_rtm as\
  (select distinct diff.movie_title, rtm.poster_image_url, diff.ranks \
  from rotten_tomatoes_movies rtm \
  inner join diff on diff.movie_title = rtm.movie_title\
  order by diff.ranks ASC\
  limit 5\
  )\
  select distinct dnr.movie_title, dnr.poster_image_url, dnr.ranks \
  from diff_n_rtm dnr\
  inner join movies_metadata mm on dnr.movie_title = mm.title;'
  connection.query(query4, function(err, rows) {
    res.json(rows);
  });
});
router.post('/rtHighList',(req, res) => {
  var query5='with diff as\
  (select movie_title, (rtm.audience_rating - mm.vote_average*10) as ranks \
  from rotten_tomatoes_movies rtm inner join movies_metadata mm on mm.title = rtm.movie_title and mm.original_language = "en"), \
  diff_n_rtm as\
  (select distinct diff.movie_title, rtm.poster_image_url, diff.ranks \
  from rotten_tomatoes_movies rtm \
  inner join diff on diff.movie_title = rtm.movie_title\
  order by diff.ranks DESC\
  limit 5\
  )\
  select distinct dnr.movie_title, dnr.poster_image_url, dnr.ranks \
  from diff_n_rtm dnr\
  inner join movies_metadata mm on dnr.movie_title = mm.title;'
  connection.query(query5, function(err, rows) {
    res.json(rows);
  });
});

router.post('/goInfo/:mvid',(req, res) => {
  var mvid=req.body.title;
  var username=req.body.username;
  var query6='SELECT rotten_tomatoes_link AS link FROM rotten_tomatoes_movies WHERE movie_title="'+mvid+'";';
  connection.query(query6, function(err, rows) {
      if (rows[0]!=undefined){
        var rtid=rows[0].link;
        router.get('/InfoPage/'+username+'/::'+rtid, function (req, res) {
          res.sendFile(path.join(__dirname, '../', 'views', 'InfoPage.html'));
        });
        connection.query(`INSERT INTO History (username, movie_id) VALUES(?,?);`, [username,rtid], (err, rows) => {
          if (err){
            console.log(err);
          }else{
            console.log("Successful Insert!");
          }
        });
        res.json({
          'status':'success',
          'id':rtid
        })
      }else{
        res.json({
          'status':'fail'
        })
      }

    });
});

router.post('/addPoster', (req, res) => {
  var rtid=req.body.rtid;
  var get_info = 'SELECT on_streaming_date as date, movie_title, directors,rating,cast, audience_rating, cast, rating, genre, runtime_in_minutes,poster_image_url AS url FROM rotten_tomatoes_movies WHERE rotten_tomatoes_link = "' + rtid + '";';
  connection.query(get_info, function(err, result) {
    if (err) {
      console.log('poster error: ', err);
    }else{
      year=result[0].date.split("-");
      res.json({
        'release': year[0],
        'status': 'success',
        'title':result[0].movie_title,
        'url': result[0].url,
        'director':result[0].directors,
        'runtime':result[0].runtime_in_minutes,
        'genre':result[0].genre,
        'actors':result[0].cast,
        'rating':result[0].rating,
        'score':result[0].audience_rating
      });
    }        
  });
});

router.post('/suggestList',(req, res) => {
  const rtid=req.body.rtid;
  var query7=`(With directors_name as (
    select G.directors from cis550_proj.new_rotten_tomatoes_dir G
    where G.rotten_tomatoes_link = ?)
    SELECT movie_title, poster_image_url
    FROM cis550_proj.new_rotten_tomatoes_dir C, directors_name D
    where C.directors = D.directors AND C.rotten_tomatoes_link <> ?
    ORDER BY RAND() LIMIT 2)
    union
    (
    with Given_movie as(
        select movie_title, genre, rating
        from cis550_proj.new_rotten_tomatoes_dir_genre G
        where G.rotten_tomatoes_link = "/m/0814255" ),
        All_movie as(
        select M.movie_title, M.genre, M.rating, M.poster_image_url
        from cis550_proj.new_rotten_tomatoes_dir_genre M),
        Num_genre AS (
        select COUNT(genre) as num from Given_movie)
    select A.movie_title, A.poster_image_url
    from Num_genre N ,Given_movie M join All_movie A on M.genre  = A.genre AND M.rating = A.rating  where M.movie_title<>A.movie_title
    Group by A.movie_title, A.poster_image_url HAVING COUNT(A.genre)>=ALL(select num-1 from Num_genre)
    ORDER BY RAND() LIMIT 3
    )`
  connection.query(query7, [rtid, rtid], function(err, rows) {
    res.json(rows);
  });
});

router.post('/reviewsList',(req, res) => {
  var rtid=req.body.rtid;
  var query8='SELECT critic_publication, review_content,review_date FROM rotten_tomatoes_reviews WHERE rotten_tomatoes_link="'+rtid+'" AND review_content <> "" ORDER BY review_date DESC LIMIT 5;';
  connection.query(query8, function(err, rows) {
    res.json(rows);
  });
});

router.get('/viewHistory',(req,res)=>{
  var username=req.query.username;
  var query9 = 'SELECT rtm.movie_title, rtm.poster_image_url FROM History h, rotten_tomatoes_movies rtm WHERE rtm.rotten_tomatoes_link=h.movie_id AND username=?;';
  connection.query(query9, [username],function(err, rows) {
    res.json(rows);
  });
});
// router.post('/search',(req,res) => {
  
// });
router.get('/getUser',(req,res) => {
  const username=req.query.username;
  var query10=`WITH my_genre AS(
     select genre, count(*) as num
     from new_rotten_tomatoes_dir_genre g 
     join History uh on uh.movie_id =g.rotten_tomatoes_link
     where uh.username = ?
     group by genre
     order by num DESC
     limit 1
    )
    select username, count(*) as num2
    from History uh join new_rotten_tomatoes_dir_genre g on uh.movie_id =g.rotten_tomatoes_link
    join my_genre mg on mg.genre = g.genre
    where username <> ?
    group by username
    order by num2 DESC
    limit 1;`
    connection.query(query10, [username,username], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        if (rows.length>0){
          res.json(rows[0].username);
        } else {
          res.json("");
        }
      }
      
      
    });
});
router.get('/suggestByUser', (req,res) => {
  const username=req.query.username;
  console.log(username);
  var query11=`with my_genre AS (
   select genre, count(*) as num
   from new_rotten_tomatoes_dir_genre g 
   join History uh on uh.movie_id =g.rotten_tomatoes_link
   where uh.username = ?
   group by genre
   order by num DESC
   limit 1
  ), 
  my_b AS (select username, count(*) as num2
  from History uh join new_rotten_tomatoes_dir_genre g on uh.movie_id =g.rotten_tomatoes_link
  join my_genre mg on mg.genre = g.genre
  where username <> ?
  group by username
  order by num2 DESC
  limit 1), 
  x as (select H.movie_id, R.movie_title, R.poster_image_url
  from History H, rotten_tomatoes_movies R, my_b
  where H.username = my_b.username AND H.movie_id = R.rotten_tomatoes_link)
  select x.movie_title, x.poster_image_url
  from x
  where x.movie_id
  NOT IN
  (select movie_id
  from History
  where username = ?)
  LIMIT 5;`;
  connection.query(query11, [username,username,username], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        if (rows.length>0){
          res.json(rows);
        } else {
          res.json([]);
        }
      }
    });
});

router.post('/search', (req,res) => {
  const title=req.body.title;
  const lastQuery = `SELECT movie_title, poster_image_url 
  FROM rotten_tomatoes_movies WHERE movie_title = ?`;
  connection.query(lastQuery, [title], function(err, rows) {
      console.log(rows);
      res.json(rows);
    });
});

//Mongo query
router.get('/getIntro', (req, res) => {
  const rtid=req.query.rtid;
  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      const myDb = db.db('CIS550');
      // Get movie intro
      myDb.collection('rotten_tomatoes_movies').find({rotten_tomatoes_link: rtid}, (err1, result) => {
        if (err1) {
          console.error(err.message);
          throw err1;
        }
        result.toArray((err2, rows) => {
          if (err2) {
            throw err2;
          }
          res.json({
            message: 'success',
            info: rows[0].movie_info,
          });
        });
      });
    }
  });
  });
module.exports = router;

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

/* GET home page. */
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
    console.log(rows);
    res.json(rows);
  });
});
router.post('/ratingList',(req, res) => {
  var query2='with hr as (SELECT movie_title, poster_image_url FROM rotten_tomatoes_movies ORDER BY audience_rating DESC LIMIT 100) \
    SELECT movie_title, poster_image_url from hr ORDER BY RAND() \
    LIMIT 5;'
  // SELECT movie_title, poster_image_url FROM rotten_tomatoes_movies ORDER BY RAND() LIMIT 5;'
  connection.query(query2, function(err, rows) {
    console.log(rows);  
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
    console.log(rows);
    res.json(rows);
  });
});
router.post('/imdbHighList',(req, res) => {
  var query4='WITH diff as \
  (select movie_title, (rtm.audience_rating - mm.vote_average*10) as ranks \
  from rotten_tomatoes_movies rtm inner join movies_metadata mm on mm.title = rtm.movie_title) \
  select distinct diff.movie_title, rtm.poster_image_url, diff.ranks \
  from rotten_tomatoes_movies rtm \
  inner join movies_metadata mm on rtm.movie_title = mm.title \
  inner join diff on diff.movie_title = rtm.movie_title \
  order by diff.ranks ASC \
  limit 5; '
  connection.query(query4, function(err, rows) {
    console.log(rows);
    res.json(rows);
  });
});
router.post('/rtHighList',(req, res) => {
  var query5='WITH diff as \
  (select movie_title, (rtm.audience_rating - mm.vote_average*10) as ranks \
  from rotten_tomatoes_movies rtm inner join movies_metadata mm on mm.title = rtm.movie_title) \
  select distinct diff.movie_title, rtm.poster_image_url, diff.ranks \
  from rotten_tomatoes_movies rtm \
  inner join movies_metadata mm on rtm.movie_title = mm.title \
  inner join diff on diff.movie_title = rtm.movie_title \
  order by diff.ranks DESC \
  limit 5; '
  connection.query(query5, function(err, rows) {
    console.log(rows);
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

  // res.json({status: "success"});
});

router.post('/addPoster', (req, res) => {
  var rtid=req.body.rtid;
  console.log(rtid);
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
  var query7='SELECT movie_title, poster_image_url FROM rotten_tomatoes_movies ORDER BY RAND() LIMIT 5;'
  connection.query(query7, function(err, rows) {
    console.log(rows);
    res.json(rows);
  });
});

router.post('/reviewsList',(req, res) => {
  var rtid=req.body.rtid;
  var query8='SELECT critic_publication, review_content,review_date FROM rotten_tomatoes_reviews WHERE rotten_tomatoes_link="'+rtid+'" AND review_content <> "" ORDER BY review_date DESC LIMIT 5;';
  connection.query(query8, function(err, rows) {
    console.log(rows);
    res.json(rows);
  });
});

router.post('/search',(req,res) => {
  
});

module.exports = router;

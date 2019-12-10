CREATE DATABASE  IF NOT EXISTS `cis550_proj` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cis550_proj`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: cis550_proj
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `History`
--

DROP TABLE IF EXISTS `History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `History` (
  `username` varchar(12) NOT NULL,
  `movie_id` varchar(110) NOT NULL,
  PRIMARY KEY (`username`,`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `History`
--

LOCK TABLES `History` WRITE;
/*!40000 ALTER TABLE `History` DISABLE KEYS */;
INSERT INTO `History` VALUES ('chengzhuo','/m/1009123-hamlet'),('chengzhuo','/m/1029314-dick_tracy'),('chengzhuo','/m/1046035-airborne'),('chengzhuo','/m/1068177-richard_iii'),('chengzhuo','/m/elektra'),('chengzhuo','/m/kellys_heroes'),('chengzhuo','/m/logans_run'),('chengzhuo','/m/missionary'),('chengzhuo','/m/omen_iv_the_awakening'),('chengzhuo','/m/outside_the_law_2001'),('peter','/m/1083461-avengers'),('peter','/m/1209933-puss_in_boots'),('peter','/m/a_dogs_purpose'),('peter','/m/escape_from_planet_earth_2013'),('peter','/m/national_lampoons_christmas_vacation'),('peter','/m/the_archer_2017'),('potato','/m/1014137-monkey_business'),('potato','/m/1022823-village_of_the_damned'),('potato','/m/1078955-game'),('potato','/m/alien3'),('potato','/m/bmx_bandits'),('potato','/m/fight_club'),('potato','/m/gone_girl'),('potato','/m/honey_i_shrunk_the_kids'),('potato','/m/never_been_kissed'),('potato','/m/summer-wars'),('potato','/m/the_smurfs'),('tomato','/m/1015758-outoftowners'),('tomato','/m/1156246-casanova'),('tomato','/m/a_dogs_purpose'),('tomato','/m/chocolat'),('tomato','/m/final_countdown'),('tomato','/m/salmon_fishing_in_the_yemen'),('yifeng','/m/1015758-outoftowners'),('yifeng','/m/americanization_of_emily'),('yifeng','/m/carpool_1996'),('yifeng','/m/hospital'),('yifeng','/m/love_story'),('yifeng','/m/man_of_la_mancha'),('yifeng','/m/married_to_it'),('yifeng','/m/momentum_generation'),('yifeng','/m/race_to_witch_mountain'),('yifeng','/m/see_no_evil_hear_no_evil'),('yifeng','/m/star_trek_generations'),('yifeng','/m/taking_care_of_business'),('yifeng','/m/teachers'),('yifeng','/m/the-gods-must-be-crazy'),('zitong','/m/10009462-g_force'),('zitong','/m/1001193-around_the_world_in_80_days'),('zitong','/m/1013772-meteor'),('zitong','/m/1022823-village_of_the_damned'),('zitong','/m/corvette_summer'),('zitong','/m/farscape_the_peacekeeper_wars'),('zitong','/m/firefox'),('zitong','/m/futureworld'),('zitong','/m/late_for_dinner'),('zitong','/m/logans_run'),('zitong','/m/lost_skeleton_of_cadavra'),('zitong','/m/orca_the_killer_whale'),('zitong','/m/shoes_of_the_fisherman'),('zitong','/m/spark_a_space_tail'),('zitong','/m/the_secret_life_of_walter_mitty_2013'),('zitong','/m/time_after_time'),('zyfang','/m/1002512-black_rain'),('zyfang','/m/1094723-celebration'),('zyfang','/m/1099999-beowulf'),('zyfang','/m/a_dogs_purpose'),('zyfang','/m/all_the_money_in_the_world_2017'),('zyfang','/m/aviator'),('zyfang','/m/be_natural_the_untold_story_of_alice_guy_blache'),('zyfang','/m/blade_runner'),('zyfang','/m/caseys_shadow'),('zyfang','/m/dear_wendy'),('zyfang','/m/empire_strikes_back'),('zyfang','/m/kingdom_of_heaven'),('zyfang','/m/someone_to_watch_over_me'),('zyfang','/m/the_martian'),('zyfang','/m/wrongfully_accused');
/*!40000 ALTER TABLE `History` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-09 20:37:13

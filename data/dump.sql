-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2015 at 03:10 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dallenjs`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `gameID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `path` varchar(30) DEFAULT NULL,
  `version` varchar(30) DEFAULT NULL,
  `blurb` text,
  PRIMARY KEY (`gameID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gameID`, `name`, `path`, `version`, `blurb`) VALUES
(1, 'Reemlift', NULL, NULL, NULL),
(2, 'Crashy', NULL, NULL, 'This was one of the first programs I made. It will lag slow windows XP computers until the frame refresh stops. Its some fun, if it works.'),
(3, 'GalaxyWars', NULL, NULL, 'I was playing with rotating sprites and made a game about space ships. &apos;ins&apos; key does something interesting...'),
(4, 'Jumper', NULL, NULL, 'Its like doodle jump, only really, really bad'),
(5, 'The Archers Rebellion', NULL, NULL, 'First game I made, gotta love it. I made a sequel too!'),
(6, 'The Archers Rebellion 2', NULL, NULL, NULL),
(7, 'To Arms', NULL, NULL, 'For some reason GameMaker refused to take my 25$ that would allow me to make 3d games so I made a side scrolling shooter. Took a lot of time to make those gun sprites work without GMpro.');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

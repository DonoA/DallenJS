-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2015 at 04:53 AM
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
  `path` varchar(100) DEFAULT NULL,
  `extension` varchar(5) DEFAULT NULL,
  `version` varchar(30) DEFAULT NULL,
  `blurb` text,
  PRIMARY KEY (`gameID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gameID`, `name`, `path`, `extension`, `version`, `blurb`) VALUES
(1, 'Reemlift', NULL, NULL, NULL, NULL),
(2, 'Crashy', '/downloads/crashy', 'exe', '1,2,3', 'This was one of the first programs I made. It will lag slow windows XP computers until the frame refresh stops. Its some fun, if it works.'),
(3, 'Space Wars', '/downloads/space-wars', 'exe', NULL, 'I was playing with rotating sprites and made a game about space ships. &apos;ins&apos; key does something interesting...'),
(4, 'Jumper', NULL, NULL, NULL, 'Its like doodle jump, only really, really bad'),
(5, 'The Archers Rebellion', '/downloads/return-of-the-archers-rebellion', 'exe', NULL, 'First game I made, gotta love it. I made a sequel too!'),
(6, 'The Archers Rebellion 2', '/downloads/return-of-the-archers-rebellion-2', 'exe', NULL, 'The squeal to ROTAR, despite playing the first a fair bit I didn''t seem to understand that more enemies did not make the game more fun. Maybe some game developers nowadays could figure that out too...'),
(7, 'To Arms', NULL, NULL, NULL, 'For some reason GameMaker refused to take my 25$ that would allow me to make 3d games so I made a side scrolling shooter. Took a lot of time to make those gun sprites work without GMpro.'),
(8, 'iPad Sim', '/downloads/ipad', 'exe', '1,2', 'This was a silly little project that was meant to simulate an iPad on your screen.'),
(9, 'Pong', '/downloads/pong', 'exe', NULL, 'It''s a remake of the simple pong game. Another one of the really early ones made more because I wanted a clone of pong to play at school.'),
(10, 'Mouse Maze', '/download/mousemaze', 'swf', '1,2', 'A classic mouse maze, in this game you must keep your mouse within the black lines at all costs. Its a simple flash game.');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

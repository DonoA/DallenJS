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
-- Table structure for table `plugins`
--

CREATE TABLE IF NOT EXISTS `plugins` (
  `pluginID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `repo` varchar(30) DEFAULT NULL,
  `version` varchar(30) DEFAULT NULL,
  `download` varchar(30) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`pluginID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `plugins`
--

INSERT INTO `plugins` (`pluginID`, `name`, `repo`, `version`, `download`, `type`) VALUES
(1, 'Quests', 'MCME-Quests', NULL, NULL, 'bukkit'),
(3, 'Plotmanager', 'MCME-Plotmanager', NULL, NULL, 'mcme'),
(5, 'Warlords', 'Warlords', NULL, NULL, 'bukkit'),
(6, 'Kits', 'BasicKitPlugin', NULL, NULL, 'bukkit'),
(7, 'Mages', 'Bukkit-MageMod', NULL, NULL, 'bukkit'),
(8, 'EnforcerSuite', 'MCME-EnforcerSuite', NULL, NULL, 'mcme'),
(9, 'TheGaffer', 'MCME-TheGaffer', NULL, NULL, 'mcme'),
(10, 'TheHelper', 'MCME-TheHelper', NULL, NULL, 'mcme'),
(11, 'Perks', 'MCME-Perks', NULL, NULL, 'mcme'),
(12, 'Events', 'MCME-Events', NULL, NULL, 'mcme'),
(13, 'Tours', 'MCME-Tours', NULL, NULL, 'mcme');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

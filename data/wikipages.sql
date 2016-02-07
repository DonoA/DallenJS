-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2016 at 06:46 AM
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
-- Table structure for table `wikipages`
--

CREATE TABLE IF NOT EXISTS `wikipages` (
  `PageID` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(20) NOT NULL,
  `title` varchar(40) NOT NULL,
  `template` int(11) NOT NULL,
  `content` text NOT NULL,
  `edittype` varchar(15) NOT NULL,
  `createdby` varchar(20) NOT NULL,
  PRIMARY KEY (`PageID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

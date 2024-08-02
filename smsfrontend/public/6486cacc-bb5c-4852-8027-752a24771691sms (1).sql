-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2024 at 01:09 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sms`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

CREATE TABLE `attachment` (
  `id` bigint(20) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `taskid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attachment_seq`
--

CREATE TABLE `attachment_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachment_seq`
--

INSERT INTO `attachment_seq` (`next_val`) VALUES
(601);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `description`, `logo`, `name`) VALUES
(853, 'testing ra gud ni siya bitaw hehehe', '75b7e6b1-c40b-4a91-ab2c-ed0694d3609eS9pCIFcoBkuBm2SHIvLG.jpg', 'hello world'),
(902, 'asd', 'a854ba96-1667-459e-a189-51401e980615dfb720f0f9cee346193f1f6ff9646776.jpg', 'haler');

-- --------------------------------------------------------

--
-- Table structure for table `company_seq`
--

CREATE TABLE `company_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_seq`
--

INSERT INTO `company_seq` (`next_val`) VALUES
(1001);

-- --------------------------------------------------------

--
-- Table structure for table `deliverable`
--

CREATE TABLE `deliverable` (
  `id` bigint(20) NOT NULL,
  `has_submission` bit(1) DEFAULT NULL,
  `is_approved` bit(1) DEFAULT NULL,
  `taskid` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deliverable_seq`
--

CREATE TABLE `deliverable_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliverable_seq`
--

INSERT INTO `deliverable_seq` (`next_val`) VALUES
(1001);

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `id` bigint(20) NOT NULL,
  `deliverableid` bigint(20) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submission_seq`
--

CREATE TABLE `submission_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submission_seq`
--

INSERT INTO `submission_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` bigint(20) NOT NULL,
  `due` datetime(6) DEFAULT NULL,
  `instructions` varchar(255) DEFAULT NULL,
  `progress` int(11) DEFAULT 0,
  `title` varchar(255) DEFAULT NULL,
  `companyid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `due`, `instructions`, `progress`, `title`, `companyid`) VALUES
(1052, '2024-08-01 08:00:00.000000', 'asdqwe', 0, 'sdqwe', 853);

-- --------------------------------------------------------

--
-- Table structure for table `task_seq`
--

CREATE TABLE `task_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_seq`
--

INSERT INTO `task_seq` (`next_val`) VALUES
(1151);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `access_type` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `access_type`, `company`, `firstname`, `lastname`, `password`, `profile_photo`, `username`) VALUES
(252, NULL, NULL, 'jandel', 'macbaecha', 'qwe', NULL, '19-2605-198');

-- --------------------------------------------------------

--
-- Table structure for table `user_seq`
--

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_seq`
--

INSERT INTO `user_seq` (`next_val`) VALUES
(351);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachment`
--
ALTER TABLE `attachment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKniu8sfil2gxywcru9ah3r4ec5` (`name`);

--
-- Indexes for table `deliverable`
--
ALTER TABLE `deliverable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

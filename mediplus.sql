-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 23, 2023 at 04:43 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mediplus`
--

-- --------------------------------------------------------

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
CREATE TABLE IF NOT EXISTS `donor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender` varchar(50) NOT NULL,
  `age` int NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `blood_type` varchar(5) NOT NULL,
  `hospital_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date_donation` timestamp NOT NULL,
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `donor`
--

INSERT INTO `donor` (`id`, `gender`, `age`, `weight`, `blood_type`, `hospital_id`, `user_id`, `date_donation`, `note`, `status`) VALUES
(1, 'male', 30, '80.00', 'B+', 4, 8, '2022-12-28 16:00:00', '3E9FLjZzz3xuDEI', 'pending'),
(2, 'female', 24, '55.00', 'B+', 3, 2, '2022-11-21 16:00:00', '', 'completed'),
(3, 'male', 30, '75.00', 'A+', 1, 14, '2023-06-19 16:00:00', '', 'pending'),
(4, 'male', 30, '75.00', 'A+', 2, 1, '2023-12-04 16:00:00', '', 'completed'),
(5, 'female', 38, '78.00', 'A+', 1, 9, '2023-06-01 16:00:00', '', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
CREATE TABLE IF NOT EXISTS `hospital` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `location` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`id`, `name`, `phone`, `email`, `location`) VALUES
(1, 'Amiya Kozey', '390-391-3554', 'your.email+fakedata63406@gmail.com', 'Ea dignissimos dolor ab quia cumque quae.'),
(2, 'Stephen Cronin', '283-637-1440', 'your.email+fakedata68907@gmail.com', 'Necessitatibus quo in.'),
(3, 'Bradley Mitchell', '431-787-5385', 'your.email+fakedata40181@gmail.com', 'Et dolor consequatur.'),
(4, 'Terrell Nolan', '024-531-2472', 'your.email+fakedata10002@gmail.com', 'Unde provident dolores distinctio error voluptates rerum minima explicabo.'),
(5, 'Lorenza Satterfield', '700-629-1928', 'your.email+fakedata45647@gmail.com', 'Aut possimus vel repellat.');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blood_type` varchar(5) NOT NULL,
  `date_request` timestamp NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `hospital_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `blood_type`, `date_request`, `notes`, `status`, `hospital_id`, `user_id`) VALUES
(1, 'B+', '2023-03-29 16:00:00', '', 'pending', 5, 2),
(2, 'B+', '2023-03-22 16:00:00', '', 'approved', 2, 1),
(3, 'B+', '2023-03-30 16:00:00', '', 'pending', 1, 27);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone_number` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `avatar` varchar(55) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `username`, `phone_number`, `role`, `status`, `avatar`, `created_at`) VALUES
(1, 'ammar', 'ammar@ammar.com', 'Ammar', 'ammar', '123456789', 'admin', 'active', NULL, '2023-03-22 06:59:04'),
(2, 'Myrl Gislason', 'your.email+fakedata58398@gmail.com', 'hMeAz2cVyIgwzA9', 'Berniece91', '716-068-3409', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(3, 'Tanya McLaughlin', 'your.email+fakedata73612@gmail.com', 'Oh810x2CCnrDoay', 'Trey_Daniel', '805-270-5125', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(4, 'Adelle Haley', 'your.email+fakedata81211@gmail.com', 'nMgqcnMvRmoQS_F', 'Elroy.Armstrong15', '905-332-1175', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(5, 'Kade Rosenbaum', 'your.email+fakedata65415@gmail.com', 'Gna2j3ZUE9WgnzY', 'Schuyler_Schoen', '806-340-4415', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(6, 'Margarette Shanahan', 'your.email+fakedata23123@gmail.com', 'F1n_vVs0XGzgeok', 'Priscilla47', '722-534-5138', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(7, 'Elna Larson', 'your.email+fakedata52192@gmail.com', 'k4IFQaHuFlHqvvQ', 'Marcel_Ledner', '106-626-0360', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(8, 'Aubrey Bernhard', 'your.email+fakedata64700@gmail.com', 'jPXAgsL8LaxwO2S', 'Stone.Macejkovic27', '153-497-0942', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(9, 'Sidney Paucek', 'your.email+fakedata78486@gmail.com', 'bKVxgKMU1KS3fmU', 'Christelle50', '549-366-8118', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(10, 'Wilson Bergnaum', 'your.email+fakedata74109@gmail.com', 'RILaeNdwfiqfCjh', 'Adaline.Rutherford70', '373-072-8900', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(11, 'Amir Bahringer', 'your.email+fakedata42421@gmail.com', '6VFAq1q2kq_F6P3', 'Kimberly_Dibbert12', '092-920-6498', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(12, 'Gabriella Jenkins', 'your.email+fakedata18421@gmail.com', 'DuUEvR3UnPdZw0K', 'Maynard_Rippin28', '268-448-2209', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(13, 'Evan Ernser', 'your.email+fakedata87574@gmail.com', 'GIFCPh2SmjWSF0A', 'Bernadine69', '932-140-7178', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(14, 'Presley Nitzsche', 'your.email+fakedata53930@gmail.com', '9aawkcLfhDqPu31', 'Dawson_Effertz', '714-512-3948', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(15, 'Vidal Wehner', 'your.email+fakedata65401@gmail.com', 'qrScjYDdoq2KvQz', 'Nathan94', '068-977-2508', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(16, 'Cleveland Turner', 'your.email+fakedata58516@gmail.com', 'ojbvGXyRHhNN_Ft', 'Clint_Bode', '449-574-8957', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(17, 'Issac Hamill', 'your.email+fakedata85709@gmail.com', 'tG5KIE8wGLlgbFf', 'Caleigh4', '950-721-3491', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(18, 'Karley Gleason', 'your.email+fakedata29633@gmail.com', 'scaNXA7PCqov5Y5', 'Lexie_Hoppe', '593-904-5814', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(19, 'Kallie Wintheiser', 'your.email+fakedata60679@gmail.com', 'iwmWMwTFfp8_UpX', 'Santina15', '733-062-4919', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(20, 'Angelita Zulauf', 'your.email+fakedata62342@gmail.com', '7_nxJznqgujtKE9', 'Hanna.Ortiz52', '922-107-8820', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(21, 'Brenden Hegmann', 'your.email+fakedata47610@gmail.com', 'CJKkssH929zHkff', 'Jakob_Connelly', '014-280-1385', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(23, 'Lysanne Legros', 'your.email+fakedata87801@gmail.com', 'AXA79IyygwlC9nX', 'Myrtle.Fadel86', '292-490-9039', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(24, 'Nat Hammes', 'your.email+fakedata14567@gmail.com', 't5bFhGIHRu6n6rD', 'Berniece_Kuhic', '358-633-1582', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(25, 'Hailey Howell', 'your.email+fakedata67864@gmail.com', '78PiNaiYbyv_CrP', 'Vicenta.Monahan', '207-756-1582', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(26, 'Hailie Emmerich', 'your.email+fakedata18353@gmail.com', 'bpsVlpNsdhFQ6zL', 'Celestino_Jenkins', '354-567-9833', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(27, 'Ozella Rutherford', 'your.email+fakedata11249@gmail.com', 'Juv3DxQAgwK2_aD', 'Sincere30', '319-964-5224', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(28, 'Tess Hansen', 'your.email+fakedata17889@gmail.com', 's9mZYa2etxhTvh2', 'Giovanni_Fahey', '971-704-9585', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(29, 'Cleo Anderson', 'your.email+fakedata51501@gmail.com', 'n5Gz5l2dyoDioLW', 'Hiram.Altenwerth', '615-936-5221', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(30, 'Marilie Reichert', 'your.email+fakedata78277@gmail.com', 'kL5sWfCJ96SoNen', 'Kellen56', '259-028-5698', 'user', 'active', NULL, '2023-03-22 06:59:04'),
(31, 'Shanie Donnelly', 'your.email+fakedata94343@gmail.com', 'Thx0wdrkc7Mx3X1', 'Amya.Schuster51', '881-965-7533', 'user', 'active', NULL, '2023-03-22 06:59:04');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donor`
--
ALTER TABLE `donor`
  ADD CONSTRAINT `donor_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `donor_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

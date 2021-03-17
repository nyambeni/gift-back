-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 10, 2021 at 10:48 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gift_box`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`) VALUES
(5432, 'admin@gmail.com', 'admin543');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `total_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `emailAddress` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `firstname`, `lastname`, `emailAddress`, `password`) VALUES
(101, 'lethu', 'nkosi', 'lethu@gmail.com', 'Lethu@123'),
(102, 'lee', 'nks', 'nks@gmail.com', 'nks@1234'),
(104, NULL, NULL, NULL, NULL),
(105, 'firstname', 'nkwana', 'james@gmail.com', '$2a$08$i/dQaS.pK4rxlAWV0QGOK..qvXfqcSfOkvDYxEg00bwJWTU0Wmt0O'),
(106, 'Mahlatse', 'Nkwana', 'Mahlatse@gmail.com', '$2a$08$d7s2ySGqNqyD7X.lGMrzd.pmgC0zluWSBKjlgedVQIqRNKLWoKdia'),
(107, NULL, 'nkosi', 'Mahe@gmail.com', '$2a$08$hubCrJ5Sd0vtbbU8iW6JgeFanv29FWQtcpSctBdkld3glBFVyTPQe'),
(108, 'RUBEN', 'nkosi', 'Maheh@gmail.com', '$2a$08$cfUCboQwrvGdyB.XHeyWmepF9G4CsOLfSSGGaqd/v1q6N.NJwWDJu'),
(109, 'james', 'smith', 'james@gmail.com', '123568');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `item_price` int(10) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `item_descri` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `category`, `item_price`, `size`, `title`, `image`, `item_descri`) VALUES
(5, 'birthday', 30, 'small', 'blackbox', NULL, '10CM * 10 CM BOX, PERFECT FOR GIFTING SOMEONE WITH ON THEIR BIRTHDAY'),
(6, 'anniversary', 60, 'small', 'rosegoldbox', NULL, '10CM * 10CM BOX, PERFECT FOR THE SMALL GIFT ON YOU\'RE ANNIVERSARY.  DIAMONDS COME IN SMALL PACKAGES TYPE OF BOX');

-- --------------------------------------------------------

--
-- Table structure for table `order_tbl`
--

CREATE TABLE `order_tbl` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL DEFAULT current_timestamp(),
  `cust_id` int(11) DEFAULT NULL,
  `item_title` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `totalPrice` double DEFAULT NULL,
  `citySuburb` varchar(250) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `phoneNumber` varchar(250) DEFAULT NULL,
  `postalCode` varchar(250) DEFAULT NULL,
  `province` varchar(250) DEFAULT NULL,
  `streetAddress` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_tbl`
--

INSERT INTO `order_tbl` (`order_id`, `order_date`, `cust_id`, `item_title`, `quantity`, `totalPrice`, `citySuburb`, `name`, `phoneNumber`, `postalCode`, `province`, `streetAddress`) VALUES
(1, '2021-03-05', 105, 'jabas1', 0, 45, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '2021-03-05', 105, 'jabas231', 0, 45, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '2021-03-05', 105, 'rangerover', 0, 45, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '2021-03-08', 108, 'blaackbox', 0, 70, NULL, NULL, NULL, NULL, NULL, NULL),
(5, '2021-03-08', 108, 'tiny box2', 0, 298, 'soshanguve', NULL, '04125897556', '0122', 'gauteng', '5453423 sosha'),
(6, '2021-03-08', 108, 'tiny box2', 0, 298, 'soshanguve', 'lizan', '04125897556', '0122', 'gauteng', '5453423 sosha');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `pay_id` int(11) NOT NULL,
  `total_price` double DEFAULT NULL,
  `paydate` date NOT NULL DEFAULT current_timestamp(),
  `cust_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`pay_id`, `total_price`, `paydate`, `cust_id`) VALUES
(1, NULL, '2021-03-08', 108),
(2, NULL, '2021-03-08', 108),
(3, 70, '2021-03-08', 108),
(4, NULL, '2021-03-10', 108),
(5, 300, '2021-03-10', 108);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `report_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wish_id` int(11) NOT NULL,
  `item_title` varchar(100) DEFAULT NULL,
  `item_price` double DEFAULT NULL,
  `cust_id` int(11) DEFAULT NULL,
  `item_description` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`wish_id`, `item_title`, `item_price`, `cust_id`, `item_description`, `category`, `size`, `image`) VALUES
(1, 'fruit box', 45, 105, 'label is the back', NULL, NULL, NULL),
(2, 'fruit', 45, 105, 'labelis  is the back', NULL, NULL, NULL),
(4, 'blackbox', 70, 108, 'A BLACK BOX, FOR GIFTING', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cust_id` (`cust_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`pay_id`),
  ADD KEY `cust_id` (`cust_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wish_id`),
  ADD KEY `cust_id` (`cust_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5433;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_tbl`
--
ALTER TABLE `order_tbl`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD CONSTRAINT `order_tbl_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


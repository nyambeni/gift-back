-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2021 at 05:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `giftbox_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`) VALUES
(5432, 'admin@gmail.com', 'admin543'),
(5433, 'admin@giftbox.com', '$2a$08$Lod4rMwsCXte04.30MJa8O8aN3fYbxlBk/g0z4ocHqLLx.DZPYVS2');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `title` varchar(250) DEFAULT NULL,
  `size` int(11) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `cust_id` int(11) NOT NULL,
  `images` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `title`, `size`, `price`, `description`, `cust_id`, `images`) VALUES
(26, 'Super Green', 0, 150, 'Camo Green Box.', 117, 'http://localhost:3000/admin/uploads/picture_1620659775078.png');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `firstname`, `lastname`, `emailAddress`, `password`) VALUES
(116, 'Jack', 'Sparrow', 'jack@gmail.com', '$2a$08$yLyN/3sEYBI5ur3378DXD.85WyY/8be4gs1MAlhVai0BdOnFXZqJ2'),
(117, 'Rock', 'Lee', 'lee@gmail.com', '$2a$08$ar6Hwt.58L88RTeBSpfrzu0FLW8sZE/spMZa3fir1j42dno80zkP6'),
(118, 'Peter', 'Griffen', 'griffen@gmail.com', '$2a$08$k0Tq6KhdBN/FsYgKG.iJrO3nbITB0JXEBFJNZG8b2SntZjRqZWZDi'),
(119, 'WellS', 'Fargo', 'wells@gmail.com', '$2a$08$NNto3.PUJDtiMspJ710QK.YoeHUjNtugPakkRZ5uWzlPpsdg2lBjS'),
(120, 'Bobby', 'Diesel', 'bobby@gmail.com', '$2a$08$Mf930i8bFH7Rf57PqPe4x.Kx7qdMJrzmP025EB2ghqX24fEFo.7f6'),
(121, 'Zack', 'Will', 'zack@yahoo.com', '$2a$08$.acYjWBUQHCqJNIAwSR/mONGcg7YI3MD3.sLMdrarZXmB.IpFEBI2');

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
  `item_descri` varchar(500) DEFAULT NULL,
  `avail_item` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `category`, `item_price`, `size`, `title`, `image`, `item_descri`, `avail_item`) VALUES
(81, 'Birthday', 130, 'medium', 'Cloth Work', 'http://localhost:3000/admin/uploads/picture_1620659640545.png', 'Cloth', 120),
(82, 'Graduation', 150, 'medium', 'Super Green', 'http://localhost:3000/admin/uploads/picture_1620659775078.png', 'Camo Green Box.', 100),
(83, '', 105, 'medium', 'Pink', 'http://localhost:3000/admin/uploads/picture_1620659846962.png', 'Medium Size Box, with a pink color and light pink stripes.', 100),
(84, 'Christmas', 150, 'medium', 'Silver Scotch', 'http://localhost:3000/admin/uploads/picture_1620659908709.png', 'Medium Size Box, with silver scotch pattern.', 100),
(85, 'Baby Shower', 210, 'small', 'Merry Merry', 'http://localhost:3000/admin/uploads/picture_1620659958236.png', 'XS Size Box, only comes in white and with a green and white string.', 50),
(86, 'Valentine', 150, 'small', 'Red Rosey', 'http://localhost:3000/admin/uploads/picture_1620660029036.png', 'Small red boxes, that comes in a set.', 200),
(87, 'Valentine', 150, 'medium', 'Summer Loving', 'http://localhost:3000/admin/uploads/picture_1620660075598.png', 'Heart shaped box.', 200),
(88, 'Wedding', 120, 'medium', 'Pinkie', 'http://localhost:3000/admin/uploads/picture_1620660169900.png', 'Pink box, with a blue bow.', 100),
(90, 'Valentine', 50, 'small', 'Purple House', 'http://localhost:3000/admin/uploads/picture_1620660253942.png', 'Small Box that comes in a house form.', 50);

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
(58, '2021-04-15', 117, 'Super Green', 1, 120, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(59, '2021-04-15', 117, 'Pinkie', 2, 120, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(60, '2021-04-15', 117, 'Purple House', 1, 50, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(61, '2021-04-23', 117, 'Summer Loving', 2, 130, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(62, '2021-05-05', 117, 'Pink Happiness', 1, 100, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(63, '2021-05-05', 117, 'Blue & White', 3, 80, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(64, '2021-05-06', 116, 'Purple House', 1, 50, 'TSHWANE', 'Jack', '079 077 0098', '0152', 'GAUTENG', 'Sosh St.'),
(65, '2021-05-06', 116, 'Pinkie', 5, 120, 'TSHWANE', 'Jack', '079 077 0098', '0152', 'GAUTENG', 'Sosh St.'),
(66, '2021-05-07', 117, 'Pinkie', 2, 120, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(67, '2021-05-07', 117, 'Pinkie', 1, 120, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(68, '2021-05-10', 116, 'Pinkie', 3, 120, 'Sosha', 'Rock', '00000000000', '0125', 'Tshwane', 'Street'),
(69, '2021-05-10', 117, NULL, 1, 80, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(70, '2021-05-10', 117, 'Purple House', 1, 80, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.'),
(71, '2021-05-10', 117, 'Yellow Bow', 1, 110, 'Daling', 'Rock', '0792587946', '0111', 'North West', 'JDK St.');

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
(75, 'Pinkie', 120, 117, 'Small Size Box, pink and white stripe box.', 'Wedding', 'small', 'http://localhost:3000/admin/uploads/picture_1618438583048.png'),
(76, 'Pink Happiness', 100, 117, NULL, 'Baby Shower', 'Small', 'http://localhost:3000/admin/uploads/picture_1618439138256.png'),
(79, 'Divine', 80, 117, 'Medium Size Box, has some pattern and comes in red.', 'Christmas', 'medium', 'http://localhost:3000/admin/uploads/picture_1618439873012.png'),
(80, 'Pink Happiness', 100, 116, NULL, 'Baby Shower', 'Small', 'http://localhost:3000/admin/uploads/picture_1618439138256.png'),
(81, 'Bronie and Red', 80, 116, 'Small Size Box.', 'Wedding', 'small', 'http://localhost:3000/admin/uploads/picture_1618439067141.png'),
(82, 'Pinkie', 120, 116, 'Small Size Box, pink and white stripe box.', 'Wedding', 'small', 'http://localhost:3000/admin/uploads/picture_1618438583048.png'),
(83, 'Purple House', 50, 116, 'XS Size Box, built to look like a house.', 'Wedding', 'Small', 'http://localhost:3000/admin/uploads/picture_1618438417758.png'),
(84, 'Super Green', 150, 117, 'Camo Green box.', 'Graduation', 'medium', 'http://localhost:3000/admin/uploads/picture_1620637391851.png');

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
  ADD KEY `cust_id` (`cust_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5434;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `order_tbl`
--
ALTER TABLE `order_tbl`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

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
  MODIFY `wish_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD CONSTRAINT `order_tbl_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

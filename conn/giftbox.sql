-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2020 at 07:36 PM
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
-- Database: `giftbox`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `totalPrice` double GENERATED ALWAYS AS (`price` * `qty`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `item_name`, `price`, `description`, `qty`) VALUES
(2, 'lindo', 50, 'person', 200);

-- --------------------------------------------------------

--
-- Table structure for table `cart_det`
--

CREATE TABLE `cart_det` (
  `cart_id` int(11) NOT NULL,
  `Item_name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `totalPrice` double GENERATED ALWAYS AS (`price` * `qty`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart_det`
--

INSERT INTO `cart_det` (`cart_id`, `Item_name`, `price`, `description`, `qty`) VALUES
(3, 'james', 65, 'party', 10),
(4, 'member', 200, 'person', 10),
(5, 'Lindo', 200, 'person', 1),
(6, 'food', 100, 'top food', 200),
(7, 'food', 100, 'top food', 200),
(8, 'food', 100, 'top food', 200);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(255) NOT NULL,
  `cart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `full_name`, `email`, `phone`, `address`, `city`, `province`, `code`) VALUES
(1, 'Nokuthula Khumalo', 'nok65@gmail.com', '0711969659', '153 Troye Street', 'Pretoria', 'Gautang', '0002'),
(2, 'Nokuthula Khumalo', 'nok65@gmail.com', '0711969659', '153 Troye Street', 'Pretoria', 'Gautang', '0002');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_category`) VALUES
(1, 'Gift', 'Party'),
(2, 'Junk', 'Wedding'),
(3, 'roll-on', 'Party'),
(4, 'potato', 'Wedding');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `contact`, `password`) VALUES
('2147483647', 'Member', 'member@gmail.com', '0711969659', '123456789'),
('2147483647', 'Member', 'member65@gmail.com', '0711969659', '123456789'),
('2147483647', 'Member', 'member6@gmail.com', '0711969659', '123456789'),
('9405115639082', 'Member', 'member258@gmail.com', '0711969659', '123456789'),
('3243236246646', 'Masondo', 'lolololo@gmail.com', '15641546155', '215496554'),
('9405115639082', 'Member', 'member25@gmail.com', '0711969659', '123456789'),
('9405115639082', 'Member', 'member20000@gmail.com', '0711969659', '123456789'),
('1234567891234', ' users', ' icep@icep.com', ' 1234567890', '1234'),
('9702146088085', 'lethu', 'lethu@gmail.com', '0736370982', '60886088'),
('9405115639082', 'Member', 'member20@gmail.com', '0711969659', '123456789'),
('9405115639082', 'Member', 'memberX@gmail.com', '0711969659', '123456789'),
('9405115639082', 'Member', 'X@gmail.com', '0711969659', '1234567'),
('9405115639082', 'Member', 'A@gmail.com', '0711969659', 'sbonelo'),
('9405115639082', 'Member', '1@gmail.com', '0711969659', 'sbonelo'),
('9405115639082', 'Member', 'EK@gmail.com', '0711969659', '12345'),
('9405115639082', 'Member', 'ff@gmail.com', '0711969659', 'b'),
('9979496486469', 'hance', 'fgkghvkjhf@gmail.com', '023658999', '147258369'),
('4646456666476', 'gigaba', 'mkhonza@yahoo.com', '0736370982', '147258369'),
('94051154554351', 'XXX', 'mfanakazane65@gmail.com', '0711969659', '12345'),
('94051154554351', 'XXX', 'mfanakazane@gmail.com', '0711969659', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `totalPrice` double GENERATED ALWAYS AS (`price` * `qty`) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `name`, `price`, `description`, `qty`) VALUES
(3, 'james', 65, 'party', 10),
(4, 'member', 200, 'person', 10),
(5, 'Lindo', 200, 'person', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `cart_det`
--
ALTER TABLE `cart_det`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart_det`
--
ALTER TABLE `cart_det`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Máj 07. 23:53
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `signey`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `groups`
--

CREATE TABLE `groups` (
  `groupID` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `permission` tinyint(4) NOT NULL DEFAULT 0,
  `enterTimeRange` varchar(25) NOT NULL,
  `exitTimeRange` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `groups`
--

INSERT INTO `groups` (`groupID`, `name`, `permission`, `enterTimeRange`, `exitTimeRange`) VALUES
(6, '9A', 1, '12000', '16000'),
(7, '10D', 1, '12000', '16000'),
(8, '13BC', 1, '12000', '16000');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `logs`
--

CREATE TABLE `logs` (
  `logID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `entryTime` datetime DEFAULT NULL,
  `exitTime` datetime DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `logs`
--

INSERT INTO `logs` (`logID`, `userID`, `entryTime`, `exitTime`, `action`) VALUES
(1, 6, '2025-04-01 22:45:00', NULL, NULL),
(2, 6, NULL, '2025-04-02 22:45:39', NULL),
(3, 8, '2025-03-10 22:48:17', NULL, NULL),
(4, 8, NULL, '2025-03-11 22:48:30', NULL),
(5, 10, '2025-02-20 22:48:39', NULL, NULL),
(6, 10, NULL, '2025-02-21 22:48:53', NULL),
(7, 7, '2025-01-30 22:49:10', NULL, NULL),
(8, 7, NULL, '2025-01-31 22:49:26', NULL),
(9, 4, '2025-05-01 22:49:39', NULL, NULL),
(10, 4, NULL, '2025-05-02 22:49:46', NULL),
(11, 2, '2025-04-22 22:49:53', NULL, NULL),
(12, 2, NULL, '2025-04-23 22:50:03', NULL),
(13, 11, '2025-03-05 22:50:36', NULL, NULL),
(14, 11, NULL, '2025-02-06 22:50:52', NULL),
(15, 3, '2025-01-15 22:51:04', NULL, NULL),
(16, 3, NULL, '2025-01-16 22:51:24', NULL),
(17, 5, '2025-05-04 22:52:19', NULL, NULL),
(18, 5, NULL, '2025-05-05 22:52:30', NULL),
(19, 9, '2025-03-14 22:52:43', NULL, NULL),
(20, 9, NULL, '2025-03-15 22:52:53', NULL),
(21, NULL, '2025-05-06 22:53:01', NULL, 'OPEN'),
(22, NULL, NULL, '2025-05-07 22:53:25', 'CLOSE');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(32) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('fWHU0kjJZ9zWUvLSfdE4sIMYT9xO0flL', '2025-05-14 21:12:40', '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T20:21:02.034Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"userID\":1,\"email\":\"admin@admin\",\"password\":\"$2b$10$k3USbuPDqgy9DWoBHm84AerD.BT4Oq1H6cs4qgNDomph2ym5BZzsu\",\"name\":\"Admin\",\"phone\":null,\"groupID\":null,\"cardNumber\":\"154223229132\"}},\"expires\":\"2025-05-14T20:21:02.034Z\"}', '2025-05-07 20:21:01', '2025-05-07 21:12:40'),
('JlGq8be4DSvgSyBSZdVNiANXbfBZgtKh', '2025-05-14 21:35:23', '{\"cookie\":{\"originalMaxAge\":604800000,\"expires\":\"2025-05-14T20:21:27.009Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"userID\":1,\"email\":\"admin@admin\",\"password\":\"$2b$10$k3USbuPDqgy9DWoBHm84AerD.BT4Oq1H6cs4qgNDomph2ym5BZzsu\",\"name\":\"Admin\",\"phone\":null,\"groupID\":null,\"cardNumber\":\"154223229132\"}},\"expires\":\"2025-05-14T20:21:27.009Z\"}', '2025-05-07 20:21:26', '2025-05-07 21:35:23');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `groupID` int(11) DEFAULT NULL,
  `cardNumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`userID`, `email`, `password`, `name`, `phone`, `groupID`, `cardNumber`) VALUES
(1, 'admin@admin', '$2b$10$k3USbuPDqgy9DWoBHm84AerD.BT4Oq1H6cs4qgNDomph2ym5BZzsu', 'Admin', NULL, NULL, '154223229132'),
(2, 'janosvitez10@gmail.com', '$2b$10$6MH5ttxguLdyZMVZZL1wrOuJ4J/c2PhES2YEXEW2bcrOMjSgLDr12', 'János', NULL, 6, NULL),
(3, 'matyaskiraly@gmail.com', '$2b$10$wfguMCpiB5Qdwb7OGJKyjelAxQX7wbXioF5koRUT0wOYgRfY4Pedu', 'Mátyás', NULL, 6, NULL),
(4, 'horthymiklos@gmail.com', '$2b$10$vlN1Ce8rV78AbTbpDa0IPuw69ohQDVgC0e4OLJznBg2orvLDhsheS', 'Miklós', NULL, 6, NULL),
(5, 'mohamedabdul@gmail.com', '$2b$10$1Jxr97F1hEzLGzaViMqYEOghJ2JaLhylAz9lTU0sCG30wKMgv.ijO', 'Mohamed', NULL, 6, NULL),
(6, 'blackyamal@gmail.com', '$2b$10$FeIu6F1Onfr0YZvHmBGb2e5.d9gY6G7yQ8N5JcRbH9eAR1wODeXpS', 'Yamal', NULL, 7, NULL),
(7, 'gojosatoru@gmail.com', '$2b$10$AAMTW3hUe6joqQpz6AmhA.TJIFfWkAY0FR/BcR0dd3A30JfsoGTh.', 'Satoru', NULL, 7, NULL),
(8, 'borat001@gmail.com', '$2b$10$LIa.3gjTCa9gSSlaIlmgVO9./Xim6gcc0n9lyxcb.MxWj6i0DitPa', 'Borat', NULL, 7, NULL),
(9, 'zohan20@gmail.com', '$2b$10$haRXhcUzPsWeD.Vv5DD89eME5AH.UmMOSXqHucO9WKcg15haoSLvq', 'Zohan', NULL, 8, NULL),
(10, 'gallevente20@gmail.com', '$2b$10$GL2Cq1Ayoxc1rD5WcYzKx.n6cBoDXXzQJViH90JH.OojId9C9sn1a', 'Gál Levente', NULL, 8, NULL),
(11, 'joli@gmail.com', '$2b$10$qHWczATPvQUZt0aF3vqt..O8B1L2xWFQhW4Qqi6XpJviFfIoLeDgi', 'Joli Levente', NULL, 8, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupID`);

--
-- A tábla indexei `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `groupID` (`groupID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `groups`
--
ALTER TABLE `groups`
  MODIFY `groupID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `logs`
--
ALTER TABLE `logs`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`groupID`) REFERENCES `groups` (`groupID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

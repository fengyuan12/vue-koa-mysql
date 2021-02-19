-- --------------------------------------------------------
-- 主机:                           192.168.73.128
-- 服务器版本:                        5.7.31 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 studyserver 的数据库结构
CREATE DATABASE IF NOT EXISTS `studyserver` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `studyserver`;

-- 导出  表 studyserver.file 结构
CREATE TABLE IF NOT EXISTS `file` (
  `Id` varchar(36) NOT NULL,
  `Date` datetime NOT NULL,
  `Title` varchar(64) NOT NULL,
  `Type` varchar(36) NOT NULL,
  `CoverPictureUrl` varchar(64) NOT NULL,
  `ContentUrl` varchar(64) NOT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedId` varchar(36) DEFAULT NULL,
  `CreatedName` varchar(36) DEFAULT NULL,
  `ModifyTime` datetime DEFAULT NULL,
  `ModifyId` varchar(36) DEFAULT NULL,
  `ModifyName` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  studyserver.file 的数据：~2 rows (大约)
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` (`Id`, `Date`, `Title`, `Type`, `CoverPictureUrl`, `ContentUrl`, `Remark`, `CreatedTime`, `CreatedId`, `CreatedName`, `ModifyTime`, `ModifyId`, `ModifyName`) VALUES
	('cafa79f2-3427-483f-92df-87ad41336c04', '2021-02-03 13:12:05', '测试', 'OTHER', 'http://127.0.0.1:3000/7af67790-65de-11eb-8cb0-6df805a8409d.jpg', 'http://127.0.0.1:3000/85cdbc50-65de-11eb-8cb0-6df805a8409d.7z', '1234567', '2021-02-03 13:13:23', '39f85c72-7f36-ba29-31d4-13c1ac45b85a', 'admin', '2021-02-03 13:34:13', '39f85c72-7f36-ba29-31d4-13c1ac45b85a', 'admin'),
	('7badecb3-ae42-4045-9a4b-0d3788ea8616', '2021-02-03 13:40:55', '文本', 'TXT', 'http://127.0.0.1:3000/87e5ca10-65e2-11eb-8cb0-6df805a8409d.jpg', 'http://127.0.0.1:3000/8b5463f0-65e2-11eb-8cb0-6df805a8409d.txt', '文本测试数据', '2021-02-03 13:42:13', '39f85c72-7f36-ba29-31d4-13c1ac45b85a', 'admin', NULL, NULL, NULL);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;

-- 导出  表 studyserver.notice 结构
CREATE TABLE IF NOT EXISTS `notice` (
  `Id` char(36) NOT NULL,
  `Date` datetime NOT NULL,
  `Title` varchar(64) NOT NULL,
  `Content` text,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedId` char(36) DEFAULT NULL,
  `CreatedName` varchar(36) DEFAULT NULL,
  `ModifyTime` datetime DEFAULT NULL,
  `ModifyId` char(36) DEFAULT NULL,
  `ModifyName` char(36) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  studyserver.notice 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;

-- 导出  表 studyserver.role 结构
CREATE TABLE IF NOT EXISTS `role` (
  `Id` char(36) NOT NULL,
  `CreatedTime` datetime NOT NULL,
  `CreatedId` char(36) DEFAULT NULL,
  `Name` varchar(36) NOT NULL,
  `Code` varchar(36) NOT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  studyserver.role 的数据：~3 rows (大约)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`Id`, `CreatedTime`, `CreatedId`, `Name`, `Code`, `Remark`) VALUES
	('04cfc4e3-3c23-4202-b69e-7563a9b08431', '2020-12-14 00:00:00', NULL, '管理员', 'SYS_ROLE_ADMINISTRATOR', NULL),
	('05cfc4e3-3c36-3902-b65e-7563a9b01231', '2020-12-14 00:00:00', NULL, '教师', 'SYS_ROLE_TEACHER', NULL),
	('07ifc4k3-3m23-4502-b79e-6543a9b03189', '2020-12-14 00:00:00', NULL, '学生', 'SYS_ROLE_STUDENT', NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- 导出  表 studyserver.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `Id` char(36) NOT NULL,
  `RoleId` char(36) NOT NULL,
  `LoginName` varchar(36) NOT NULL,
  `Name` varchar(36) NOT NULL,
  `PassWord` varchar(64) NOT NULL,
  `BirthDate` date DEFAULT NULL,
  `Sex` tinyint(1) DEFAULT NULL,
  `Phone` char(36) DEFAULT NULL,
  `Email` varchar(64) DEFAULT NULL,
  `CreatedTime` datetime DEFAULT NULL,
  `CreatedId` char(36) DEFAULT NULL,
  `CreatedName` varchar(36) DEFAULT NULL,
  `ModifyTime` datetime DEFAULT NULL,
  `ModifyId` char(36) DEFAULT NULL,
  `ModifyName` char(36) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_User_Role` (`RoleId`),
  CONSTRAINT `FK_User_Role` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  studyserver.user 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`Id`, `RoleId`, `LoginName`, `Name`, `PassWord`, `BirthDate`, `Sex`, `Phone`, `Email`, `CreatedTime`, `CreatedId`, `CreatedName`, `ModifyTime`, `ModifyId`, `ModifyName`) VALUES
	('39f85c72-7f36-ba29-31d4-13c1ac45b85a', '04cfc4e3-3c23-4202-b69e-7563a9b08431', 'admin', 'admin', '91cffc814d950058', NULL, 0, '', '', NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 12 jan. 2019 à 11:57
-- Version du serveur :  5.7.23
-- Version de PHP :  5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `apps`
--

DROP TABLE IF EXISTS `apps`;
CREATE TABLE IF NOT EXISTS `apps` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8_bin NOT NULL,
  `sous_titre` varchar(255) COLLATE utf8_bin NOT NULL,
  `photo` varchar(255) COLLATE utf8_bin NOT NULL,
  `categorie` varchar(10) COLLATE utf8_bin NOT NULL,
  `contenu` varchar(5000) COLLATE utf8_bin NOT NULL,
  `date_creation` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `apps`
--

INSERT INTO `apps` (`id`, `titre`, `sous_titre`, `photo`, `categorie`, `contenu`, `date_creation`) VALUES
(1, 'Des app !', 'Des sous app !', 'myImage-1546979856634.jpg', 'Gadgets', 'Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro&amp;nbsp;', '2019-01-08'),
(2, 'Des app !', 'Un autre sous titre', 'myImage-1546979976840.jpg', 'Gadgets', 'Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro&amp;nbsp;', '2019-01-08'),
(3, 'Des app !', 'Un autre sous titre', 'myImage-1546979976840.jpg', 'Gadgets', 'Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro&amp;nbsp;', '2019-01-08'),
(4, 'Des app !', 'Un autre sous titre', 'myImage-1546979976840.jpg', 'Gadgets', 'Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro&amp;nbsp;', '2019-01-08'),
(5, 'Des app !', 'Un autre sous titre', 'myImage-1546979976840.jpg', 'Gadgets', 'Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro Lorem bro&amp;nbsp;', '2019-01-08');

-- --------------------------------------------------------

--
-- Structure de la table `gaming`
--

DROP TABLE IF EXISTS `gaming`;
CREATE TABLE IF NOT EXISTS `gaming` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8_bin NOT NULL,
  `sous_titre` varchar(255) COLLATE utf8_bin NOT NULL,
  `photo` varchar(255) COLLATE utf8_bin NOT NULL,
  `categorie` varchar(10) COLLATE utf8_bin NOT NULL,
  `contenu` varchar(5000) COLLATE utf8_bin NOT NULL,
  `date_creation` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `gaming`
--

INSERT INTO `gaming` (`id`, `titre`, `sous_titre`, `photo`, `categorie`, `contenu`, `date_creation`) VALUES
(1, 'Les demis finals des worlds !', 'Les Fnatics sont en route', 'myImage-1546979052729.jpg', 'Gaming', 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem&amp;nbsp;', '2019-01-08'),
(6, 'Les demis finals des worlds !', 'Les Fnatics sont en route', 'myImage-1546979052729.jpg', 'Gaming', 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem&amp;nbsp;', '2019-01-08'),
(7, 'Les demis finals des worlds !', 'Les Fnatics sont en route', 'myImage-1546979052729.jpg', 'Gaming', 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem&amp;nbsp;', '2019-01-08'),
(8, 'Les demis finals des worlds !', 'Les Fnatics sont en route', 'myImage-1546979052729.jpg', 'Gaming', 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem&amp;nbsp;', '2019-01-08');

-- --------------------------------------------------------

--
-- Structure de la table `mails`
--

DROP TABLE IF EXISTS `mails`;
CREATE TABLE IF NOT EXISTS `mails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail_add` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `mangas`
--

DROP TABLE IF EXISTS `mangas`;
CREATE TABLE IF NOT EXISTS `mangas` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) COLLATE utf8_bin NOT NULL,
  `sous_titre` varchar(255) COLLATE utf8_bin NOT NULL,
  `photo` varchar(255) COLLATE utf8_bin NOT NULL,
  `categorie` varchar(10) COLLATE utf8_bin NOT NULL,
  `contenu` varchar(5000) COLLATE utf8_bin NOT NULL,
  `date_creation` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `mangas`
--

INSERT INTO `mangas` (`id`, `titre`, `sous_titre`, `photo`, `categorie`, `contenu`, `date_creation`) VALUES
(1, 'Des mangas partout !', 'Manga sous titre', 'myImage-1546980090717.jpg', 'Mangas', 'Lorem bro&amp;nbsp;', '2019-01-08'),
(2, 'Des mangas partout !', 'Manga sous titre', 'myImage-1546980090717.jpg', 'Mangas', 'Lorem bro&amp;nbsp;', '2019-01-08'),
(3, 'Des mangas partout !', 'Manga sous titre', 'myImage-1546980090717.jpg', 'Mangas', 'Lorem bro&amp;nbsp;', '2019-01-08'),
(4, 'Des mangas partout !', 'Manga sous titre', 'myImage-1546980090717.jpg', 'Mangas', 'Lorem bro&amp;nbsp;', '2019-01-08');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `statut` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `statut`) VALUES
(1, 'admin', 'snowden', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

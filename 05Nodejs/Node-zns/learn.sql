/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : learn

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2016-12-27 16:27:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for aboutus_table
-- ----------------------------
DROP TABLE IF EXISTS `aboutus_table`;
CREATE TABLE `aboutus_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `pic_src` varchar(300) NOT NULL,
  `href` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aboutus_table
-- ----------------------------

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES ('1', 'blue', '10f38eac74359214334540452852cfb6');

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '大标题',
  `description` varchar(300) NOT NULL COMMENT '描述文字',
  `href` varchar(300) NOT NULL COMMENT '点击链接',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES ('3', '2017年要\"千方百计抓好房地产调控\"', '陈政高指出，2016年是“十三五”规划的开局之年，是全面落实中央城市工作会议的第一年。住房城乡建设系统在党中央、国务院的正确领导下，狠抓各项工作落实', 'http://news.163.com/16/1226/21/C989EB9L000187VE.html');
INSERT INTO `banner_table` VALUES ('4', '俄罗斯紧急情况部:潜水员发现失事图-154飞机机身', '中新网12月26日电 据俄罗斯卫星网报道，俄罗斯紧急情况部发布消息称，潜水员在黑海水下发现失事的图-154飞机的机身。初步资料显示，飞机碎片位于27米深处，距离岸边一海里(约合1.8公里)。', 'http://news.163.com/16/1226/20/C984G0BO000187V5.html');
INSERT INTO `banner_table` VALUES ('5', '春运抢票最凶残一天将到来 巅峰对决你准备好了吗', '接下来连续三天，\r\n春运抢票将进入白热化阶段，\r\n你准备好了吗?', 'http://news.163.com/16/1226/19/C9824TFR000187VE.html');

-- ----------------------------
-- Table structure for blog_table
-- ----------------------------
DROP TABLE IF EXISTS `blog_table`;
CREATE TABLE `blog_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `pic_src` varchar(300) NOT NULL,
  `pic_big_src` varchar(300) NOT NULL,
  `summary` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `post_time` int(11) NOT NULL,
  `author` varchar(32) NOT NULL,
  `n_view` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_table
-- ----------------------------

-- ----------------------------
-- Table structure for contact_table
-- ----------------------------
DROP TABLE IF EXISTS `contact_table`;
CREATE TABLE `contact_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `fax` varchar(20) NOT NULL,
  `email` varchar(64) NOT NULL,
  `weibo` varchar(40) NOT NULL,
  `wx` varchar(40) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contact_table
-- ----------------------------

-- ----------------------------
-- Table structure for custom_evaluation_table
-- ----------------------------
DROP TABLE IF EXISTS `custom_evaluation_table`;
CREATE TABLE `custom_evaluation_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '标题',
  `description` varchar(200) NOT NULL COMMENT '评价详情',
  `src` varchar(300) NOT NULL COMMENT '用户头像',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of custom_evaluation_table
-- ----------------------------
INSERT INTO `custom_evaluation_table` VALUES ('8', '标题111', '大师的发顺丰而儿童', '8c1069b067b89f8bd9db17f6effac687.jpg');
INSERT INTO `custom_evaluation_table` VALUES ('9', '的撒发生地方', '而同为特务让人讨厌', '5981841d6f7507dca99f685d05a518b5.jpg');
INSERT INTO `custom_evaluation_table` VALUES ('10', '自行车想不想吃v', '山东省地方地方共和国', 'a1d60f7f14c34a096f44a1aeab9cd8ce.jpg');

-- ----------------------------
-- Table structure for intro_table
-- ----------------------------
DROP TABLE IF EXISTS `intro_table`;
CREATE TABLE `intro_table` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '大标题',
  `description` varchar(200) NOT NULL COMMENT '描述文字',
  `href` varchar(300) NOT NULL COMMENT '点击链接',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of intro_table
-- ----------------------------

-- ----------------------------
-- Table structure for msg_table
-- ----------------------------
DROP TABLE IF EXISTS `msg_table`;
CREATE TABLE `msg_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `subject` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of msg_table
-- ----------------------------

-- ----------------------------
-- Table structure for news_table
-- ----------------------------
DROP TABLE IF EXISTS `news_table`;
CREATE TABLE `news_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL COMMENT '标题',
  `summary` varchar(500) NOT NULL COMMENT '简介',
  `ico_src` varchar(300) NOT NULL COMMENT '产品小图标',
  `big_pic_src` varchar(300) NOT NULL COMMENT '详情大图',
  `content` text NOT NULL COMMENT '内容',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news_table
-- ----------------------------

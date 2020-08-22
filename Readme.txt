====================================================Shops Inventory ==========================


Pre-Requesites 
==================
1.Nodejs 12.x
2. npm 6.13
3. Angular CLI 9.x
4. Java 8
5 .Mysql
6 .Maven


MysqL Schema
=======================

create database shoppingMall;

CREATE TABLE shops (
  `id` int(11) NOT NULL auto_increment,
  `shop_name` varchar(100) NOT NULL,
  `shop_category` varchar(100) NOT NULL,
   `owner_name` varchar(100) NOT null,
   `address` varchar(100) NOT null,
   `longitude` varchar(100),
   `latitude` varchar(100),
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;


spring.datasource.url=jdbc:mysql://localhost:3306/shoppingMall
spring.datasource.username=root
spring.datasource.password=admin
spring.datasource.driver-class-name=com.mysql.jdbc.Driver



To Run the Angular Application

1 .Install Modules 
     ---> npm install

2 .Run Application
   ------> npm start


  
To run Backend

1 .mvn spring-boot:run        

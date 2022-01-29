show databases;

create database if not exists wtl7c; 
use wtl7c;

create table if not exists employee(
	id int primary key auto_increment,
    fullName varchar(30) not null, 
    email varchar(100) not null,
    phoneNumber varchar(10) not null
);
select * from employee;
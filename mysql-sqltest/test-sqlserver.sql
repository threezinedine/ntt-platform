create database ntt_platform;
use ntt_platform;
drop table users;

create table users (
	id varchar(36) primary key,
    username varchar(50) unique,
    password varchar(50)
);

select * from users;

delete from users;
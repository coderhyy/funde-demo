-- 创建新的数据库 crowdfunding_db  
CREATE DATABASE crowdfunding_db;  

-- 使用数据库 crowdfunding_db  
USE crowdfunding_db;  

-- 创建 CATEGORY 表  
CREATE TABLE CATEGORY (  
    CATEGORY_ID INT AUTO_INCREMENT PRIMARY KEY,  
    NAME VARCHAR(50) NOT NULL  
);  

-- 创建 FUNDRAISER 表  
CREATE TABLE FUNDRAISER (  
    FUNDRAISER_ID INT AUTO_INCREMENT PRIMARY KEY,  
    ORGANIZER VARCHAR(100) NOT NULL,  
    CAPTION VARCHAR(255) NOT NULL,  
    TARGET_FUNDING DECIMAL(10, 2) NOT NULL,  
    CURRENT_FUNDING DECIMAL(10, 2) NOT NULL,  
    CITY VARCHAR(100) NOT NULL,  
    ACTIVE BOOLEAN NOT NULL,  
    CATEGORY_ID INT,  
    FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)  
);  

-- 向 CATEGORY 表中插入数据  
INSERT INTO CATEGORY (NAME) VALUES ('Education'), ('Healthcare'), ('Community');  

-- 向 FUNDRAISER 表中插入数据  
INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID)  
VALUES   
('Organizer1', 'Fundraiser for School', 10000.00, 1500.00, 'CityA', TRUE, 1),  
('Organizer2', 'Medical Aid for Patient', 20000.00, 5000.00, 'CityB', TRUE, 2),  
('Organizer3', 'Community Park', 15000.00, 3000.00, 'CityC', TRUE, 3),  
('Organizer4', 'Scholarship Fund', 5000.00, 1000.00, 'CityD', TRUE, 1),  
('Organizer5', 'Relief Fund', 25000.00, 10000.00, 'CityE', TRUE, 2);
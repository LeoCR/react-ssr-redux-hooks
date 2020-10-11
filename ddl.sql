DROP DATABASE nodejs_auth;
CREATE Database nodejs_auth;
use nodejs_auth;
DROP TABLE IF EXISTS USER;
CREATE TABLE IF NOT EXISTS USER(
    id INTEGER auto_increment  PRIMARY KEY , 
    firstname VARCHAR(250), 
    lastname VARCHAR(250), 
    username VARCHAR(250),  
    email VARCHAR(250), 
    password_encrypted VARCHAR(250),
    password_iv VARCHAR(250), 
    last_login DATETIME, 
    status ENUM('active', 'inactive') DEFAULT 'active', 
    created_at DATETIME , 
    updated_at DATETIME
);
 
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
    last_login DATETIME  DEFAULT CURDATE(), 
    status ENUM('active', 'inactive') DEFAULT 'active', 
    created_at DATETIME DEFAULT CURDATE(), 
    updated_at DATETIME DEFAULT CURDATE()
);

INSERT INTO `nodejs_auth`.`USER`
(`id`,`firstname`,`lastname`,`username`,
`email`,`password_encrypted`,`password_iv`,`last_login`,
`status`,`created_at`,`updated_at`)
VALUES
(1,
'UserInvitedFirstName','InvitedLastName',
'UserInvited','userinvited@gmail.com',
'bb3189ca514faa5c24b0c4c1',/*password1234*/
'e428362c6112d6587b591bf149a214e4',
'2020-10-13 14:29:36',
'active','2020-10-13 14:29:36',
'2020-10-13 14:29:36');
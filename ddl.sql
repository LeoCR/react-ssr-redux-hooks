DROP DATABASE pokedex;

CREATE Database pokedex;
use pokedex;

DROP TABLE IF EXISTS USER;
CREATE TABLE IF NOT EXISTS USER(
    id INTEGER auto_increment  PRIMARY KEY , 
    firstname VARCHAR(250), 
    lastname VARCHAR(250), 
    username VARCHAR(250),  
    email VARCHAR(250), 
    password_encrypted VARCHAR(250),
    password_iv VARCHAR(250), 
    last_login DATETIME , 
    status ENUM('active', 'inactive') DEFAULT 'active', 
    created_at DATETIME, 
    updated_at DATETIME
);

DROP TABLE IF EXISTS POKEMON;
CREATE TABLE IF NOT EXISTS POKEMON(
    id INTEGER auto_increment  PRIMARY KEY , 
    name VARCHAR(250), 
    img VARCHAR(250), 
    weight INTEGER,  
    type VARCHAR(250), 
    id_pokemon INTEGER
);

DROP TABLE IF EXISTS USER_POKEMON;
CREATE TABLE IF NOT EXISTS USER_POKEMON(
    id INTEGER auto_increment  PRIMARY KEY , 
    id_pokemon INTEGER, 
    id_user INTEGER, 
    CONSTRAINT FK_ID_Pokemon FOREIGN KEY (id_pokemon) REFERENCES POKEMON(id) ON DELETE CASCADE,
    CONSTRAINT FK_ID_User_Pokemon FOREIGN KEY (id_user) REFERENCES USER(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS ABILITY;
CREATE TABLE IF NOT EXISTS ABILITY(
    id INTEGER auto_increment  PRIMARY KEY , 
    name VARCHAR(250), 
    effect VARCHAR(250),
    id_ability INTEGER
);

DROP TABLE IF EXISTS ABILITY_POKEMON;
CREATE TABLE IF NOT EXISTS ABILITY_POKEMON(
    id INTEGER auto_increment  PRIMARY KEY , 
    id_pokemon INTEGER, 
    id_ability INTEGER, 
    CONSTRAINT FK_ID_Pokemon_Ability FOREIGN KEY (id_pokemon) REFERENCES POKEMON(id) ON DELETE CASCADE,
    CONSTRAINT FK_ID_User_Ability FOREIGN KEY (id_ability) REFERENCES ABILITY(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS PLACE;
CREATE TABLE IF NOT EXISTS PLACE(
    id INTEGER auto_increment  PRIMARY KEY , 
    name VARCHAR(250)
);

DROP TABLE IF EXISTS PLACE_POKEMON;
CREATE TABLE IF NOT EXISTS PLACE_POKEMON(
    id INTEGER auto_increment  PRIMARY KEY , 
    id_place INTEGER,
    id_pokemon INTEGER,
    CONSTRAINT FK_ID_Pokemon_Place FOREIGN KEY (id_pokemon) REFERENCES POKEMON(id) ON DELETE CASCADE,
    CONSTRAINT FK_ID_Place_Pokemon FOREIGN KEY (id_place) REFERENCES PLACE(id) ON DELETE CASCADE
);

INSERT INTO `pokedex`.`USER`(`id`,`firstname`,`lastname`,`username`,
`email`,`password_encrypted`,`password_iv`,`last_login`,
`status`,`created_at`,`updated_at`)
VALUES(1,'UserInvitedFirstName','InvitedLastName','UserInvited','userinvited@gmail.com',
'bb3189ca514faa5c24b0c4c1',/*password1234*/
'e428362c6112d6587b591bf149a214e4','2020-10-13 14:29:36','active','2020-10-13 14:29:36',
'2020-10-13 14:29:36');
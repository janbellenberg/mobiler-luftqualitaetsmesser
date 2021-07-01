CREATE DATABASE IF NOT EXISTS messstation DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE messstation;
CREATE TABLE gebaeude(
    Ge_Nr INT PRIMARY KEY AUTO_INCREMENT,
    Gebaeude_Name VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE raum(
    Ra_Nr INT PRIMARY KEY AUTO_INCREMENT,
    Raum_Name VARCHAR(100) NOT NULL UNIQUE,
    Ge_Nr INT,
    FOREIGN KEY (Ge_Nr) REFERENCES gebaeude(Ge_Nr) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE positionstelle(
    Pos_Nr INT PRIMARY KEY AUTO_INCREMENT,
    Position VARCHAR(150) NOT NULL UNIQUE,
    Ra_Nr INT,
    FOREIGN KEY (Ra_Nr) REFERENCES raum(Ra_Nr) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE messung(
    Messung_ID INT PRIMARY KEY AUTO_INCREMENT,
    co2_Wert VARCHAR(100),
    temperatur_Wert VARCHAR(100),
    feuchtigkeit_Wert VARCHAR(100),
    cTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP(),
    Pos_Nr INT,
    FOREIGN KEY (Pos_Nr) REFERENCES positionstelle(Pos_Nr) ON DELETE RESTRICT ON UPDATE CASCADE
);

insert into gebaeude values (1, "Dahnstraße"), (2, "Frankenstraße");
insert into raum values (1, "219", 1), (2, "221", 1), (3, "HNN109", 2);
insert into positionstelle values (1, "Tafel", 1), (2, "Tür", 2), (3, "Tafel2", 3);
insert into messung values (1, 500, 20, 50, CURRENT_TIMESTAMP(), 1), (2, 600, 21, 55, CURRENT_TIMESTAMP(), 1);

CREATE USER 'mlqm'@'%' IDENTIFIED BY 'gXg33Ep4urGp6bF2';
REVOKE ALL PRIVILEGES ON *.* FROM 'mlqm'@'%';
REVOKE GRANT OPTION ON *.* FROM 'mlqm'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON `messstation`.* TO 'mlqm'@'%';
FLUSH PRIVILEGES;
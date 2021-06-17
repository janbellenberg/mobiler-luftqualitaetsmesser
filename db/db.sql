CREATE DATABASE messstation;

CREATE TABLE Gebaeude{
    Ge_Nr INT PRIMARY KEY AUTO_INCREMENT,
    Gebaeude_Name varchar(100) NOT NULL UNIQUE
}


CREATE TABLE Raum{
    Ra_Nr INT PRIMARY KEY AUTO_INCREMENT,
    Raum_Name varchar(100) NOT NULL UNIQUE
}

CREATE TABLE Position{
    Pos_Nr INT PRIMARY KEY AUTO_INCREMENT,
    Position varchar(150) NOT NULL UNIQUE
}

CREATE TABLE Arten_Messungen{
    Art_ID INT PRIMARY KEY AUTO_INCREMENT,
    Art_Name varchar(150) NOT NULL UNIQUE
}

CREATE TABLE Messung{
    Messung_ID INT PRIMARY KEY AUTO_INCREMENT,
    Zeitpunkt SMALLDATETIME,
    Messung_WERT varchar(100) NOT NULL UNIQUE,
    Ge_Nr INT,
    Ra_Nr INT,
    Pos_Nr INT,
    Art_ID INT,
    FOREIGN KEY (Ge_Nr) REFERENCES Gebaeude(Ge_Nr),
    FOREIGN KEY (Ra_Nr) REFERENCES Raum(Ra_Nr),
    FOREIGN KEY (Pos_Nr) REFERENCES Position(Pos_Nr),
    FOREIGN KEY (Art_ID) REFERENCES Arten_Messungen(Art_ID)
}
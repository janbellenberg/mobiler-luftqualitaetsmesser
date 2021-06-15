# Mobiler Luftqualitätsmesser (ITA Projekt)

![HNBK](https://hnbk.de/wp-content/uploads/2017/04/HNBKSmall-e1492069901821.png)

**************************************************************************

## Zielsetzung
Zur Überwachung der **Luftqualität** in den Klassenräumen soll eine autonome, mobile Messstation realisiert werden, die in jedem Klassenraum an unterschiedlichen Positionen die **CO2-Belastung in ppm, die Temperatur in °C und die Luftfeuchte in %** misst und diese in einer Datenbank speichert:
- CO2-Belastung
- Temperatur
- Luftfeuchte
- Standort
- Raumbezeichnung
- Position
- Uhrzeit
- Datum

## Überblick: verwendete Technologien

| Bereich     | Plattform                       | Sprachen           |
| ----------- | ------------------------------- | ------------------ |
| WEB         | Apache / XAMPP (evtl. Docker)   | HTML, CSS, JS      |
| API         | Apache / XAMPP (evtl. Docker)   | PHP                |
| DB          | MySQL ( / MariaDB) + phpMyAdmin | SQL                |
| µController | Arduino                         | C++                |
| Roboter     | Robotino                        | GrafCet / Robotino |

### Mobile Messstation
> Im Ordner ["docs"](https://github.com/janbellenberg/mobiler-luftqualitaetsmesser/tree/main/docs) befinden sich die Datenblätter zu den Sensoren

Die autonome, mobile Messstation besteht aus einem Robotino, einem Arduino "**WMOD**" (mit WLAN-Adapter) und Sensoren für die Luftqualität (CO2 und Temperatur / Luftfeuchte). Der Arduino stellt die Messwerte in einem **I²C-Display** dar und sendet sie an einen Webserver mit einer Datenbank.

> Der Programmcode für den Arduino befindet sich in dem Ordner ["arduino"](https://github.com/janbellenberg/mobiler-luftqualitaetsmesser/tree/main/arduino). Das Programm für den Robotino wird nicht auf GitHub gestellt, da die Dateien nicht Klartext-basiert sind.

### Webserver
Die Daten sollen vom Webserver gespeichert und wieder zur Verfügung gestellt werden, sodass Sie von der Website ansprechend visualisiert (*Diagramm*) werden kann. Das Backend soll in PHP geschrieben sein und per **REST-API** ansprechbar sein.

> Der Programmcode für den Webserver befindet sich in dem Ordner ["web"](https://github.com/janbellenberg/mobiler-luftqualitaetsmesser/tree/main/web)

### Datenbank
Zur Speicherung der Daten soll eine MySQL-Datenbank (bzw. MariaDB) verwendet werden. Zur erleichterten Bedienung kann phpMyAdmin zusätzlich verwendet werden.

> Der Programmcode für den Webserver befindet sich in dem Ordner ["db"](https://github.com/janbellenberg/mobiler-luftqualitaetsmesser/tree/main/db)

## Produkteinsatz
Die Erfassung des Raumklimas erfolgt in den vorhandenen Klassenräumen. Die Darstellung soll auf einer Website erfolgen. Das Projekt ist ein **Feldversuch** und hat keinen professionellen Charakter. Benutzer sollen Lehrer und Schüler des HNBKs sein. Realisiert wird dieses Projekt durch Schülerinnen und Schüler des Beruflichen Gymnasiums im Rahmen der Berufsausbildung zum **ITA** *(Informationstechnische*r Assistent*in)*

**************************************************************************

## Mitarbeit an dem Projekt
Zum Downloaden des Repositories kann der Befehl `git clone https://github.com/janbellenberg/mobiler-luftqualitaetsmesser.git` verwendet werden

## Copyright
Copyright © 2021 [Heinz-Nixdorf Berufskolleg](https://www.hnbk.de)

Lehrer: Alfred Lehmann & Jörg Dixkens

Das GitHub-Repository wird von [Jan Bellenberg](https://github.com/janbellenberg) bereitgestellt.

### Contributors

- [@janbellenberg](https://github.com/janbellenberg)
- [@OmarAk312](https://github.com/OmarAk312)
- [@NeroCyer](https://github.com/NeroCyer)
- [@sara-shalouf](https://github.com/sara-shalouf)
- [@alfredlehmann](https://github.com/alfredlehmann)
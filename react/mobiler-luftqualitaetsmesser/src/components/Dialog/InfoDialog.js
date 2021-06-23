import Dialog from '.';

const InfoDialog = ({onHide}) => {
  return (
    <Dialog
      title="Informationen"
      actionText="Auf GitHub ansehen"
      onActionClick={() => window.open("https://github.com/janbellenberg/mobiler-luftqualitaetsmesser", '_blank').focus()}
      onAbortClick={onHide}>

      <img src="https://hnbk.de/wp-content/uploads/2017/04/HNBKSmall-e1492069901821.png"
        style={{
          display: "block",
          margin: "0 auto 2em auto"
        }}
        alt="HNBK" />
      Zur Überwachung der <b>Luftqualität</b> in den Klassenräumen soll eine autonome, mobile Messstation realisiert werden, 
      die in jedem Klassenraum an unterschiedlichen Positionen die 
      <b> CO2-Belastung in ppm, die Temperatur in °C und die Luftfeuchte in % misst 
      und diese in einer Datenbank speichert</b><p/>

      <hr/>

      Die Erfassung des Raumklimas erfolgt in den vorhandenen Klassenräumen. Die Darstellung soll auf einer Website erfolgen. 
      Das Projekt ist ein Feldversuch und hat keinen professionellen Charakter. Benutzer sollen Lehrer und Schüler des HNBKs sein. 
      Realisiert wird dieses Projekt durch Schülerinnen und Schüler des Beruflichen Gymnasiums im Rahmen der Berufsausbildung zum ITA (Informationstechnischer Assistentin)

      <hr/>

      Copyright © 2021 <a href="https://www.hnbk.de" rel="nofollow">Heinz-Nixdorf Berufskolleg</a><br/>
      Lehrer: <a href="https://github.com/alfredlehmann">Alfred Lehmann</a> &amp; Jörg Dixkens<br/>
      Schüler:
      <a href="https://github.com/janbellenberg">@janbellenberg</a>, <a href="https://github.com/OmarAk312">@OmarAk312</a>, <a href="https://github.com/NeroCyer">@NeroCyer</a>, <a href="https://github.com/sara-shalouf">@sara-shalouf</a>
      <p/>
    </Dialog>
  );
};

export default InfoDialog;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Footer from '../components/Reusable/Footer';
import Header from '../components/Reusable/Header';
import {connect} from 'react-redux';
import ProfileHeader from '../components/Reusable/ProfileHeader';
import '../styles/components/legal';
import ContactHeader from '../components/Reusable/ContactHeader';
import digitalPartnerLogo from '../images/digitalPartnerLogo.png';
import strings from '../components/util/language';
import {Grid, Container} from 'semantic-ui-react';
import ProfilePageRightSidebar from '../components/Reusable/ProfileRightSidebar';

class Legal extends Component {

  constructor(props) {
   super(props);
   this.shiftLanguage = this.shiftLanguage.bind(this);
  }

 shiftLanguage(lang) {
   strings.setLanguage(lang);
   this.setState({});
 }

render() {
  const {user, userLanguage} = this.props;
  return (
    <Grid className="common-background contact-page overflow-page">
      <Grid.Row style={user.authenticated === false ? {backgroundColor: 'white', marginBottom: '17px'} : {marginBottom: '0px'}}>
        <Grid.Column computer={12}>
          <Grid container>
            <Grid.Column computer={12} >
              {user.authenticated === true && <ProfileHeader userLanguage={user.userObj.language} />}
            </Grid.Column>
          </Grid>
          {user.authenticated === false && <ContactHeader language={this.shiftLanguage} />}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column tablet={12} computer={12}>
          <Grid container>
            <Grid.Column tablet={12} computer={user.authenticated === false ? 12 : 9} className="no-gutter legal-container" textAlign="justify">
              <Grid container>
                <p className="LegalLandingPage-privacy_Policy___Dat">
                    Datenschutzerklärung
                    <br />
                        <br />
                        <span className="legal-comp">
                     Digital Partners GmbH
                     </span>
                  </p>
                  <span>
                     <span className="heading">
                      1.	Geltungsbereich
                    </span>
                    <div className="legalpa">
                    <span className="legalIndent">1.1 </span>Im Folgenden erhalten Sie Informationen über die Erhebung, Speicherung und Verarbeitung personenbezogener
                          Daten bei Nutzung der durch die Digital Partners GmbH, Prenzlauer Allee 216, 10405 Berlin unter der Domain &nbsp; 
                          <a href="https://www.digitalpartners.io">https://www.digitalpartners.io</a> betriebene Internetseite, die auch als mobile Version aufgerufen werden kann 
                          (nachfolgend insgesamt als „Digitalpartners.io“ bezeichnet) sowie die über Digitalpartners.io angebotenen Services.<br />
                     <span className="legalIndent">1.2 </span>Personenbezogene Daten sind alle Daten, die auf Sie persönlich zurückzuführen sind, d.h. mit Ihrer Person in Verbindung 
                          gebracht werden könnten. Dies sind insbesondere Name, E-Mail-Adresse, Adresse, Telefonnummer, Nutzerverhalten, IP-Adresse usw.<br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                      2.	Dienstanbieter
                    </span>
                  <span>
                    <div className="legalpa">
                     <span className="legalIndent">2.1 </span>Dienstanbieter gemäß § 13 Telemediengesetz und verantwortliche Stelle gemäß § 3 Abs.
                          7 Bundesdatenschutzgesetz ist die Digital Partners GmbH, Prenzlauer Allee 216, 10405 Berlin, 
                          eingetragen im Handelsregister des Amtsgerichts Berlin-Charlottenburg unter der Registernummer HRB 187853 B (nachfolgend als „Digitalpartners“ bezeichnet). <br />
                     <span className="legalIndent">2.2 </span>Digitalpartners.io enthält Verlinkungen, durch deren Betätigung Sie auf die Internetseiten Dritter weitergeleitet werden. Digitalpartners weist ausdrücklich darauf hin, dass Sie sich in diesem Fall auf der verlinkten Internetseite über die Erhebung,
                         Speicherung und Verarbeitung personenbezogener Daten durch den Drittanbieter informieren müssen,
                       da Digitalpartners darauf keinen Einfluss hat.<br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                      3. Auskunft 
                    </span>
                  <span>
                     <div className="legalpa">
                      <span className="legalIndent">3.1 </span>Sie haben das Recht, von Digitalpartners jederzeit detailliert Auskunft zu verlangen
                       über die zu Ihrer Person gespeicherten und verarbeiteten Daten sowie zu deren Herkunft, 
                       dem Zweck der Speicherung und Verarbeitung sowie den Empfängern oder Kategorien von Empfängern,
                        an die diese Daten weitergegeben werden. 
                    <br />
                       <span className="legalIndent">3.2 </span>Die Auskunftsanfrage richten Sie bitte per E-Mail an <a href="mailto:privacy@digitalpartners.io" target="_top">privacy@digitalpartners.io</a> und fügen der E-Mail eine 
                        Ablichtung Ihres Lichtbildausweises bei,
                       damit Digitalpartners eine Abfrage Ihrer Daten durch unautorisierte Dritte ausschließen kann.<br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                      4.	Widerruf
                    </span>
                  <span>
                       <div className="legalpa">
                       <span className="legalIndent">4.1 </span>Ihre Einwilligung zur Speicherung, Erhebung und Verarbeitung Ihrer 
                      personenbezogenen Daten können Sie jederzeit widerrufen. <br />
                       <span className="legalIndent">4.2 </span>Ihren Widerruf richten Sie bitte per E-Mail an <a href="mailto:privacy@digitalpartners.io" target="_top">privacy@digitalpartners.io</a> oder per E-Mail, Telefon oder Post an die im Impressum von 
                      Digitalpartners.io angegebenen Kontaktdaten.<br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                     5.  Einsatz von Cookies
                    </span>
                  <span>
                       <div className="legalpa">
                      <span className="legalIndent">5.1 </span>Bei der Nutzung von Digitalpartners.io werden Cookies auf ihrem Rechner gespeichert,
                       auch wenn eine rein informatorische Nutzung von Digitalpartners.io erfolgt.
                    <br />
                      <span className="legalIndent">5.2 </span>Cookies sind kleine Textdateien, die auf Ihrer Festplatte, dem von Ihnen verwendeten Browser zugeordnet, gespeichert werden und durch welche der Stelle, die den Cookie setzt, bestimmte Informationen vermittelt werden. 
                        Cookies können keine Programme ausführen und vor allem auch keine Viren auf Ihren Computer übertragen.
                        Cookies dienen insbesondere dazu, Digitalpartners.io nutzerfreundlicher zu gestalten
                    <br />
                      <span className="legalIndent">5.3 </span>Wenn Sie über ein Benutzerkonto für Digitalpartners.io verfügen, dienen Cookies insbesondere dazu, Sie für Folgebesuche auf Digitalpartners.io zu identifizieren. 
                      Dies verhindert, dass Sie sich für jeden Besuch erneut einloggen müssen.
                      <br />
                      <span className="legalIndent">5.4 </span>Digitalpartners.io nutzt folgende Arten von Cookies: <br />
                     <div className="legal-indent">
                        •	Transiente Cookies, d.h. mit temporärem Einsatz <br />
                        •	Persistente Cookies, d.h. mit zeitlich beschränktem Einsatz <br />
                        •	Third Party Cookies, d.h. Cookies von Drittanbietern
                      </div>
                      <span className="legalIndent">5.5 </span>Transiente Cookies werden gelöscht, sobald Sie Ihren Browser schließen. 
                        Dazu zählen insbesondere die sogenannten Session Cookies. Session Cookies speichern eine Session-ID,
                        mit der die Anfragen Ihres Browsers sich der Sitzung zuordnen lassen, so dass Ihr Computer die vom 
                        System bei einer Rückkehr auf Digitalpartners.io wiedererkannt werden kann. Sobald Sie sich ausloggen
                        oder Ihren Browser schließen, werden sämtliche Session Cookies automatisch gelöscht.
                     <br />
                     <span className="legalIndent">5.6 </span>Persistente Cookies werden erst nach einer vom jeweiligen Cookie abhängigen,
                      über die Sitzung hinausgehenden Dauer, spätestens jedoch zwei Monate nachdem das Cookie gesetzt wurde, gelöscht.
                      Sie können diese Cookies jederzeit selbsttätig in den Sicherheitseinstellungen Ihres Browsers löschen.
                      <br />
                      <span className="legalIndent">5.7 </span>In Ihren Browsereinstellungen können Sie den Einsatz von Cookies
                      individuell anpassen und auch ganz unterbinden. Insbesondere können Sie auch den
                      Einsatz von Third Party Cookies gänzlich unterbinden.
                      In diesem Fall können Sie jedoch eventuell nicht alle Funktionen von Digitalpartners.io nutzen.
                       <br />
                       <span className="legalIndent">5.8 </span>Die über Cookies gespeicherten Informationen werden getrennt von
                       Ihren sonstigen personenbezogenen Daten gespeichert und nicht mit diesen verknüpft.
                        <br />
                        <span className="legalIndent">5.9 </span>Digitalpartners weist darauf hin, dass auch die Drittanbieter,
                        die mittels des Einsatzes von Cookies Daten erheben, Daten über die Nutzung von Digitalpartners.io für nutzergenerierte
                        Werbung auf anderen Webseiten nutzen. Auf diese Datenerhebung hat Digitalpartners keinen Einfluss
                         <br />
                          <br />
                      </div>
                  </span>
                  <span className="heading">
                    6. Informatorische Nutzung von Digitalpartners.io<br />
                  </span>
                  <span>
                      <div className="legalpa">
                     <span className="legalIndent">6.1 </span>Bei rein informatorischer Nutzung von Digitalpartners.io erhebt Digitalpartners nur die durch Ihren Browser übermittelten Daten, diese sind: <br />
                     <div className="legal-indent">
                    •	Ihre IP-Adresse <br />
                    •	Datum, Uhrzeit und Dauer Ihres Besuchs auf Digitalpartners.io <br />
                    •	Ihr Nutzerverhalten, d.h. Ihr Besuch auf Digitalpartners.io, Unterseiten von Digitalpartners.io sowie Reihenfolge Ihrer Besuche, getätigte Klicks sowie Verweildauer auf einzelnen Seiten und Unterseiten <br />
                    •	Zeitzonendifferenz zur Greenwich Mean Time <br />
                    •	Den Zugriffsstatus/ http-Statuscode <br />
                    •	Konkret übertragene Datenmengen <br />
                    •	Betriebssystem und dessen Oberfläche <br />
                    •	Browser sowie Sprache und Version der Browsersoftware <br />
                    •	Die Webseite, von der die Anforderung kommt <br />
                    </div>
                    Bei der Nutzung eines Mobilgerätes werden außerdem folgende Daten gespeichert: <br />
                      <div className="legal-indent">
                    •	Art des Mobilgerätes und dessen Einstellungen <br />
                    •	Ihr Standort, von dem aus Sie auf Digitalpartners.io zugreifen<br />
                    </div>
                      <span className="legalIndent">6.2 </span>Eine rein informatorische Nutzung von Digitalpartners.io
                       liegt vor, wenn Sie sich nicht für ein Kundenkonto anmelden,
                        keine Anfrage über Digitalpartners.io stellen und auch nicht anderweitig
                         Informationen zu Ihrer Person an Digitalpartners übermitteln.
                    <br />
                    <br />
                  </div>
                  </span>
                  <span className="heading">
                      7.Datenerhebung bei Erstellung eines Kundenprofils für Digitalpartners.io
                    </span>
                  <span>
                      <div className="legalpa">
                      <span className="legalIndent">7.1 </span>Wenn Sie die über Digitalpartners.io angebotenen Services von Digitalpartners nutzen möchten, 
                      müssen Sie ein Kundenkonto anlegen.
                      Eine Nutzung der Services ohne ein bestehendes oder neu anzulegendes Kundenkonto ist nicht möglich.<br />
                      <span className="legalIndent">7.2 </span>Bei der Registrierung für ein Kundenkonto werden
                       Ihre Daten – vorbehaltlich einer jederzeit auf Anforderung durch
                       Sie erfolgenden Löschung Ihres Kundenkontos durch Digitalpartners – gespeichert.
                      <br />
                      <span className="legalIndent">7.3 </span>Die von Ihnen übertragenen Daten werden insbesondere für die beiderseitige
                       Vertragserfüllung verwendet. Dazu werden Ihre Daten gegebenenfalls auch an die zur
                       Vertragserfüllung erforderlichen Partner weiter gegeben. Weitere Informationen zur Weitergabe der zu Ihrer Person
                       gespeicherten Daten an Dritte erhalten Sie unter Ziffer 10 dieser Datenschutzerklärung.
                    <br />
                    <span className="legalIndent">7.4 </span>Digitalpartners verwendet Ihre personenbezogenen
                      Daten darüber hinaus zum Zwecke des Marketings und der Werbung für die Leistungen von Digitalpartners.
                      Ohne Ihre gesonderte Zustimmung werden Ihnen zu diesem Zweck jedoch nur Informationen zu Leistungen von Digitalpartners zugesandt,
                      die den durch Sie in Anspruch genommenen Leistungen ähnlich sind.
                    <br />
                    <span className="legalIndent">7.5 </span>Sie haben jederzeit die Möglichkeit, Ihr Kundenkonto durch Versendung einer entsprechenden
                    Aufforderung an die E-Mail-Adresse <a href="mailto:privacy@digitalpartners.io" target="_top">privacy@digitalpartners.io</a> oder die im Impressum von Digitalpartners.io bezeichneten Daten durch Digitalpartners löschen zu lassen. Im Falle der Löschung Ihres Kundenkontos auf Anforderung durch Sie werden Ihre Daten unverzüglich gelöscht, sobald sie nicht mehr zur beiderseitigen Vertragserfüllung 
                    benötigt werden und Digitalpartners zur Speicherung nicht rechtlich verpflichtet ist.
                    <br />
                    <span className="legalIndent">7.6 </span>Um unberechtigte Zugriffe Dritter auf ihre persönliche Daten, insbesondere Finanzdaten, zu verhindern,
                    wird der Registrierungsvorgang per SSL Technik verschlüsselt.
                    <br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                     8. Nutzung des Online-Chats sowie Kontakt per Telefon oder E-Mail
                    </span>
                  <span>
                       <div className="legalpa">
                     <span className="legalIndent">8.1 </span>Sie haben auch die Möglichkeit, Digitalpartners online über Digitalpartners.io
                      (so genannter „Online-Chat“) sowie telefonisch und per E-Mail zu kontaktieren.<br />
                      <span className="legalIndent">8.2 </span>Die von Ihnen im Rahmen dessen übersandten oder genannten Daten werden verwendet
                      um Ihre Anfrage zu beantworten und Sie dazu telefonisch oder per E-Mail zu kontaktieren sowie gegebenenfalls für die beiderseitige Vertragserfüllung. Werden Ihre Daten auch zum Zwecke der beiderseitigen 
                      Vertragserfüllung verwendet, gelten Ziffer 7.3 bis 7.5 dieser Datenschutzerklärung entsprechend.
                    <br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                      9. Soziale Netzwerke und Dienste Dritter
                    </span>
                  <span>
                       <div className="legalpa">
                      <span className="legalIndent">9.1 </span>Digitalpartners setzt auf Digitalpartners.io Social-Media
                      Plug-Ins ein von den sozialen Netzwerken Facebook, Twitter, Instagram, Xing, LinkedIn und Angel List.<br />
                      <span className="legalIndent">9.2 </span>Ohne, dass Sie auf die Schaltfläche eines Plug-Ins klicken,
                      werden keine personenbezogenen Daten an die Anbieter dieser Plug-Ins übermittelt.<br />
                      <span className="legalIndent">9.3 </span>Betätigen Sie die Schaltfläche eines Plug-Ins werden automatisiert personenbezogene Daten an den Anbieter des Plug-Ins übermittelt und können von diesem gespeichert und verwendet werden. Bitte beachten Sie, 
                      dass dies im Ausland, d.h. insbesondere in den Vereinigten Staaten von Amerika, erfolgen kann.<br />
                      <span className="legalIndent">9.4 </span>Digitalpartners hat keine vollständige Kenntnis von Art und Umfang der Datenerhebung und deren Verwendung und Verarbeitung und kann diese auch nicht beeinflussen.<br />
                      <span className="legalIndent">9.5 </span>Aktivieren Sie einen Plug-In erhält der Plug-In-Anbieter die Information, dass Sie diesen auf Digitalpartners.io oder der entsprechenden Unterseite von Digitalpartners.io aktiviert haben.
                       Außerdem werden die in Ziffer 6 dieser Datenschutzerklärung genannten Informationen an den Plug-In-Anbieter übermittelt. Nach eigenen Angaben des Plug-In-Anbieters wird im Fall von Facebook in 
                       Deutschland nur eine anonymisierte IP-Adresse erhoben und übermittelt.<br />
                       <div className="legal-secondindent">
                      <span className="legalIndent">9.5.1 </span>Die in Ziffer 9.5 dieser Datenschutzerklärung bezeichnete Datenerhebung
                      und -übermittlung erfolgt unabhängig davon, ob Sie über ein Benutzerkonto beim
                      jeweiligen Plug-In-Anbieter verfügen oder nicht. Verfügen Sie über ein Benutzerkonto beim
                      jeweiligen Plug-In-Anbieter und sind Sie zum Zeitpunkt, in dem Sie den jeweiligen Plug-In anklicken
                      bei diesem Benutzerkonto eingeloggt, werden die an den jeweiligen Plug-In-Anbieter übermittelten Daten direkt
                      Ihrem Benutzerkonto zugeordnet. Sofern Sie den aktivierten Plug-In bestätigen und z.B. die Seite verlinken, speichert
                      der Plug-In-Anbieter auch diese Information in Ihrem Benutzerkonto und kann Ihren Kontakten dies auch öffentlich mitteilen. Um die Zuordnung zu Ihrem Benutzerkonto beim jeweiligen
                      Plug-In-Anbieter zu verhindern, sollten Sie sich vor dem Anklicken des Plug-Ins auf Digitalpartners.io
                      von Ihrem Benutzerkonto beim jeweiligen Plug-In-Anbieter ausloggen.<br />
                       <span className="legalIndent">9.5.2 </span>Der jeweilige Plug-In-Anbieter speichert die an ihn übermittelten Daten, unabhängig davon ob Sie ebenfalls in Ihrem Benutzerkonto beim jeweiligen Plug-In-Anbieter eingeloggt sind in der Regel als Nutzerprofile, die für folgende Zwecke verwendet werden: <br />
                        <div className="legal-indent">
                        •	Bedarfsgerechte Werbung <br />
                        •	Markforschung <br />
                        •	Bedarfsgerechte Optimierung der Internetseiten des Plug-In-Anbieters <br />
                        • Information anderer Mitglieder des sozialen Netzwerkes über Ihre Aktivitäten auf Digitalpartners.io <br />
                      </div>
                       <span className="legalIndent">9.5.3 </span>Sie sind berechtigt, der Bildung von Nutzerprofilen mit den über Sie erhobenen Daten zu widersprechen.
                       Dazu wenden Sie sich an den jeweiligen Plug-In-Anbieter. Digitalpartners hat auf die Beachtung Ihres Widerspruchs
                        keinen Einfluss und ist dafür auch nicht verantwortlich. <br />
                        </div>
                    <span className="legalIndent">9.6 </span> Weitere Informationen dazu und zu Ihren diesbezüglichen Rechten erhalten Sie in den Datenschutzerklärungen der
                    Plug-In-Anbieter als verantwortliche Stellen, die Sie wie folgt abrufen können: <br />
                      <div className="legal-secondindent">
                      9.6.1 Facebook: Facebook Inc., 1601 S California Ave, Palo Alto, California 94304 USA – <a href="https://www.facebook.com/policy.php">https://www.facebook.com/policy.php</a><br />
                      9.6.2 Twitter: Twitter, Inc. 1355 Market St., Suite 900, San Francisco, California 94103 USA – <a href="https://twitter.com/privacy?lang=de">https://twitter.com/privacy?lang=de</a> <br />
                      9.6.3 Xing: XING AG, Dammtorstraße 30, 20354 Hamburg, Bundesrepublik Deutschland <a href="https://www.xing.com/privacy">https://www.xing.com/privacy</a><br />
                      9.6.4 Angel List: AngelList LLC, 814 Montgomery Street, San Francisco, CA 94133 <a href="https://angel.co/privacy">https://angel.co/privacy</a><br />
                        </div>
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                      10. Datenweitergabe an Dritte
                    </span>
                  <span>
                      <div className="legalpa">
                      <span className="legalIndent">10.1 </span>Digitalpartners kann Ihre personenbezogenen Daten an Dritte weitergeben, wenn vertraglich vereinbarte Leistungen
                      und Konditionen gemeinsam mit dem Drittanbieter angeboten werden bzw. dessen Leistungen beinhalten.
                      In diesem Fall weist Digitalpartners Sie im Rahmen des Bestellprozesses auf die Übermittlung der Daten an den Dritten hin<br />
                      <span className="legalIndent">10.2 </span>Digitalpartners führt die Datenverarbeitung auch über externe Dienstleister durch.<br />
                        <div className="legal-secondindent">
                      <span className="legalIndent">10.2.1 </span>Diese externen Dienstleister werden von Digitalpartners sorgfältig ausgewählt und schriftlich beauftragt. Die zur Datenverarbeitung eingeschalteten externen Dienstleister sind an die Weisungen von Digitalpartners gebunden und werden regelmäßig in 
                      Bezug auf die Einhaltung des Datenschutzes und der Datensicherheit kontrolliert.<br />
                      <span className="legalIndent">10.2.2 </span>Die externen Dienstleister sind nicht zur Weitergabe der Daten an Dritte berechtigt.<br />
                      </div>
                      <span className="legalIndent">10.3 </span>Digitalpartners legt persönliche Daten zur Rechtsdurchsetzung oder gegenüber Regierungsbehörden offen, wenn Digitalpartners dazu rechtlich verpflichtet ist. <br />
                    <br />
                    </div>
                  </span>
                  <span className="heading">
                      11. Webtracking
                    </span>
                  <span>
                      <div className="legalpa">
                      <span className="legalIndent">11.1 </span>Digitalpartners setzt auf Digitalpartners.io folgenden Analysedienste ein:<br />
                      „Heap”, ein Analysedienst der Heap Inc., 116 Natoma Street, 3rd Floor, San Francisco, CA 94105, USA
                      <span className="legalIndent">11.2 </span>Derie unter Ziffer 11.1 dieser Datenschutzerklärung bezeichneten Analysedienste verwendent Cookies,
                       die auf Ihrem Rechner gespeichert werden und eine Analyse Ihres Benutzerverhaltens ermöglichen. <br />
                       <span className="legalIndent">11.3 </span>Die durch die Cookies erzeugten Informationen werden können durch den Analysedienst auch im Ausland, insbesondere auf Servern in den Vereinigten Staaten von Amerika, erfolgen. <br />
                    <span className="legalIndent">11.4 </span>Die im Rahmen des Einsatzes desr Analysedienstes durch Ihren Browser übermittelte IP-Adresse wird nicht mit anderen personenbezogenen Daten über Sie zusammengeführt.
                    <br />
                     <span className="legalIndent">11.5 </span>Die Speicherung der durch denie Analysedienste eingesetzten Cookies können Sie ausschließen,
                      indem Sie in Ihren Browsereinstellungen die Verwendung von Cookies ausschließen.
                      In diesem Fall können Sie jedoch auch weitere Funktionen von Digitalpartners.io nicht nutzen.
                      <br />
                      <span className="legalIndent">11.6 </span>Sie haben auch die Möglichkeit die Erfassung und Verarbeitung Ihrer personenbezogenen Daten auszuschließen, indem Sie Ihre Cookies deaktivieren. <br />
                      <span className="legalIndent">11.7 </span>Die Datenschutzbestimmungen desr Analysedienstes können Sie unter folgenden Links einsehen: <br />
                       <a href="https://heapanalytics.com/privacy">https://heapanalytics.com/privacy</a>
                      <br />
                      </div>
                  </span>
                  <span className="heading">
                      12.	Newsletter
                    </span>
                  <span>
                      <div className="legalpa">
                      <span className="legalIndent">12.1 </span>Digitalpartners sendet Ihnen nur bei Vorliegen Ihrer ausdrücklichen Zustimmung den
                      Digitalpartners Newsletter zu. Ihre zu diesem Zweck angegebene E-Mail-Adresse wird solange gespeichert bis Sie den Newsletter abbestellen.<br />
                    <span className="legalIndent">12.2 </span>Sie haben das Recht, die Einwilligung in die Zusendung des Newsletter jederzeit zu
                    widerrufen. Den Widerruf können Sie durch Betätigung der Schaltfläche „Newsletter abbestellen“, die in
                    jedem versendeten Newsletter enthalten ist, durch eine E-Mail an <a href="mailto:privacy@digitalpartners.io" target="_top">privacy@digitalpartners.io</a> oder durch eine Nachricht an die im Impressum von Digitalpartners.io angegebenen Kontaktdaten erklären. Nach Zugang Ihres Widerrufs wird Ihre E-Mail-Adresse, sofern Sie nicht aus den unter Ziffer 7 dieser
                     Datenschutzerklärung genannten Gründen gespeichert bleibt, unverzüglich gelöscht.<br />
                    <span className="legalIndent">12.3 </span>Für die Anmeldung zum Newsletter benötigt Digitalpartners ausschließlich Ihre E-Mail-Adresse. Ihre weiteren Angaben werden nur für die Personalisierung des Newsletters verwendet und im Falle eines Widerrufs ebenfalls vollständig gelöscht.<br />
                    <span className="legalIndent">12.4 </span>Digitalpartners verwendet den Newsletter auch zum Zweck der Auswertung Ihres Nutzerverhaltens.<br />
                      <div className="legal-secondindent">
                    <span className="legalIndent">12.4.1 </span>Der Newsletter wird über die E-Mail-Marketing-Software Sendgrid des Marketinganbieters SemcGrid Inc., 1801 California Street, Suite 500, Denverb CO 80202 und die E-Mail-Marketing-Software Mailchimp des desr Marketinganbieters
                    The SendGrid, Inc. bzw. The Rocket Science Group, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308 versendet. Mehr Informationen zu diesenm Anbietern erhalten Sie unter folgendem Links: <br />
                    <div className="legal-indent">
                    •	SendGrid: <a href="https://sendgrid.com/">https://sendgrid.com/ </a><br />
                    •	Mailchimp: <a href="https://mailchimp.com/">https://mailchimp.com/</a><br />
                     </div>
                     <span className="legalIndent">12.4.2 </span>Zum Zweck des Newsletterversands speichernt SendGrid, Inc. bzw. The Rocket Science Group auf ihren Servern die Daten der Newsletter-Abonnenten, die von der Digitalpartners übermittelt werden. Dies umfasst folgende Daten: <br />
                    <div className="legal-indent">
                    •	Anrede <br />
                    •	Vor- und Nachname <br />
                    •	E-Mail-Adresse <br />
                    •	Ggf. Datum der Abmeldung <br />
                       </div>
                    <span className="legalIndent">12.4.3 </span>SendGrid, Inc. bzw. The Rocket Science Group erhebent im Auftrag von Digitalpartners wie folgt Daten: <br />
                    Die zwecks Übermittlung des Newsletters gesendeten E-Mails enthalten so genannte Tracking Pixel (Web-Beacons). Tracking Pixel sind Ein-Pixel-Bilddateien, die auf die Internetseiten von Digitalpartners verlinken. Die Analyse erfolgt durch Erhebung 
                  folgender Daten:<br />
                    <div className="legal-indent">
                  •	E-Mail-Empfänger <br />
                •	Zeitpunkt der Öffnung der E-Mail, in der der Newsletter versendet wird <br />
                •	Nutzerverhalten, d.h. Art, Zeitpunkt und Reihenfolge der Aktivierung von Links im Newsletter <br />
                sowie Tracking-Pixeln, die Ihrer E-Mail-Adresse zugeordnet und mit einer eigenen ID versehen werden. Auch im Newsletter enthaltene Links enthalten diese ID.<br />
                 </div>
                12.4.4 Die unter Ziffer 12.4.3 erhobenen Daten werden nicht mit anderen über Sie erhobenen personenbezogenen Daten zusammengeführt.<br />
                12.4.5 Sendgrid und Mailchimp speichertn die erhobenen Daten auf den Servern von SendGrid, Inc. und bzw. The Rocket Science Group und stellent sie Digitalpartners online in einem geschützten Bereich als Reports zur Verfügung.
                 </div>
                 <br />
                   </div>
                  </span>
                  <span className="heading">
                      13. Datensicherheit
                    </span>
                  <span>
                    <div className="legalpa">
                    <span className="legalIndent">13.1 </span>Digitalpartners nimmt aktuelle technische Maßnahmen zur Gewährleistung der Datensicherheit und somit insbesondere zum Schutz 
                    Ihrer personenbezogenen Daten vor Gefahren bei der Datenübertragung und der Kenntniserlangung durch Dritte vor. Diese Maßnahmen passt Digitalpartners regelmäßig dem aktuellen Stand der Technik an.
                      <br />
                    <span className="legalIndent">13.2 </span>Digitalpartners erteilt Ihnen jederzeit Auskunft über die Datensicherheit im Unternehmen. Ihre Anfrage richten Sie bitte an <a href="mailto:privacy@digitalpartners.io" target="_top">privacy@digitalpartners.io</a> oder die im Impressum von Digitalpartners.io bezeichneten Daten.<br />
                    <br />
                    </div>
                  </span>
              </Grid>
            </Grid.Column>
            {user.authenticated === true && <Grid.Column tablet={12} computer={3} textAlign="center">
              <div className="profile-page-right-sidebar">
                <ProfilePageRightSidebar userLanguage={userLanguage} strings={strings} />
              </div>
              </Grid.Column>}
          </Grid>
          {user.authenticated === false && <Footer userLanguage={userLanguage} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
}

Legal.propTypes = {
  user: PropTypes.object,
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
      user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Legal);

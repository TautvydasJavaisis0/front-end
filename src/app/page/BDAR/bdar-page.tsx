import React from 'react';
import { Layout } from 'antd';


import styles from 'app/page/BDAR/bdar-page.module.scss';
import { ArrowButton } from 'app/components/buttons/arrow-button/arrow-button';


interface Props {
  toogleBDARpage: () => void;
}

const BdarPage: React.FC<Props> = ({ toogleBDARpage }) =>

  (
    <Layout style={{ backgroundColor: '#f0f0f0' }}>
      <div className={styles.content}>
        <section className={styles.topSection}>
          <ArrowButton
            className={styles.atTop}
            pointingLeft={true}
            onClick={toogleBDARpage}
          />
          <h3>Taisyklės ir sąlygos</h3>
        </section>
        <section className={styles.textArea}>
          <h2><b>Privatumo politika</b></h2>

          <h4>
            <b>Registruodamiesi šioje interneto svetainėje
            , Jūs patikite UAB „Tautvydo bakalauras“ savo asmens
              duomenis ir suteikiate mums teisę juos tvarkyti šioje Politikoje (toliau – Politika) numatyta apimtimi,
              būdais ir tikslais. <br />
              Jeigu Jūs nesutinkate su šia Politika ar atskiromis jų sąlygomis, mes, deja, negalėsime suteikti Jums
              galimybės naudotis visomis ar bet kuria iš Bendrovės teikiamų paslaugų (toliau – Paslaugos). <br />
              Šioje Politikoje Jūs rasite visą informaciją, kokius Jūsų duomenis mes renkame ir tvarkome, kam juos
              naudojame, kiek laiko saugome ir kt. Ši informacija svarbi, todėl tikimės, kad atidžiai ją
              perskaitysite. <br /></b>
            Atkreipiame Jūsų dėmesį į tai, kad tiek Politika, tiek ir Taisyklės gali būti keičiamos, pildomos,
            atnaujinamos.<br />
            <b>Asmens duomenys </b>- tai bet kokia informacija, kuri gali būti naudojama identifikuoti asmenį, taip pat
            bet kokia informacija apie asmenį, kuris jau yra identifikuotas. <br />
            <b>Mes gerbiame Jūsų privatumą, o Jūsų asmens duomenų saugumas yra mūsų prioritetas.</b> Mes imamės
            atitinkamų organizacinių ir techninių priemonių užtikrinti, kad Jūsų asmens duomenys visada būtų saugūs, o
            duomenų tvarkymo veiksmai atitiktų duomenų apsaugos teisės aktų ir mūsų vidaus politikų reikalavimus.<br />
            <b>Bendrovė renka ir tvarko šiose Taisyklėse išvardintus Jūsų asmens duomenis šiais teisiniais
              pagrindais:</b>
            - Jūsų sutikimas su šioje Politikoje numatytomis sąlygomis;<br />
            - Mūsų teisėtas interesas;<br />
            - Teisinės prievolės, kylančios ir taikomos Bendrovei, vykdymas.<br />
            <b>Taikomų teisės aktų numatyta apimtimi ir sąlygomis tų pačių Jūsų asmens duomenų tvarkymui gali būti
              taikomas vienas ar keli aukščiau nurodyti teisiniai pagrindai.</b>
          </h4>
          <h2><b> 1. Kokius Jūsų duomenis tvarkome ir kodėl?</b><br />
            1.1. Registracija, patikrinimas, administravimas ir bendravimas</h2>
          Registracija <br />

          Registruodamiesi ir sutikdami su Politika, Jūs pateikiate mums žemiau nurodytus anketinius duomenis. Tam tikrų
          registracijos duomenų pateikimas yra būtinas ir nepateikus jų, Jūs negalėsite naudotis Paslaugomis.
          Registruodamiesi Jūs patvirtinate, kad jūsų nurodyti asmens duomenys yra tikslūs ir teisingi, ir jūs esate ne
          jaunesni kaip 16 metų amžiaus. Mes neprisiimame atsakomybės už netikslius, neišsamius ar klaidingai pateikus
          Jūsų duomenis. <br />
          <div className={styles.tabeless}>
            <table>
              <tr>
                <b>Anketiniai duomenys:</b>
              </tr>
              <tr>
                <th>Duomenų kategorijos</th>
                <th>Jūsų vardas, pavardė, el. pašto adresas ir telefono numeris</th>
              </tr>
              <tr>
                <th>Duomenų tvarkymo teisinis pagrindas</th>
                <th>Jūsų sutikimas naudotis Paslaugomis Taisyklėse numatytomis sąlygomis</th>
              </tr>
              <tr>
                <th>Duomenų tvarkymo terminas</th>
                <th>Visą laikotarpį, kol Jūs naudojatės Paslaugomis. Jūsų suteiktą sutikimą ir įrodymą apie jį mes
                  galime saugoti ir ilgesnį laikotarpį, jei to reikia, kad galėtume apsiginti nuo mums pareikštų
                  reikalavimų, pretenzijų ar ieškinių.
                </th>
              </tr>
            </table>
          </div>

          <h2> Kaip ir kokiais tikslais mes naudojame Jūsų anketinius duomenis?</h2> <br />
          Pagal Jūsų <b>anketinius duomenis </b>mes <b>interneto svetainėje</b> sukuriame unikalų profilį, pagal kurį
          identifikuosime Jus kaip registruotą <b>interneto svetainės</b>, kuris suteiks jums galimybę pasinaudoti
          registruotiems naudotojams teikiamomis Paslaugomis šioje Politikoje numatytomis sąlygomis.<br />
          Pagal Jūsų pateiktus anketinius duomenis mes taip pat Jus atpažįstame, kai, pvz., Jūs norite atnaujinti ar
          pakeisti savo duomenis, kreipiatės į mus dėl tam tikros asmeninės informacijos pateikimo, su asmens duomenų
          tvarkymu susijusių teisių įgyvendinimo ir kt.<br />
          Jūsų anketoje pateiktus <b>kontaktinius duomenis </b>(elektroninį paštą, telefono numerį) mes taip pat
          naudojame bendravimo su Jumis tikslais, įskaitant ir atsakydami į Jūsų užklausas, pastabas, teikdami Jums
          svarbią informaciją apie Paslaugas, jų teikimą ir (ar) šios Politikos pasikeitimus, susisiekdami su
          Jumis.<br />
          Labai svarbu tai, kad Jūsų pateikiami anketiniai duomenys būtų <b>tikslūs ir teisingi</b>. Jeigu Jūs
          nurodysite <b>neteisingus (netikrus) duomenis</b>, juos pamiršite arba neatnaujinsite pasikeitusių duomenų,
          mums gali būti sunku užtikrinti Paslaugų teikimą, taip pat gali kilti nesklandumų įgyvendinant Jūsų teises.
          Mes jokiu atveju nebūsime atsakingi už žalą, atsiradusią Jums dėl to, jog Jūs nurodėte neteisingus ar
          neišsamius asmens duomenis.<br />
          Jeigu pasikeičia Jūsų pateikti duomenys, Jūs turite nedelsdamas mus apie tai informuoti, pakeisdamas
          atitinkamus duomenis registracijos formoje interneto svetainėje arba mobiliojoje aplikacijoje. Apie tai, <b>kaip
          atnaujinti pasikeitusius savo anketinius duomenis</b>, prašome susipažinti šios Politikos 5.2 skyriuje.<br />
          <b>Bendrovė neturės galimybės patikrinti Jūsų pateikiamų duomenų teisingumo ir atitikimo
            tikrovei.</b> Priimdami Jūsų registracijos anketą, mes laikysime, kad Jūsų duomenys yra tikslūs ir teisingi,
          o visi Jūsų sutikimai yra pateikti Jūsų laisva valia, išsamiai susipažinus su šia Politika ir
          Taisyklėmis.<br />
          <h2>1.2. Jūsų paskyros administravimas</h2><br />
          Mes tvarkome Jūsų duomenis tam, kad galėtume prižiūrėti ir administruoti Jūsų paskyrą.<br />
          <table>
            <tr><b>Paskyros duomenys:</b></tr>
            <tr>
              <th>Duomenų kategorijos</th>
              <th>Registravimosi interneto svetainėje metu pateikti duomenys, prisijungimo prie paskyros duomenys,
                veiksmai paskyroje, įskaitant techninius naršymo duomenis (IP adresas, prisijungimo bei naršymo techninė
                informacija)
              </th>
            </tr>
            <tr>
              <th>Duomenų tvarkymo teisinis pagrindas</th>
              <th>Jūsų sutikimas sukurti ir naudotis paskyra Taisyklėse numatytomis sąlygomis</th>
            </tr>
            <tr>
              <th>Duomenų tvarkymo terminas</th>
              <th>Visą laikotarpį, kol Jūs esate paskyros vartotoju. Jūsų suteiktą sutikimą ir įrodymą apie jį mes
                galime saugoti ir ilgesnį laikotarpį, jei to reikia, kad galėtume apsiginti nuo mums pareikštų
                reikalavimų, pretenzijų ar ieškinių.
              </th>
            </tr>
          </table>

          Jūsų sutikimą naudotis paskyra interneto svetainėje pagrindinis.barbora.lt mes laikome gautu, kai Jūs
          atliekate Taisyklėse numatytus paskyrai susikurti reikalingus veiksmus ir patvirtinate registraciją.<br />
          <h2>1.3. Jūsų savanorystės/iniciatyvų duomenų tvarkymas</h2><br />
          Savanorystės/iniciatyvų duomenų tvarkymas<br />
          Teikdami Jums Paslaugas, mes greta Jūsų registracijos duomenų taip pat tvarkome duomenis apie Jūsų
          savanorystės/iniciatyvų operacijas (toliau – veiklos <b>duomenys</b>).<br />
          <table>
            <tr>Paslaugų administravimo tikslu tvarkomi Jūsų veiklos duomenys:</tr>
            <tr>
              <th>Duomenų kategorijos</th>
              <th>Jūsų vardas, pavardė, el. pašto adresas, telefono numeris.</th>
            </tr>
            <tr>
              <th>Duomenų tvarkymo pagrindas</th>
              <th>Jūsų sutikimas naudotis paskyra Taisyklėse numatytomis sąlygomis</th>
            </tr>
            <tr>
              <th>Duomenų tvarkymo terminas</th>
              <th>2 metai nuo operacijos (registracijos, savanorystės, iniciatyvos paskelbimo) atlikimo dienos.</th>
            </tr>
          </table>

          Kaip mes naudojame Jūsų veiklos duomenis?<br />
          Programėlėje vykdomus veiksmus: registracijos, savanorystės, iniciatyvos paskelbimo - duomenis mes saugome 2
          metus nuo operacijos atlikimo dienos, o terminui pasibaigus – juos sunaikiname ir/arba patikimai nuasmeniname,
          t.y. negrįžtamai atsiejame nuo Jūsų anketinių duomenų ir kitokios Jus individualizuojančios informacijos.<br />

          <h2>1.4. Teisė susipažinti su mūsų tvarkomais Jūsų asmens duomenimis</h2><br />
          Jūs turite teisę gauti mūsų patvirtinimą, ar mes tvarkome Jūsų asmens duomenis, o taip pat teisę susipažinti
          su mūsų tvarkomais Jūsų asmens duomenimis ir informacija apie duomenų tvarkymo tikslus, tvarkomų duomenų
          kategorijas, duomenų gavėjų kategorijas, duomenų tvarkymo laikotarpį, duomenų gavimo šaltinius, automatizuotą
          sprendimų priėmimą, įskaitant profiliavimą, bei jo reikšmę ir pasekmes Jums.<br />
          Didžiąją dalį šios informacijos mes pateikiame Jums šioje Politikoje ir tikime, kad ji yra Jums naudinga.<br />
          Jeigu esate interneto svetainės pagrindinis.barbora.lt paskyros naudotojas, Jūs galite bet kada savo paskyroje
          susipažinti su mūsų tvarkomais Jūsų asmens duomenimis (pvz.: patikrinti aktualią anketinę informaciją, Jūsų
          pateiktus sutikimus), gauti Jums išrašytas sąskaitas faktūras už 12 paskutinių mėnesių. Jeigu esate BARBORA
          mobiliosios aplikacijos naudotojas, su visa paminėta informacija galite susipažinti mobiliojoje
          aplikacijoje.<br />
          Jeigu šioje Politikoje, interneto svetainės pagrindinis.barbora.lt paskyroje arba BARBORA mobiliojoje
          aplikacijoje pateikta informacija Jums nepakankama arba pageidaujate gauti pirkimo operacijų istoriją už
          ilgesnį nei 12 mėnesių laikotarpį, Jūs visuomet galite kreiptis į mus šios Politikos 6 skyriuje nurodytais
          būdais.<br />
          <h2>1.5. Teisė ištaisyti asmens duomenis</h2><br />
          Jeigu pasikeitė Jūsų registracijos anketoje mums pateikti duomenys arba Jūs manote, kad mūsų tvarkoma
          informacija apie Jus yra netiksli ar neteisinga, Jūs turite teisę reikalauti šią informaciją pakeisti,
          patikslinti ar ištaisyti.<br />
          Savo duomenų korekcijas Jūs galite atlikti interneto svetainės pagrindinis.barbora.lt paskyroje arba BARBORA
          mobiliojoje aplikacijoje. Jūs taip pat galite kreiptis į mus šios Politikos 6 skyriuje nurodytais būdais ir
          prašyti, kad Jūsų duomenis ištaisytume ar patikslintume mes.<br />
          <h2>1.6. Teisė atšaukti sutikimą</h2><br />
          Tais atvejais, kai Jūsų duomenis mes tvarkome Jūsų sutikimo pagrindu, Jūs turite teisę bet kada atšaukti savo
          sutikimą ir Jūsų sutikimu grindžiamas duomenų tvarkymas bus nutrauktas. Tam tikrais atvejais tai gali reikšti,
          kad nebegalėsime suteikti galimybės toliau naudotis mūsų Paslaugomis.<br />
          Pavyzdžiui, Jūs galite bet kada atšaukti savo sutikimą gauti pasiūlymus ir naujienas, taip pat sutikimą dėl
          duomenų profiliavimo teikiant Jums asmeninius pasiūlymus. Šių sutikimų atšaukimas neužkirs kelio Jums toliau
          naudotis Paslaugomis, tačiau tai reikš, kad mes negalėsime teikti Jums naudingų pasiūlymų.<br />
          Savo sutikimus Jūs galite koreguoti (juos atšaukti ar iš naujo suteikti) pateikdami atitinkamai atnaujintą
          registracijos anketą, keisdami sutikimų nustatymus savo paskyroje arba mobiliojoje aplikacijoje arba susisiekę
          su mumis šios Politikos 6 skyriuje nurodytais būdais.<br />
          Nustojus galioti Jūsų sutikimui, jį atšaukus arba panaikinus, mes Jūsų sutikimu tvarkytus duomenis
          sunaikiname, o Politikoje nurodytais atvejais – patikimai ir neatstatomai nuasmeniname.<br />
          Bet kokiu atveju Jūsų suteiktą sutikimą ir įrodymą apie jį mes galime saugoti ir ilgesnį laikotarpį, jei to
          reikia, kad galėtume apsiginti nuo mums pareikštų reikalavimų, pretenzijų ar ieškinių.<br />
          <h2>1.7. Teisė pateikti skundą</h2><br />
          Jeigu Jūs manote, kad Jūsų duomenis mes tvarkome pažeisdami duomenų apsaugos teisės aktų reikalavimus, mes
          visuomet pirmiausia prašome kreiptis tiesiogiai į mus. Mes tikime, kad geranoriškomis pastangomis mums pavyks
          išsklaidyti visas Jūsų abejones, patenkinti prašymus ir ištaisyti mūsų padarytas klaidas, jeigu tokių
          bus.<br />
          Jeigu Jūsų netenkins mūsų siūlomas problemos išsprendimo būdas arba, Jūsų nuomone, mes nesiimsime pagal Jūsų
          prašymą būtinų veiksmų, Jūs turėsite teisę pateikti skundą priežiūros institucijai, kuria Lietuvos
          Respublikoje yra Valstybinė duomenų apsaugos inspekcija.<br />
          <h2>1.8. Teisė nesutikti su duomenų tvarkymu, kai tvarkymas pagrįstas teisėtais interesais</h2><br />
          Jūs turite teisę nesutikti su asmens duomenų tvarkymu, kai asmens duomenys yra tvarkomi remiantis mūsų
          teisėtais interesais. Vis dėlto, atsižvelgiant į Paslaugų teikimo tikslus ir abiejų šalių (tiek Jūsų, kaip
          duomenų subjekto, tiek mūsų, kaip duomenų valdytojo) teisėtų interesų pusiausvyrą, Jūsų prieštaravimas gali
          reikšti, kad nutraukę mūsų teisėtu interesu grindžiamą Jūsų duomenų tvarkymą, mes negalėsime suteikti
          galimybės Jums toliau naudotis Paslaugomis.<br />
          Norėdami pasinaudoti šiame skirsnyje nurodyta teise, prašom pateikti raštišką prašymą mūsų Duomenų apsaugos
          pareigūnui.<br />
          <h2>1.9. Teisė ištrinti duomenis (teisė būti pamirštam)</h2><br />
          Esant tam tikroms duomenų tvarkymo teisės aktuose įvardintoms aplinkybėms (kai asmens duomenys tvarkomi
          neteisėtai, išnyko duomenų tvarkymo pagrindas ir kt.), Jūs turite teisę prašyti, kad mes ištrintume Jūsų
          asmens duomenis. Norėdami pasinaudoti šia teise, prašom pateikti raštišką prašymą mūsų Duomenų apsaugos
          pareigūnui.<br />
          Svarbu pažymėti, kad Jūsų anketiniai duomenys be Jūsų atskiro prašymo bus ištrinti, o kiti duomenys – ištrinti
          arba patikimai nuasmeninti, jeigu Jūs nutrauksite naudojimąsi Paslaugomis.<br />
          <h2>2.0. Teisė apriboti duomenų tvarkymą</h2><br />
          Esant tam tikroms duomenų tvarkymo teisės aktuose įvardintoms aplinkybėms (kai asmens duomenys tvarkomi
          neteisėtai, Jūs užginčijate duomenų tikslumą, Jūs pateikėte prieštaravimą dėl duomenų tvarkymo mūsų teisėto
          intereso pagrindu ir kt.), Jūs taip pat turite teisę apriboti Jūsų duomenų tvarkymą. Visgi, turime pažymėti,
          kad dėl duomenų tvarkymo apribojimo ir tokio apribojimo laikotarpiu mes galime neturėti galimybės užtikrinti
          Jums Paslaugų teikimo.<br />
          Norėdami pasinaudoti šiame skirsnyje nurodyta teise, prašom pateikti raštišką prašymą mūsų Duomenų apsaugos
          pareigūnui.<br />

        </section>
      </div>
    </Layout>
  );

export { BdarPage };


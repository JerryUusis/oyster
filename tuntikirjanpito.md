# työaikakirjanpito

| päivä | aika | mitä tein |
| :----:|:-----| :-----|
| 5.7. | 0.5   | Luo projektille repositorio. MUI-teeman ja React Routerin pystytys. |
|  | 2.5   |  Luo Header ja Sliding Drawer komponentit ja anna niille alustavat tyylit.  |
|  | 1   |  Luo profiilisivulle alustavat tyylit. |
|  | **4**   |   |
| 6.7. | 1    | Pystytä testiympäristö ja konfiguroi TypeScript, sekä eslint.  |
| | 2    | Luo apufunktio testien suorittamiseen käyttäen MUI-teemaa. Tee ensimmäiset renderöintitestit. |
|  | **3**   |   |
| 7.7. | 1    | Asenna ja konfiguroi Playwright, TS ja ESLint |
|  | 2    | Konfiguroi Playwright ja Sonar Cloud toimimaan GitHub actionsien kanssa. Asenna Docker ja Nektos act paikallisia workflow ajoja varten. |
|  |  4   | Debugga `playwright.yml` ja `playwright.config.ts` GitHub actions ajoja varten |
|  | **7**   |   |
| 8.7. |  1   | Konfiguroi playwright ajamaan testit erikseen mobiililla ja suuremmilla näytöillä |
|  |  2,5   | Perusta backend kansioon oyster_back. Konfiguroi typescript,luo rakenne, asenna tyypit ja moduulit. |
|  |  3,5   | Debuggaa Firebase Admin SDK:ta |
|  |  **7**   |  |
| 8.7. |  2   | Onnistuneesti konfiguroi Firebase Admin SDK ja luo (tietokantaan) käyttäjiä rekisteröivä router. |
|  |  2  | Luo sisäänkirjautuminen palvelimelle Firebase Admin SDK:n avulla. Lisää virheidenkäsittely. |
|  |  1  | Firebase emulatoreihin tutustuminen integraatiotestejä varten  |
|  |  **4**  |  |
| 9.7. |  2   | Testitietokannan perustaminen Firestoreen. Luo alustus userRouter-kontrollerin testaamista varten. Konfiguroi `tsconfig`. Säädä ympäristömuuttujat testitietokantaa varten. |
|  |  1  | Refaktoroi ja luo lisää CRUD-operaatioita käyttäjien hallintaa varten. Luo apufunktioita `testHelper.ts` tiedostoon. Lisää testejä GET end point:ia varten. |
|  |  1  | Debuggaa ja konfiguroi Morgania ja TypeScript:iä. Opiskele ESM:n ja CJS:n eroista. |
|  |  **4**  |  |
| 16.7. | 2  | Säädä miten backend:in testejä ajetaan offline-tilassa  [Firebase emulatorien](https://firebase.google.com/docs/emulator-suite) avulla. Debuggaa supertestiä. |
|  | 1  | Refaktoroi [Firebase Adminin](https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks) yhdistäminen emulaattoreihin |
|  |  **3** |  |
| 5.8. | 1  | Aloita backendin dokumentointi |
|  | 1 | Refaktoroi firebase SDK:n asennus ja backendin automatisoidut testit github actionsilla |
|  | 1.5 | Luo salasanan generoiva funktio testaamista varten |
|  | 1.5 | Luo lisää testejä `user` controllerille |
|  |  **5** |  |
| 6.8. | 2.5  | Luo lisää testejä `user` controllerille |
| | 0.5  | Tutustu Firebasen [käyttäjienhallintaan](https://firebase.google.com/docs/auth/web/start#web_2) |
| | 1.5  | Rakenna sisäänkirjautumislomake ja säädä [Firebase Client](https://firebase.google.com/docs/firestore/client/libraries) -kirjasto sisäänkirjautumista varten |
| | 1  | Rakenna backendille tunnistautuminen [Firebasen omalla](https://firebase.google.com/docs/auth/admin/verify-id-tokens#web) token-pohjaisella tunnistautumisella |
| | 1  | Debuggaa backendin token-pohjaista kirjautumista yhdessä frontin kanssa |
|  |  **6.5** |  |
| 7.8. | 2.5  | Luo testejä `login` routerille. Säädä Firebase Auth testejä varten. Debuggaa Vitestiä ja `login` routeria. |
|  |  2.5 | Refaktoroi `login` router, frontin sisäänkirjautumislomake ja testit käyttämään Authorization headeria tokenien säilyttämiseen |
| | **5** |  |
| 8.8. | 3 | Refaktoroi `backend_tests.yml` toimimaan paikallisesti Nektos Act:in avulla. Säädä .yml-tiedoston ympäristömuuttujat [`.secrets`-tiedostoon](https://nektosact.com/usage/index.html#secrets) (samaan tapaan kuin käyttäisi GitHubin repositiroioiden salaisuuksia). |
| | 1 | Debuggaa `login.test.ts`. Säädä CI-ympäristöön sopiva host-osoite, jotta [emulaattorit](https://firebase.google.com/docs/emulator-suite/connect_auth?hl=en#web) toimivat. |
| | 1.5 | Debugga yllättäen rikkoutunut `playwright.yml` |
| | **5.5** |  |
| 12.8. | 1.5  | Luo sisäänkirjautumissivu `Register.tsx` ja lisää rekisteröintitoiminallisuus. |
|  | 6 | Asenna [Redux Toolkit](https://redux-toolkit.js.org/). Lue `alertSlice.ts` validoinnin tilan käsittelyä varten. Luo validointikomponentti `AlertHandler.tsx`. Paranna `Login.tsx` ja `Register.tsx` virheidenkäsittelyä sisäänkirjautuessa tai rekisteröityessä. Refaktoroi `registerService.ts` virheidenkäsittely. Refaktoroi `setAlert` reduceria. |
|  | 1  | Päivitä `README.md` ja tee designerin kanssa tilannekatsaus. |
|  | **8.5**  |  |
| 13.8. | 2 | Refaktoroi token-perustainen autentikointi korjaten `user.ts`, `testHelper.ts` ja `firestore.ts`. Korjaa `user.test.ts` testit. |
|   | 2.5  | Refaktoroi `login.ts` ja korjaa `login.test.ts` testit. | 
|   |  1.5 | Korjaa `Login.tsx` token-kirjautuminen ja `loginService.ts`. Refaktoroi virheidenkäsittely. | 
|   | 1 | Päivitä backendin dokumentaatiota | 
|    | **7**   | | 
| 14.8. | 1 | Refaktoroi käyttäjän poistava funktio `deleteById()` poistamaan myös käyttäjän tiedot Firebase Authentication kannasta, jos käyttäjän UID löytyy. |
|    | **1**   | | 
| yht   | **67**   | | 

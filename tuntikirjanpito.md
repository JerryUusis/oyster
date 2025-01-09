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
| 15.8. | 2 | Tee `ProtectedRoute.tsx` kirjautumattomien käyttäjien näkymän hallintaan. Säädä `Login.tsx` siirtämään käyttäjä omalle profiilisivulleen mikäli salasana ja sähköposti olivat oikein. |
|    | 2 | Tee thunk funktio joka hakee tilan local storagesta ja siirtää tilan Redux storeen. Päivitä käyttäjän tilaan tarvittava interface `UserObject` ja tyyppi `UserState`. Refaktoroi `Login.tsx` käyttäjäntilan haku `useEffect()` hookilla. | 
|    | 2 | Refaktoroi renderöintitestit, apufunktiot ja tee testit `Login.tsx`-routelle | 
|    | **6** |   | 
|  16.8.  | 2.5 | Yritä tehdä testi joka katsoo kutsutaanko `getUserFromLocalStorage()` funktiota renderöitäessä.  | 
|    | 3.5 | Onnistu luomaan [spyOn](https://v1.vitest.dev/api/vi#vi-spyon) funktio, joka katsoo että `getUserFromLocalStorage()` funktiota kutsutaan renderöitäessä  | 
|    | **6** |   |
|  19.8. | 1.5 | Tee workflow tiedosto renderöintitestejä varten ja testaile sen toimivuutta [Nektos act](https://nektosact.com/introduction.html):illa paikallisesti. Tee alustavat E2E-testit `/login` osoitteelle. |
|    | 5.5 | Tee E2E-testejä käyttäjän rekisteröintiä varten. Luo `testHelper.ts` apunfunktioita varten. Ota käyttöön Firebase emulaattorit nollaava [endpoint](https://firebase.google.com/docs/emulator-suite/connect_firestore#clear_your_database_between_tests).  |
|    | **7** |   |
|  20.8.  | 2.5 | Korjaa "fleikkaavat" rekisteröintiä testaavat testit. Refaktoroi `/register`-sivuun liittyvät apufunktiot. Luo apuluokka `RegisterPage` tiedostoon `registerHelper.ts`. |
|    | 3 |  Pane alulle sisäänkirjautumista testaavat E2E testit `/login` sivulle. Luo apuluokka `LoginPage` tiedostoon `loginHelper.ts` Refaktoroi clearUsers() funktio lisäten siihen Firebase emulaattorien Authentication:in nollaava [kutsu](https://firebase.google.com/docs/reference/rest/auth#section-auth-emulator-clearaccounts). |
|    | 1.5 | Debuggaa rikkoutunut `playwright.yml` Nektos Act:illa paikallisesti. Yritä saada Firebase emulaattorit käynnistymään ja ajaa E2E testit niiden avulla. |
|    | **7** |   |
|  21.8.  | **7** | Jatka `playwright.yml` ja `backend.yml` debuggaamista. Korjaa FIREBASE_PROJECT_ID liittyvät ongelmat. Korjaa ja refaktoroi E2E testit ja testien importit, jotka tulivat backendin testien apufunktiosta. Konfiguroi Playwrightin [webServer](https://playwright.dev/docs/api/class-testconfig#test-config-web-server) oliota käynnistämään backend ja lisää ympäristömuuttujat. Asenna [`dotenv`](https://www.npmjs.com/package/dotenv) e2e-kansioon. |
|  22.8.  |  5  | Jatka `playwright.yml` FIREBASE_PROJECT_ID:n haasteiden kanssa. Lisää [`waitForRequest()`](https://playwright.dev/docs/api/class-page#page-wait-for-request) ja [`waitForResponse()`](https://playwright.dev/docs/api/class-page#page-wait-for-response) `loginHelper.ts` ja `registerHelper.ts`. Vähennä `/login` E2E-testien "fleikkaavuutta".| 
|   | **5**  | | 
|  23.8. | 1 | Dokumentoi backendiä toimintaa ja käyttöohjeita.  | 
|   | 1 | Dokumentoi e2e testien toimintaa ja käyttöohjeita.  | 
|   | **2**  | | 
|  24.8. | 2 | Korjaa `Profile.tsx` tyylit. Päivitä MUI-teema-oliota.  | 
|   | **2**  | | 
|  27.8. | 2 | Rakenna `CountryBlock.tsx` komponentti  | 
|  | 2 | Refaktoroi  `SlidingDrawer.tsx` komponentti ja lisää vaihtoehdot säätää käyttäjän asetuksia. Luo uusi route `ProfileSettings.tsx`. Luo apukomponentit `SettingsMenuItem.tsx` ja `MenuItem.tsx`. Säädä `SlidingDrawer.tsx` propsit. | 
|   | 1 | Tee `countryReducer.ts` maiden tilan hallintaa varten. Aloita rakentamaan hakua, joka katsoo löytyykö maiden luettelo [IDB](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase)-tietokannasta.  | 
|   | **5**  | | 
|  25.8. | 2 | Optimoi maiden hakuun liittyvää koodia. Lisää tila käyttäjän tilan hakua varten `ProtectedRoute.tsx`. Luo latausnäkymä `LoadingSpinner.tsx`. | 
|   | 2  | Refatkoroi sovellus käyttäjän varmistus autentikaation yhteydessä käyttäen [ID-token](https://firebase.google.com/docs/auth/admin/verify-id-tokens)ia. | 
| 26.8.  | 1  | Korjaa `login.test.ts` sisäänkirjautumiseen liittyvät testit. | 
|   | 1  | Refaktoroi `SlidingDrawer.tsx`, `Header.tsx` ja `DrawerMenuItem.tsx` yhteistoiminta käyttäen [`children`](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) proppia. | 
|   | 2.5 | Refatkoroi `Login.tsx` siten, ettei se hae käyttäjän kirjautumisen tilaa localStoragesta, vaan käyttää [`onAuthStateChanged()`](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user) funktiota. Refatkotroi `ProtectedRoute.tsx` hakemaan käyttäjän tila käyttäen samaa funktiota ja ID tokenia. | 
|   | **4.5**  | | 
|  5.9. | 2.5 | Korjaa autentikaation päivityksestä rikkoutuneet testit. | 
|   | **2.5**  | | 
|  5.12. | 2 | Siirrä hampurilasmenu ylhäältä alas, päivitä reitit ja vaihda ikonit. Poista `SlidingDrawer.tsx` ja siirrä uloskirjautumisen toiminallisuus `ProfileSettings.tsx`-komponenttiin. Luo `MenuBarButton.tsx` valikon ikoninappeja varten. | 
|   | 1.5 | Refaktoroi `store.ts` ja muut Reduxin tyypit testaamista varten Redux:in [dokumentaatiota](https://redux.js.org/usage/writing-tests) mukaillen. | 
|   | 0.5 | Päivitä `ProfileSettings.tsx` ja `SettingsMenuItem.tsx` tyylit MUI-paletti. | 
|   | **4**  | | 
|  10.12. | 2 | Luo `ProfilePicUpload.tsx` komponentin ja lisää alustavat tyylit. Luo `useOysterPalette()`-hookki ja korvaa sillä `useTheme()`-hookit. | 
|   | **2**  | | 
|  11.12. | 1 | Päivitä ja korjaa sivun yleisiä tyylejä. Päivitä [MUI-palette](https://mui.com/material-ui/customization/palette/) olion värit teeman mukaisiksi. Korjaa testit.| 
|   | 0.75  | Luo `Explore.tsx`. Päivitä `CountryBlock.tsx` tyylit.  | 
|   | 1.25  | Tee lazy loading CountryBlock elementille. Rakenna interface Country oliolle jne. | 
|   | **2**  | 
| 12.12. | 1 | Jatka `Explore.tsx` tyylien hiomista. | 
|   | **1**  | 
| 3.1. | 4 | Lisää mahdollisuus käyttäjälle päivittä profiilinsa tietoja, niin että ne päivittyvät tietokantaan. Päivitä backendin `user.ts` controlleria sulauttumaan uusi data tietokannassa olevaan dataan. Refaktoroi `SettingsMenuItem..tsx`. Luo    | 
|   |  1 | Rakenna funktio joka valitsee oikean Input-valikon riippuen syötteen tyypistä ProfileSettings.tsx:ään. Rakenna apufunktio `getLanguages()`, jolla käyttäjä voi valita puhumansa kielet. | 
|   |  1 | Lisää `displayCurrentValue()` ja refaktoroi (`Autocomplete`)[https://mui.com/material-ui/react-autocomplete/]:n propsit sopimaan paremmin kielenvalintaan. Optimoi `switch` lauseke. | 
|   | **6**  | | 
| 7.1. | 1 |  Korjaa käyttäjäolion `UserObject` uudet key:t backend:iin, sekä Redux:iin ja päivitä testit | 
|  | 1 |  Luo `favourites.ts` controlleri backendiin, lisää alustava virheidenhallinta ja vuorovaikutus tietokannan kanssa. | 
|  | 1 |  Lisää `GET` ja `getFavourites()` `favourites.ts` controlleriin. Luonnostele integraatiotestit. | 
|   | **3**  | | 
| 9.1. | 2 |  Luo alustavat integraatitestit `favourites.ts` controllerin POST ja GET operatioille. Päivitä `addToFavourites()` ja `getFavourites()` virheidenhallintaa jos käyttäjän ID puuttuu. | 
|   | 2.5  | Tee DELETE endpoint `favourites.ts` controllerille. Lisää `deleteFromFavourites()` ja alustava virheidenkäsittely. | 
|   | **4.5**  | | 
| yht   | **143.5**   | | 

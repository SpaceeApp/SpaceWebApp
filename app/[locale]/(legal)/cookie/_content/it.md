# Cookie Policy

Ultimo aggiornamento: 2 maggio 2026

Data di efficacia: 2 maggio 2026

## 1. Titolari del trattamento

I titolari del trattamento dei dati effettuato tramite SPACE ("App") sono:

- **Titolari:** Simone Copetti, Andrea Citton, Bernardo Andrea Cecchini, Matteo Bertini
- **Email privacy:** privacy@spaceeapp.com

## 2. Cosa sono cookie e tecnologie simili

I cookie sono piccoli file di testo che i siti web salvano nel browser. Poiché SPACE è principalmente un'app mobile, oltre ai cookie possono essere usate tecnologie equivalenti, ad esempio:

- token di sessione;
- identificatori tecnici;
- memoria locale dell'app (es. AsyncStorage) o aree sicure del dispositivo (es. SecureStore/Keychain);
- storage locale del browser quando usi la versione web (se disponibile).

In questa informativa, per semplicità, usiamo il termine "cookie" per indicare anche tecnologie simili di tracciamento tecnico non pubblicitario.

## 3. Quali categorie utilizziamo

### 3.1 Cookie/strumenti tecnici strettamente necessari

Sono necessari per il funzionamento del servizio, la sicurezza, l'autenticazione e la gestione della sessione. Senza questi strumenti l'App potrebbe non funzionare correttamente.

Esempi nell'App:

- gestione sessione autenticata e rinnovo token;
- gestione token tecnici temporanei (es. join token da deep link);
- protezione accessi e sicurezza del servizio;
- salvataggio preferenze essenziali (es. lingua);
- cache locale di cartelle e foto per le prestazioni.

Base giuridica: esecuzione del contratto/erogazione del servizio e legittimo interesse alla sicurezza (art. 6.1.b e 6.1.f GDPR).

### 3.2 Cookie/strumenti di funzionalità

Servono a ricordare scelte non strettamente necessarie ma utili all'esperienza utente (quando attivati). Esempi: preferenza del tema chiaro/scuro, stato UX locale (es. tutorial già visualizzati), token di notifica push.

Base giuridica: consenso o, nei casi applicabili, esecuzione del servizio richiesto dall'utente (art. 6.1.a o 6.1.b GDPR).

### 3.3 Cookie/strumenti analytics

Alla data di efficacia di questa policy, SPACE non utilizza cookie analytics non tecnici di profilazione o marketing. Se in futuro verranno introdotti strumenti analytics non tecnici o di terze parti con finalità statistiche non anonimizzate, ti verrà richiesto il consenso preventivo dove previsto dalla legge.

### 3.4 Cookie/strumenti di profilazione e marketing

Alla data di efficacia di questa policy, SPACE non utilizza cookie di profilazione o pubblicitari.

## 4. Elenco sintetico degli strumenti attualmente utilizzati

#### Token di sessione (Supabase Auth)
- **Finalità:** Login, mantenimento sessione sicura e comunicazione con il database
- **Durata:** Fino a logout o scadenza del token
- **Fornitore:** Supabase Inc. (terza parte tecnica)
- **Obbligatorio:** Sì

#### Token tecnico di join (SecureStore/Keychain)
- **Finalità:** Gestione inviti via deep link e onboarding collaborazione
- **Durata:** Temporaneo, fino al consumo/scadenza
- **Fornitore:** Prima parte (App)
- **Obbligatorio:** Sì, quando si usa la funzione

#### Preferenza lingua (AsyncStorage)
- **Finalità:** Ricordare la lingua selezionata
- **Durata:** Fino alla cancellazione dell'app/dei dati locali
- **Fornitore:** Prima parte (App)
- **Obbligatorio:** No

#### Cache cartelle/foto (AsyncStorage)
- **Finalità:** Prestazioni — dati in cache per evitare caricamenti ripetuti
- **Durata:** Fino al logout o alla cancellazione dei dati locali
- **Fornitore:** Prima parte (App)
- **Obbligatorio:** No (degradazione graceful in assenza)

#### Preferenza tema chiaro/scuro (AsyncStorage)
- **Finalità:** Ricordare il tema selezionato
- **Durata:** Fino alla cancellazione dell'app/dei dati locali
- **Fornitore:** Prima parte (App)
- **Obbligatorio:** No

#### Stato UX locale — hint/tutorial visti (SecureStore)
- **Finalità:** Evitare la ripetizione di hint e migliorare l'esperienza in-app
- **Durata:** Fino alla cancellazione dell'app/dei dati locali
- **Fornitore:** Prima parte (App)
- **Obbligatorio:** No

#### Token notifica push (APNs/FCM via Expo)
- **Finalità:** Ricezione di notifiche push sul dispositivo
- **Durata:** Per la durata della sessione attiva; rimosso alla disconnessione
- **Fornitore:** Apple Inc. (APNs), Google LLC (FCM), Expo Inc. — terze parti tecniche
- **Obbligatorio:** No (funzione opzionale)

#### Storage locale web (solo versione web)
- **Finalità:** Funzionamento tecnico lato browser
- **Durata:** Variabile, secondo la configurazione del browser/sessione
- **Fornitore:** Prima parte e/o terze parti tecniche
- **Obbligatorio:** Di norma sì per funzioni essenziali

**Nota:** l'App si appoggia a Supabase come fornitore di backend as a service (BaaS) per la gestione dell'autenticazione, del database e dello storage. Supabase elabora e salva localmente identificatori tecnici strettamente necessari all'erogazione del servizio, operando in conformità ai propri termini in qualità di responsabile del trattamento o titolare autonomo.

## 5. Gestione delle preferenze

### 5.1 App mobile

Puoi limitare alcune tecnologie locali intervenendo su:

- impostazioni del dispositivo;
- autorizzazioni dell'app;
- logout, disinstallazione app o cancellazione dati locali.

La disattivazione di strumenti tecnici essenziali può impedire l'uso di alcune funzioni.

### 5.2 Browser (versione web)

Se usi SPACE via web, puoi gestire o cancellare i cookie/storage dalle impostazioni del browser. La disattivazione totale dei cookie tecnici può compromettere l'autenticazione e le funzionalità di base.

## 6. Comunicazione e consenso

Quando richiesto dalla normativa applicabile:

- mostreremo strumenti informativi adeguati (es. banner o avviso equivalente su web);
- raccoglieremo il consenso prima di attivare cookie non tecnici;
- consentiremo la revoca o modifica delle preferenze in modo semplice.

I cookie/strumenti tecnici necessari non richiedono consenso preventivo, fermo restando l'obbligo informativo.

## 7. Condivisione dei dati raccolti tramite cookie/strumenti simili

I dati tecnici possono essere trattati da:

- personale autorizzato dei Titolari;
- Supabase Inc. (database, autenticazione, storage) — server in Irlanda (UE);
- Expo Inc., Apple Inc., Google LLC (notifiche push — possibili trasferimenti verso gli USA con garanzie GDPR: Clausole Contrattuali Standard);
- autorità competenti, nei casi previsti dalla legge.

Per maggiori dettagli sul trattamento, consulta la nostra Privacy Policy completa.

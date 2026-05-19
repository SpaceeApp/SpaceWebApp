# Informativa sulla Privacy

Ultimo aggiornamento: 19 maggio 2026

## 1. Titolare del Trattamento

I titolari del trattamento sono: Simone Copetti, Andrea Citton, Bernardo Andrea Cecchini, Matteo Bertini.
**Email privacy:** privacy@spaceeapp.com

I Titolari operano in qualità di contitolari ai sensi dell'art. 26 GDPR. Non è stato nominato un DPO.

I Titolari hanno definito internamente un accordo di contitolarità che disciplina, tra l'altro, la gestione delle richieste di esercizio dei diritti degli interessati e le procedure in caso di violazione dei dati personali. Il punto di contatto unico per gli interessati è privacy@spaceeapp.com. L'essenza dell'accordo è disponibile su richiesta al medesimo indirizzo.

## 2. Dati Raccolti

**Dati forniti da te:**

- Email, username e credenziali di accesso.
- Avatar, bio e impostazioni privacy del profilo.
- Foto, copertine, commenti, like interni e foto preferite (repost).
- Richieste di amicizia, amicizie, inviti e ruoli in cartella.

**Dati generati dall'uso del servizio:**

- Metadati dei contenuti: identificativi, timestamp, dimensioni dei file.
- Dati su cartelle: membri, ruoli, stato inviti, link di condivisione.
- Notifiche in-app e preferenze notifiche per categoria.
- Token di notifica push (APNs/FCM).

**Dati da te forniti per feedback e supporto:**

- Valutazioni dell'app (punteggio, punti di forza, suggerimenti).
- Segnalazioni bug (titolo, passi per riprodurre, comportamento atteso, schermata).
- Segnalazioni di utenti (motivo e descrizione facoltativa).

**Dati tecnici e locali:**

- Log tecnici e token di sessione (SecureStore/Keychain/Keystore).
- Preferenze locali, tema e cache (solo sul dispositivo, cancellati alla disconnessione).
- Accesso a libreria foto/media, clipboard e share sheet, se scelto dall'utente.
- Credenziale E2E temporanea (password conservata nello storage sicuro con protezione hardware tra la creazione dell'account e la conferma dell'email; cancellata automaticamente al primo accesso).

## 3. Cifratura End-to-End (Cartelle Private)

Le cartelle di tipo "privato" applicano cifratura end-to-end (E2E) al contenuto fotografico: ogni foto è cifrata sul dispositivo prima dell'invio al server, quindi i Titolari e Supabase non possono accedere al contenuto visivo in chiaro. Sul server sono conservati i dati cifrati e le chiavi crittografiche avvolte con la chiave dell'utente.

**Importante:** la cifratura E2E riguarda esclusivamente il contenuto delle foto. I metadati (nome della cartella, elenco membri, ruoli, timestamp, titoli delle foto) non sono cifrati end-to-end e restano accessibili ai Titolari e a Supabase nell'ambito della gestione del servizio.

**Immagini di copertina:** solo le immagini di copertina caricate esplicitamente (la foto opzionale impostata come copertina di uno Space) non sono cifrate end-to-end e vengono conservate in chiaro sul server. Quando non è impostata alcuna copertina esplicita, l'app mostra le foto cifrate più recenti della cartella come anteprima nella scheda della home — quelle foto rimangono protette da cifratura E2E.

**Configurazione identità E2E e verifica email:** la configurazione dell'identità crittografica (generazione della coppia di chiavi) non avviene durante la registrazione, ma viene rimandata al primo accesso dopo la conferma dell'email. Tra la creazione dell'account e la conferma dell'email, le credenziali necessarie per la derivazione della chiave vengono conservate temporaneamente nello storage sicuro con protezione hardware del dispositivo (SecureStore / Keychain / Keystore) e cancellate definitivamente non appena la configurazione dell'identità è completata al primo accesso. Queste credenziali non vengono mai trasmesse al server in chiaro.

**Reset della password:** reimpostare la password genera una nuova coppia di chiavi E2E completamente nuova. La precedente chiave privata è scartata in modo irreversibile — i Titolari non possono recuperarla. Di conseguenza, tutte le cartelle private esistenti diventano permanentemente inaccessibili. Per riottenere l'accesso, il proprietario o un admin della cartella deve reinvitarti affinché la chiave di cifratura della cartella possa essere rianvoltata per la tua nuova chiave pubblica.

## 4. Finalità e Basi Giuridiche

- Fornire e gestire il servizio: esecuzione del contratto (art. 6.1.b GDPR).
- Feedback, segnalazioni bug e moderazione: legittimo interesse (art. 6.1.f) e, per feedback espliciti, consenso (art. 6.1.a GDPR).
- Sicurezza e prevenzione abusi: legittimo interesse (art. 6.1.f GDPR).
- Adempimenti di legge: obbligo legale (art. 6.1.c GDPR).
- Funzionalità dispositivo (libreria foto, push, condivisione): consenso (art. 6.1.a GDPR).

## 5. Visibilità dei Contenuti tra Utenti

- Le cartelle condivise sono visibili ai soli collaboratori.
- Le foto preferite (repost/"Best Moments") sono visibili agli amici accettati, anche se non collaboratori della cartella originale. I like interni non sono mai visibili fuori dalla cartella.
- I link di condivisione cartella sono multi-uso: chiunque abbia il token può entrare entro 7 giorni dalla creazione.

## 6. Destinatari e Fornitori

- Personale autorizzato dei Titolari.
- Supabase Inc. (database, autenticazione, storage) — server in Irlanda (UE).
- Expo Inc. (distribuzione app, notifiche push).
- Autorità pubbliche nei casi previsti dalla legge.

Non vendiamo dati personali. Elenco completo disponibile a: privacy@spaceeapp.com

## 7. Trasferimenti Extra SEE

I server Supabase sono in Irlanda (UE). Il servizio push di Expo può comportare trasferimenti verso gli USA; si applicano le garanzie GDPR previste (Clausole Contrattuali Standard).

## 8. Conservazione dei Dati

- **Account/profilo:** fino a cancellazione account.
- **Contenuti in cartelle condivise:** alla cancellazione dell'account, i riferimenti all'autore vengono anonimizzati (non il contenuto stesso), per preservare l'integrità dei contenuti condivisi con gli altri membri. I contenuti di cartelle di cui sei l'unico membro vengono rimossi definitivamente.
- **Cartelle nel cestino:** fino a 30 giorni.
- **Push token:** fino alla disconnessione; eliminati dal dispositivo e revocati sul server al logout.
- **Feedback e segnalazioni:** per il tempo necessario alla valutazione.
- **Log tecnici:** per il periodo strettamente necessario.

## 9. Sicurezza

Adottiamo: autenticazione e gestione sessione; token in storage sicuro del dispositivo; Row Level Security lato backend; URL firmati a scadenza per contenuti privati; cifratura E2E del contenuto fotografico nelle cartelle private; credenziali E2E temporanee conservate esclusivamente nello storage con protezione hardware del dispositivo (SecureStore / Keychain / Keystore), cancellate automaticamente al primo accesso dopo la conferma dell'email. Nessun sistema garantisce sicurezza assoluta; adottiamo misure adeguate al rischio.

## 10. Diritti dell'Interessato

Puoi esercitare i seguenti diritti ai sensi degli artt. 15–22 GDPR:

- **Accesso** (art. 15): ottenere conferma che sia in corso un trattamento e ricevere copia dei dati.
- **Rettifica** (art. 16): correggere dati inesatti o incompleti.
- **Cancellazione** (art. 17): richiedere la rimozione dei dati quando non sono più necessari o il trattamento è privo di base giuridica.
- **Limitazione** (art. 18): sospendere il trattamento in determinati casi previsti dalla legge.
- **Opposizione** (art. 21): opporsi al trattamento basato su legittimo interesse.
- **Portabilità** (art. 20): ricevere i dati in formato strutturato e leggibile da dispositivo automatico, per i trattamenti basati su contratto o consenso.
- **Revoca del consenso:** in qualsiasi momento, senza pregiudizio per la liceità del trattamento precedente.

I Titolari rispondono alle richieste entro 30 giorni dalla ricezione. Il termine può essere prorogato di ulteriori 60 giorni in caso di particolare complessità o elevato numero di richieste.

Non effettuiamo decisioni automatizzate né profilazione con effetti giuridici o analoghi ai sensi dell'art. 22 GDPR.

Puoi proporre reclamo al **Garante per la Protezione dei Dati Personali** (www.garanteprivacy.it).

**Contatto:** privacy@spaceeapp.com

## 11. Minori

L'utilizzo del servizio richiede un'età minima di 14 anni (in Italia, ai sensi dell'art. 2-quinquies D.Lgs. 196/2003) o l'età superiore prevista dalla normativa applicabile nel Paese dell'utente. Al di sotto della soglia applicabile, l'utilizzo è ammesso esclusivamente previo consenso del titolare della responsabilità genitoriale. Non raccogliamo consapevolmente dati personali di utenti al di sotto della soglia applicabile senza tale consenso.

## 12. Modifiche

Possiamo aggiornare questa informativa. Le modifiche rilevanti saranno comunicate tramite l'app.

## 13. Contatti

- **Email:** privacy@spaceeapp.com
- **Titolari:** Simone Copetti, Andrea Citton, Bernardo Andrea Cecchini, Matteo Bertini

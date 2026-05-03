# Cookie Policy

Last updated: 2 May 2026

Effective date: 2 May 2026

## 1. Data Controllers

The data controllers for data processing carried out through SPACE ("App") are:

- **Controllers:** Simone Copetti, Andrea Citton, Bernardo Andrea Cecchini, Matteo Bertini
- **Address:** Via Villa 116, 33011 Artegna (UD), Italy
- **Privacy email:** privacy@spaceeapp.com

## 2. What Are Cookies and Similar Technologies

Cookies are small text files that websites save in your browser. Since SPACE is primarily a mobile app, equivalent technologies may be used in addition to cookies, such as:

- session tokens;
- technical identifiers;
- local app storage (e.g. AsyncStorage) or secure areas of the device (e.g. SecureStore/Keychain);
- local browser storage when using the web version (if available).

In this policy, for simplicity, we use the term "cookie" to also refer to similar technical non-advertising tracking technologies.

## 3. Which Categories We Use

### 3.1 Strictly Necessary Technical Cookies/Tools

These are necessary for the operation of the service, security, authentication and session management. Without these tools the App may not work properly.

Examples in the App:

- authenticated session management and token renewal;
- management of temporary technical tokens (e.g. join tokens from deep links);
- access protection and service security;
- saving essential preferences (e.g. language);
- local cache of folders and photos for performance.

Legal basis: contract performance/service provision and legitimate interest in security (Art. 6.1.b and 6.1.f GDPR).

### 3.2 Functionality Cookies/Tools

These are used to remember choices that are not strictly necessary but useful for the user experience (when activated). Examples: light/dark theme preference, local UX state (e.g. tutorials already viewed), push notification tokens.

Legal basis: consent or, in applicable cases, performance of the service requested by the user (Art. 6.1.a or 6.1.b GDPR).

### 3.3 Analytics Cookies/Tools

As of the effective date of this policy, SPACE does not use non-technical profiling or marketing analytics cookies. If in the future non-technical or third-party analytics tools with non-anonymised statistical purposes are introduced, your prior consent will be requested where required by law.

### 3.4 Profiling and Marketing Cookies/Tools

As of the effective date of this policy, SPACE does not use profiling or advertising cookies.

## 4. Summary List of Currently Used Tools

#### Session token (Supabase Auth)
- **Purpose:** Login, secure session maintenance and database communication
- **Duration:** Until logout or token expiry
- **Provider:** Supabase Inc. (third-party technical)
- **Required:** Yes

#### Technical join token (SecureStore/Keychain)
- **Purpose:** Management of invitations via deep link and collaboration onboarding
- **Duration:** Temporary, until consumed/expired
- **Provider:** First party (App)
- **Required:** Yes, when using the feature

#### Language preference (AsyncStorage)
- **Purpose:** Remember the selected language
- **Duration:** Until app/local data deletion
- **Provider:** First party (App)
- **Required:** No

#### Folder/photo cache (AsyncStorage)
- **Purpose:** Performance — cached data to avoid repeated loads
- **Duration:** Until logout or local data deletion
- **Provider:** First party (App)
- **Required:** No (graceful degradation without)

#### Light/dark theme preference (AsyncStorage)
- **Purpose:** Remember the selected theme
- **Duration:** Until app/local data deletion
- **Provider:** First party (App)
- **Required:** No

#### Local UX state — hints/tutorials seen (SecureStore)
- **Purpose:** Avoid repetition of hints and improve in-app experience
- **Duration:** Until app/local data deletion
- **Provider:** First party (App)
- **Required:** No

#### Push notification token (APNs/FCM via Expo)
- **Purpose:** Receiving push notifications on the device
- **Duration:** For the duration of the active session; removed on logout
- **Provider:** Apple Inc. (APNs), Google LLC (FCM), Expo Inc. — third-party technical
- **Required:** No (optional feature)

#### Web local storage (web version only)
- **Purpose:** Technical browser-side functionality
- **Duration:** Variable, depending on browser/session configuration
- **Provider:** First party and/or third-party technical
- **Required:** Typically yes for essential functions

**Note:** The App relies on Supabase as a backend-as-a-service (BaaS) provider for authentication management, database, and storage. Supabase processes and saves locally technical identifiers strictly necessary for service delivery, operating in compliance with its own terms as data processor or independent controller.

## 5. Managing Preferences

### 5.1 Mobile App

You can limit some local technologies by adjusting:

- device settings;
- app permissions;
- logout, uninstalling the app, or deleting local data.

Disabling essential technical tools may prevent the use of some features.

### 5.2 Browser (Web Version)

If you use SPACE via the web, you can manage or delete cookies/storage from your browser settings. Total disabling of technical cookies may compromise authentication and basic functionality.

## 6. Communication and Consent

When required by applicable law:

- we will display appropriate informational tools (e.g. banners or equivalent notices on the web);
- we will collect consent before activating non-technical cookies;
- we will allow simple revocation or modification of preferences.

Necessary technical cookies/tools do not require prior consent, without prejudice to the obligation to provide information.

## 7. Sharing of Data Collected via Cookies/Similar Tools

Technical data may be processed by:

- authorised personnel of the Controllers;
- Supabase Inc. (database, authentication, storage) — servers in Ireland (EU);
- Expo Inc., Apple Inc., Google LLC (push notifications — possible transfers to the USA with GDPR safeguards: Standard Contractual Clauses);
- competent authorities, in cases provided for by law.

For more details on processing, please see our full Privacy Policy.

# WRLD Sales Monitoring — Online

The WRLD Sales Monitoring Program (v5.4) as a web app. GitHub Pages hosts the page, and a Firebase Realtime Database holds the shared team data.

| File | What it is |
|---|---|
| `index.html` | The app |
| `firebase-config.js` | **The only file you edit.** It holds your Firebase project details. |
| `database.rules.json` | Open read/write rules to paste into Firebase |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

---

## 1. Create the Firebase database (about 5 minutes)

1. Go to <https://console.firebase.google.com> and sign in with Google.
2. Click **Create a project**, name it (for example `wrld-sales`), and finish the wizard. You can turn Google Analytics off.
3. In the left menu, go to **Build › Realtime Database › Create Database**.
   - Location: **Singapore (asia-southeast1)**
   - Start in **locked mode**, then click **Enable**.
4. Open the **Rules** tab, replace everything there with the contents of `database.rules.json`, and click **Publish**:
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
5. On the **Data** tab, copy the database URL shown at the top. It looks like
   `https://wrld-sales-default-rtdb.asia-southeast1.firebasedatabase.app`.
6. Optional: go to **Project settings (gear) › General › Your apps › Web (`</>`)**, register an app, and copy the `firebaseConfig` values.

## 2. Add the URL to `firebase-config.js`

Replace the `databaseURL` placeholder with the URL from step 1.5. Only `databaseURL` is required. You can leave the other fields as `PASTE-…`, or fill them in from step 1.6.

## 3. Publish on GitHub Pages

1. On <https://github.com>, click **New repository** and name it (for example `wrld-sales-monitoring`).
2. Click **uploading an existing file**, drag in all four files (including `.nojekyll`), and click **Commit changes**.
   - To make hidden files like `.nojekyll` show in Finder, press Cmd+Shift+. on Mac. In Windows Explorer, use View › Show › Hidden items.
3. Go to **Settings › Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, and folder to **/ (root)**, then click **Save**.
4. After about a minute the site is live at `https://wrldcapital.github.io/sales/`.

To change the app later, edit or re-upload the files in the repo. Pages redeploys on its own after each commit.

## 4. First use

- The first person to open the site sets up the team database with the data built into the app.
- Everyone who opens the site after that loads the team's data from Firebase. The sidebar shows **● Cloud Synced**.
- To bring over data from the old offline HTML file:
  1. In the old file, go to **Settings › Export JSON**.
  2. In the online app, go to **Settings › Import JSON** and choose that file.
- Starter accounts (`edgg`, `lead`, `support`, `sro1`) come with initial passwords that are shared privately, not in this repo. Anyone who signs in with an initial password, or with a password an admin set for them, has to choose a new one (8+ characters) before they can continue.

## What changed from the offline file

- **Team database built in.** The app connects to the Firebase project in `firebase-config.js` by itself, so nobody has to paste a URL in Settings. When the page opens, the cloud copy always takes priority, so a new browser can't overwrite the team's data.
- **Self sign-up and roles.** On the sign-in screen, people can click **Create an account** to request access. Their request shows up for Admins under **Settings › User Accounts**, where an Admin approves it and assigns a role:
  - **Admin:** every module, including Settings and approving accounts.
  - **Supervisor:** every module except Settings.
  - **Staff:** Dashboard, Sales Records, Daily Sales Report, Payouts, Channel Summary, and Sales Teams (view only).
  - **SRO:** Dashboard, Sales Records and Daily Sales Report. Their sales are tagged as Daily perspective.
- **New password at first sign-in.** Anyone signing in with an initial password, or with a password an Admin set for them, has to choose a new one first.
- **Faster sync.** Each record is saved on its own under `wrld_sales_v2` in Firebase, so saving one edit sends about 1 KB instead of the whole database (about 550 KB). The old single-copy data under `wrld_sales_v1` is copied over once and kept as a backup.
- **Lighter page.** The chart and Excel libraries (`lib/`), the starter data and the GL detail (`data/`) are separate files that browsers cache. The 1.8 MB GL detail only loads when someone opens Sales & Marketing Expenses.
- **Safer sync format.** The data is saved to Firebase as a single JSON string. Firebase would otherwise drop empty lists, such as an empty user list, and the app would come back with missing data.
- **Team-wide Reset and Erase.** **Settings › Reset to Sample Data** and **Clear Everything** now change the shared team data, and the confirmation message says so.

## ⚠ Security: read this before sharing the link

- **Open rules.** With `.read: true, .write: true`, anyone who has the database URL can read, change or delete all of the data. The URL is visible inside `firebase-config.js`. The app's own username and password screen only controls the app's screens. It does not protect the database itself.
- **Public site.** On a free GitHub plan, the repository and the Pages site are **public**. That means `index.html` can be found online, along with the data built into it: personnel names, commissions, the GL detail, forfeitures and expense budgets.
- **Firebase warnings.** Firebase will send warning emails about the open rules. That is expected with this setup.
- **Ways to lock it down later:** add Firebase Authentication with rules like `"auth != null"`, use a private repo on GitHub Enterprise Cloud with private Pages, or remove the built-in data from `index.html`.

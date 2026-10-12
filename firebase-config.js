/* ============================================================
   WRLD Sales Monitoring — Firebase settings
   ------------------------------------------------------------
   Paste your Firebase web-app config below (Firebase Console >
   Project settings > Your apps > SDK setup and configuration >
   "Config"). Only databaseURL is strictly required.

   While databaseURL still contains "YOUR-PROJECT", the app runs
   in local-only mode (data stays in each person's browser).
   ============================================================ */
window.WRLD_FIREBASE_CONFIG = {
  apiKey:            "PASTE-API-KEY",
  authDomain:        "wrld-sales-monitoring.firebaseapp.com",
  databaseURL:       "https://wrld-sales-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "wrld-sales-monitoring",
  storageBucket:     "wrld-sales-monitoring.firebasestorage.app",
  messagingSenderId: "PASTE-SENDER-ID",
  appId:             "PASTE-APP-ID",

  // Folder inside the database where the app keeps its data. Leave as is.
  dbPath: "wrld_sales_v1"
};

# 🦊 ZOHO DESK SETUP GUIDE - BALKONFUCHS

## 📋 SCHRITT-FÜR-SCHRITT ANLEITUNG

---

## **🎯 PHASE 1: ZOHO DESK CUSTOM FIELDS ERSTELLEN**

### **1.1 Zoho Desk öffnen**
1. Gehen Sie zu [desk.zoho.eu](https://desk.zoho.eu)
2. Melden Sie sich mit Ihrem Zoho-Account an
3. Wählen Sie Ihre Organisation aus

### **1.2 Custom Fields erstellen**
**Navigation:** `Setup` → `Tickets` → `Custom Fields` → `Create Field`

---

## **📊 ALLE BENÖTIGTEN CUSTOM FIELDS**

### **🎯 BASIS-FUNNEL-FELDER**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Funnel_Typ` | Dropdown | ✅ Ja | Kalkulator, Planer, Gewerbe, etc. |
| `Lead_Score` | Number | ✅ Ja | 0-100 Punkte |
| `Lead_Kategorie` | Dropdown | ✅ Ja | Cold, Warm, Hot |
| `Prioritaet` | Dropdown | ✅ Ja | P1, P2, P3, P4 |
| `Dringlichkeit` | Dropdown | ✅ Ja | Low, Medium, High |
| `Komplexitaet` | Dropdown | ✅ Ja | Simple, Medium, High |
| `Budget_Level` | Dropdown | ✅ Ja | Low, Medium, High |
| `Timeline` | Dropdown | ✅ Ja | Flexible, Urgent, Critical |
| `Follow_Up_Stunden` | Number | ✅ Ja | 12, 24, 48, 72 |
| `Geschaetzter_Wert` | Currency | ✅ Ja | Geschätzter Projektwert |

### **📍 STANDORT-FELDER**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `PLZ` | Text | ✅ Ja | Postleitzahl |
| `Stadt` | Text | ✅ Ja | Stadt/Region |

### **👤 KONTAKT-FELDER**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Anrede` | Dropdown | ❌ Nein | Herr, Frau, Divers |
| `Vorname` | Text | ✅ Ja | Vorname |
| `Nachname` | Text | ✅ Ja | Nachname |
| `E_Mail` | Email | ✅ Ja | E-Mail-Adresse |
| `Telefon` | Text | ❌ Nein | Telefonnummer |
| `Mobil` | Text | ❌ Nein | Mobilnummer |
| `Position` | Text | ❌ Nein | Position im Unternehmen |
| `Kontaktpraeferenz` | Dropdown | ❌ Nein | E-Mail, Telefon, etc. |

### **📋 RECHTLICHE FELDER**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Newsletter_Anmeldung` | Dropdown | ❌ Nein | Ja/Nein |
| `Datenschutz_Zugestimmt` | Dropdown | ✅ Ja | Ja/Nein |
| `AGB_Zugestimmt` | Dropdown | ❌ Nein | Ja/Nein |
| `Disclaimer_Zugestimmt` | Dropdown | ❌ Nein | Ja/Nein |

### **🏢 PROJEKT-FELDER (NEU)**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Projektname` | Text | ❌ Nein | Name des Projekts |
| `Projektort` | Text | ❌ Nein | Ort des Projekts |
| `Projektadresse` | Text | ❌ Nein | Vollständige Adresse |
| `Gebaeudetyp` | Dropdown | ❌ Nein | Mehrfamilienhaus, etc. |
| `Anzahl_Wohnungen` | Number | ❌ Nein | Anzahl Wohnungen |
| `Balkontyp_Details` | Text | ❌ Nein | Standbalkon, Hängebalkon, etc. |

### **💰 BUDGET-FELDER (NEU)**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Budget_Range` | Dropdown | ❌ Nein | < 50.000 €, 50.000-100.000 €, etc. |
| `Exaktes_Budget` | Text | ❌ Nein | Exakte Budget-Angabe |

### **📅 ZEITRAHMEN-FELDER (NEU)**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Zeitrahmen_Range` | Dropdown | ❌ Nein | 2024-2025, 2025-2026, etc. |
| `Exakter_Starttermin` | Text | ❌ Nein | März/2024 |
| `Exakter_Endtermin` | Text | ❌ Nein | Dezember/2025 |

### **👥 UNTERNEHMEN-FELDER (NEU)**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Unternehmensname` | Text | ❌ Nein | Name des Unternehmens |
| `Ansprechpartner` | Text | ❌ Nein | Ansprechpartner |
| `Projektleiter` | Text | ❌ Nein | Projektleiter |
| `Rechtsform` | Dropdown | ❌ Nein | GmbH, AG, etc. |
| `Mitarbeiterzahl` | Dropdown | ❌ Nein | 1-10, 11-50, etc. |

### **💬 ZUSÄTZLICHE FELDER**

| **Feldname** | **Feldtyp** | **Pflichtfeld** | **Beschreibung** |
|--------------|-------------|-----------------|------------------|
| `Zusaetzliche_Nachricht` | Textarea | ❌ Nein | Zusätzliche Nachricht |

---

## **🏢 PHASE 2: DEPARTMENTS EINRICHTEN**

### **2.1 Departments erstellen**
**Navigation:** `Setup` → `Departments` → `Create Department`

### **2.2 Benötigte Departments:**

| **Department Name** | **Beschreibung** | **ID merken** |
|---------------------|------------------|---------------|
| `Gewerbe` | Gewerbeprojekte | `ZOHO_DEPT_GEWERBE` |
| `Kalkulator` | Balkon-Kalkulator | `ZOHO_DEPT_KALKULATOR` |
| `Planer` | Balkon-Planer | `ZOHO_DEPT_PLANER` |
| `Express` | Express-Angebot | `ZOHO_DEPT_EXPRESS` |
| `Genehmigung` | Genehmigungscheck | `ZOHO_DEPT_GENEHMIGUNG` |
| `Bauzeit` | Bauzeit-Planung | `ZOHO_DEPT_BAUZEIT` |
| `Partner` | Partner werden | `ZOHO_DEPT_PARTNER` |
| `Default` | Allgemeine Anfragen | `ZOHO_DEPT_DEFAULT` |

---

## **👥 PHASE 3: ASSIGNEES EINRICHTEN**

### **3.1 Assignees erstellen**
**Navigation:** `Setup` → `Agents` → `Create Agent`

### **3.2 Benötigte Assignees:**

| **Agent Name** | **Rolle** | **ID merken** |
|----------------|-----------|---------------|
| `Senior Team` | High-Priority Leads | `ZOHO_ASSIGNEE_SENIOR` |
| `Gewerbe Team` | Gewerbeprojekte | `ZOHO_ASSIGNEE_GEWERBE` |
| `Kalkulator Team` | Kalkulator-Funnel | `ZOHO_ASSIGNEE_KALKULATOR` |
| `Planer Team` | Planer-Funnel | `ZOHO_ASSIGNEE_PLANER` |
| `Express Team` | Express-Angebote | `ZOHO_ASSIGNEE_EXPRESS` |
| `Genehmigung Team` | Genehmigungscheck | `ZOHO_ASSIGNEE_GENEHMIGUNG` |
| `Bauzeit Team` | Bauzeit-Planung | `ZOHO_ASSIGNEE_BAUZEIT` |
| `Partner Team` | Partner werden | `ZOHO_ASSIGNEE_PARTNER` |
| `Default Team` | Allgemeine Anfragen | `ZOHO_ASSIGNEE_DEFAULT` |

---

## **🔑 PHASE 4: ZOHO API SETUP**

### **4.1 Zoho Developer Console**
1. Gehen Sie zu [api-console.zoho.com](https://api-console.zoho.com)
2. Melden Sie sich mit Ihrem Zoho-Account an
3. Klicken Sie auf "Add Client"

### **4.2 Client erstellen**
```
Client Type: Server-based Application
Client Name: BALKONFUCHS Integration
Homepage URL: https://balkonfuchs.de
Authorized Redirect URIs: https://balkonfuchs.de/callback
```

### **4.3 Scopes hinzufügen**
```
ZohoDesk.tickets.ALL
ZohoDesk.contacts.ALL
ZohoDesk.departments.READ
ZohoDesk.agents.READ
ZohoCRM.modules.ALL
ZohoCRM.users.ALL
```

### **4.4 Client-Daten notieren**
- **Client ID**: `ZOHO_CLIENT_ID`
- **Client Secret**: `ZOHO_CLIENT_SECRET`

---

## **🔐 PHASE 5: ACCESS TOKEN GENERIEREN**

### **5.1 Authorization Code erhalten**
```
https://accounts.zoho.eu/oauth/v2/auth?
scope=ZohoDesk.tickets.ALL,ZohoDesk.contacts.ALL,ZohoCRM.modules.ALL&
client_id=YOUR_CLIENT_ID&
response_type=code&
redirect_uri=https://balkonfuchs.de/callback
```

### **5.2 Access Token generieren**
```bash
curl -X POST \
  https://accounts.zoho.eu/oauth/v2/token \
  -d "grant_type=authorization_code&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=https://balkonfuchs.de/callback&code=AUTHORIZATION_CODE"
```

### **5.3 Tokens notieren**
- **Access Token**: `ZOHO_ACCESS_TOKEN`
- **Refresh Token**: `ZOHO_REFRESH_TOKEN`

---

## **⚙️ PHASE 6: ORGANIZATION ID FINDEN**

### **6.1 Organization ID ermitteln**
```bash
curl -X GET \
  https://desk.zoho.eu/api/v1/organizations \
  -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN"
```

### **6.2 ID notieren**
- **Organization ID**: `ZOHO_ORGANIZATION_ID`

---

## **🌐 PHASE 7: NETLIFY ENVIRONMENT VARIABLES**

### **7.1 Netlify Dashboard öffnen**
1. Gehen Sie zu [app.netlify.com](https://app.netlify.com)
2. Wählen Sie Ihr BALKONFUCHS-Projekt
3. Gehen Sie zu `Site settings` → `Environment variables`

### **7.2 Alle Variablen hinzufügen:**

```bash
# Zoho API Zugangsdaten
ZOHO_ACCESS_TOKEN=your_access_token_here
ZOHO_REFRESH_TOKEN=your_refresh_token_here
ZOHO_CLIENT_ID=your_client_id_here
ZOHO_CLIENT_SECRET=your_client_secret_here
ZOHO_ORGANIZATION_ID=your_organization_id_here

# Zoho Desk URLs
ZOHO_BASE_URL=https://desk.zoho.eu
ZOHO_CRM_BASE_URL=https://www.zohoapis.eu/crm/v2

# Zoho Desk Departments (IDs aus Phase 2)
ZOHO_DEPT_DEFAULT=default_department_id
ZOHO_DEPT_GEWERBE=gewerbe_department_id
ZOHO_DEPT_KALKULATOR=kalkulator_department_id
ZOHO_DEPT_PLANER=planer_department_id
ZOHO_DEPT_EXPRESS=express_department_id
ZOHO_DEPT_GENEHMIGUNG=genehmigung_department_id
ZOHO_DEPT_BAUZEIT=bauzeit_department_id
ZOHO_DEPT_PARTNER=partner_department_id

# Zoho Desk Assignees (IDs aus Phase 3)
ZOHO_ASSIGNEE_DEFAULT=default_assignee_id
ZOHO_ASSIGNEE_SENIOR=senior_assignee_id
ZOHO_ASSIGNEE_GEWERBE=gewerbe_assignee_id
ZOHO_ASSIGNEE_KALKULATOR=kalkulator_assignee_id
ZOHO_ASSIGNEE_PLANER=planer_assignee_id
ZOHO_ASSIGNEE_EXPRESS=express_assignee_id
ZOHO_ASSIGNEE_GENEHMIGUNG=genehmigung_assignee_id
ZOHO_ASSIGNEE_BAUZEIT=bauzeit_assignee_id
ZOHO_ASSIGNEE_PARTNER=partner_assignee_id
```

---

## **🧪 PHASE 8: INTEGRATION TESTEN**

### **8.1 Test-Seite öffnen**
1. Gehen Sie zu `/test-zoho-integration`
2. Klicken Sie auf "Zoho Verbindung testen"
3. Prüfen Sie die Ergebnisse

### **8.2 Gewerbe-Daten testen**
1. Klicken Sie auf "Gewerbe-Daten senden"
2. Prüfen Sie, ob ein Ticket in Zoho Desk erstellt wurde
3. Prüfen Sie alle Custom Fields

---

## **✅ PHASE 9: PRODUKTIVE AKTIVIERUNG**

### **9.1 Alle Funnel aktivieren**
Nach erfolgreichem Test können Sie die Integration in allen Funnels aktivieren:
- ✅ Gewerbe-Funnel (bereits implementiert)
- 🔄 Kalkulator-Funnel
- 🔄 Planer-Funnel
- 🔄 Express-Angebot-Funnel
- 🔄 Genehmigungscheck-Funnel
- 🔄 Bauzeit-Planung-Funnel
- 🔄 Partner-werden-Funnel

### **9.2 Monitoring einrichten**
- Überwachen Sie eingehende Tickets
- Prüfen Sie Lead-Scoring-Genauigkeit
- Optimieren Sie Assignee-Zuordnungen

---

## **🚨 WICHTIGE HINWEISE**

### **⚠️ Custom Fields**
- **Feldnamen exakt** wie in der Tabelle verwenden
- **Keine Leerzeichen** in Feldnamen
- **Dropdown-Optionen** entsprechend der Funnel-Daten

### **⚠️ API-Limits**
- **Rate Limits** beachten (1000 Requests/Stunde)
- **Refresh Tokens** regelmäßig erneuern
- **Error Handling** implementieren

### **⚠️ Datenschutz**
- **DSGVO-konforme** Datenverarbeitung
- **Minimale Datensammlung**
- **Löschkonzept** implementieren

---

## **📞 SUPPORT**

Bei Problemen:
1. **Test-Seite** verwenden: `/test-zoho-integration`
2. **Browser-Konsole** prüfen (F12)
3. **Netlify-Logs** überprüfen
4. **Zoho-API-Dokumentation** konsultieren

---

**🎯 Nach Abschluss aller Phasen haben Sie eine vollständige Zoho Desk Integration, die alle Funnel-Daten automatisch als strukturierte Tickets überträgt!**

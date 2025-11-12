# Zoho Field Mapping Overview

This document summarises the payload keys that `netlify/functions/submit-to-zoho.js` sends to Zoho CRM and the corresponding Zoho API field names. Use it to compare the Netlify payload with the field API names configured in Zoho.

## Standard Lead Fields

| Netlify Payload Key | Zoho API Field | Source in Funnel |
| --- | --- | --- |
| `Salutation` | `Salutation` | `contact.salutation` (falls back to `contactPerson.salutation`)
| `First_Name` | `First_Name` | `contact.firstName` (falls back to `contactPerson.firstName`)
| `Last_Name` | `Last_Name` | `contact.lastName` (falls back to `contactPerson.lastName` or defaults to `"Unbekannt"`)
| `Email` | `Email` | `contact.email`
| `Phone` | `Phone` | `contact.phone` (falls back to `contactPerson.mobile`)
| `Zip_Code` | `Zip_Code` | Aggregated from contact/company zip or derived via helper `deriveCityFromZip`
| `City` | `City` | Aggregated from contact/company city or derived via helper `deriveCityFromZip`
| `Street` | `Street` | Company or contact address text
| `Company` | `Company` | `company.name` (or fallback strings)
| `Lead_Source` | `Lead_Source` | Human-readable funnel label via `mapFunnelLabel`
| `Description` | `Description` | Multi-line project/contact summary assembled in Netlify function

## Scoring & Status Fields

| Netlify Payload Key | Zoho API Field | Source in Funnel |
| --- | --- | --- |
| `Score_lead` | `Score_lead` | Calculated partner / fallback lead score
| `Rating` | `Rating` | Lead category from `calculateLeadCategory` (e.g. `Partneranfrage`)
| `Lead_Status` | `Lead_Status` | Priority rank (e.g. `P1 - Hot Lead (sofort kontaktieren)`)

## Partner Funnel Specific Fields

| Netlify Payload Key | Zoho API Field | Source in Funnel |
| --- | --- | --- |
| `Funnel_Typ` | `Funnel_Typ` | Funnel label (e.g. `Partner Funnel`)
| `Balkonbrief_angefordert` | `Balkonbrief_angefordert` | Newsletter opt-in (`contact.newsletter` / `formData.balkonbrief`)
| `Projektbeschreibung` | `Projektbeschreibung` | Combined free-text, document notes, demolition info (if available)
| `Anzahl_Balkone` | `Anzahl_Balkone` | Partner or Gewerbe counts where present
| `PartnerType` *(inferred via `PARTNER_TYPE_LABELS`)* | `Partner-Paket` (custom) | `partnerDetails.partnerType`
| `Mitarbeiterzahl` | `Mitarbeiterzahl` | `company.employeeCount`
| `Rechtsform` | `Rechtsform` | `company.legalForm` (supports custom free text)
| `Spezialisierungen` | `Spezialisierungen` | Joined list of `partnerDetails.specialties`
| `Arbeitsgebiet` | `Arbeitsgebiet` | `partnerDetails.workingArea`
| `Versicherungsstatus` | `Versicherungsstatus` | `partnerDetails.insuranceStatus`
| `Unterlagen` | `Unterlagen` | Derived document list (insurance/reference/portfolio/additional)
| `Referenzen` *(list)* | `Referenzprojekte` (custom) | `partnerDetails.references[]`
| `Leuchtturmprojekt` *(list)* | `Leuchtturmprojekt_*` custom fields | `partnerDetails.lighthouseProject` entries (description, location, year, value, special)

## Contact Preferences

| Netlify Payload Key | Zoho API Field | Source in Funnel |
| --- | --- | --- |
| `preferredContact` | Custom (`Bevorzugter Kontaktweg`) | `contact.preferredContact` (defaults to `phone`)
| `Datenschutz_akzeptiert` | `Datenschutz_akzeptiert` | Boolean derived from multiple privacy flags
| `Haftungsausschluss` | `Haftungsausschluss` | Boolean derived from disclaimer checkboxes

## Calculated Metrics and Helper Fields

| Netlify Payload Key | Zoho API Field | Description |
| --- | --- | --- |
| `Budget` | `Budget` | Numeric budget estimate (from calculator or mapped ranges)
| `Projektname`, `Projektort`, `Projektadresse` | Project custom fields | Only populated for Gewerbe funnels but listed here for completeness
| `Dringlichkeit` | `Dringlichkeit` | Timeframe mapping (e.g. `Sofort`, `Innerhalb 3 Monate`)
| `Angebote_von` | `Angebote_von` | Offer region preference
| `Anzahl_Anbieter` | `Anzahl_Anbieter` | Desired number of offers (integer)

## Attachment Upload

- The PNG summary is attached via the Zoho Attachments API: `POST /crm/v6/Leads/{id}/Attachments`
- File metadata taken from `submissionData.pdfAttachment`: `fileName`, `contentType`, `base64` (whitespace stripped, URI prefix removed).

> **Hint:** The debug log `🔍 Field Mapping Debug` in `submit-to-zoho.js` prints the raw and mapped values for core fields. Use those console entries alongside this table when checking the Netlify deploy logs.

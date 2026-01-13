# Favicon Setup Anleitung

## Übersicht
Dieses Dokument beschreibt, wie die Favicon-Dateien aus dem BalkonFuchs-Logo erstellt werden.

## Logo-Quelle
Das Logo befindet sich unter:
- `public/images/Balkonfuchs-Logo_4c.png` (Hauptlogo mit 4 Farben)
- `public/images/Balkonfuchs-Logo_white.png` (Weißes Logo)

## Benötigte Favicon-Dateien

Die folgenden Dateien müssen im `public/` Verzeichnis erstellt werden:

### 1. Standard Favicons
- `favicon.ico` - Multi-Resolution ICO-Datei (16x16, 32x32, 48x48)
- `favicon-16x16.png` - 16x16 Pixel PNG
- `favicon-32x32.png` - 32x32 Pixel PNG

### 2. Apple Touch Icon
- `apple-touch-icon.png` - 180x180 Pixel PNG (für iOS/iPadOS)

### 3. Android Chrome Icons
- `android-chrome-192x192.png` - 192x192 Pixel PNG
- `android-chrome-512x512.png` - 512x512 Pixel PNG

## Erstellung der Favicons

### Option 1: Online-Tool (Empfohlen)
1. Besuchen Sie https://realfavicongenerator.net/
2. Laden Sie `Balkonfuchs-Logo_4c.png` hoch
3. Konfigurieren Sie die Einstellungen:
   - iOS: Apple Touch Icon aktivieren
   - Android Chrome: Manifest aktivieren
   - Windows Metro: Optional
   - Safari Pinned Tab: Optional
4. Generieren Sie die Favicons
5. Laden Sie das Paket herunter
6. Kopieren Sie alle generierten Dateien in das `public/` Verzeichnis

### Option 2: Manuell mit Bildbearbeitungssoftware
1. Öffnen Sie `Balkonfuchs-Logo_4c.png` in einer Bildbearbeitungssoftware (z.B. Photoshop, GIMP, Figma)
2. Erstellen Sie die folgenden Größen:
   - 16x16px → speichern als `favicon-16x16.png`
   - 32x32px → speichern als `favicon-32x32.png`
   - 180x180px → speichern als `apple-touch-icon.png`
   - 192x192px → speichern als `android-chrome-192x192.png`
   - 512x512px → speichern als `android-chrome-512x512.png`
3. Erstellen Sie `favicon.ico`:
   - Verwenden Sie ein Online-Tool wie https://convertio.co/png-ico/ oder
   - Verwenden Sie ImageMagick: `convert favicon-32x32.png favicon.ico`

### Option 3: Mit ImageMagick (Command Line)
```bash
# Installiere ImageMagick (falls nicht vorhanden)
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Wechsle ins public-Verzeichnis
cd public

# Erstelle alle benötigten Größen
convert ../images/Balkonfuchs-Logo_4c.png -resize 16x16 favicon-16x16.png
convert ../images/Balkonfuchs-Logo_4c.png -resize 32x32 favicon-32x32.png
convert ../images/Balkonfuchs-Logo_4c.png -resize 180x180 apple-touch-icon.png
convert ../images/Balkonfuchs-Logo_4c.png -resize 192x192 android-chrome-192x192.png
convert ../images/Balkonfuchs-Logo_4c.png -resize 512x512 android-chrome-512x512.png

# Erstelle favicon.ico (Multi-Resolution)
convert favicon-16x16.png favicon-32x32.png favicon.ico
```

## Dateistruktur nach Erstellung

Nach der Erstellung sollte das `public/` Verzeichnis folgende Struktur haben:

```
public/
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── images/
    ├── Balkonfuchs-Logo_4c.png
    └── Balkonfuchs-Logo_white.png
```

## Verifizierung

Nach dem Erstellen der Dateien:

1. **Lokale Prüfung:**
   - Starten Sie den Development-Server: `npm run dev`
   - Öffnen Sie http://localhost:3000
   - Prüfen Sie im Browser-Tab, ob das Favicon angezeigt wird

2. **Browser-Console prüfen:**
   - Öffnen Sie die Developer Tools (F12)
   - Prüfen Sie die Network-Tab auf 404-Fehler für Favicon-Dateien

3. **Online-Tool:**
   - Besuchen Sie https://realfavicongenerator.net/favicon_checker
   - Geben Sie https://balkonfuchs.de ein
   - Prüfen Sie, ob alle Favicons korrekt geladen werden

## Hinweise

- **Transparenz:** Wenn das Logo transparente Bereiche hat, sollten diese in den Favicons beibehalten werden
- **Hintergrund:** Für `apple-touch-icon.png` wird iOS automatisch einen weißen Hintergrund hinzufügen, wenn das Bild transparent ist
- **Qualität:** Verwenden Sie das Logo in der höchsten verfügbaren Auflösung als Ausgangspunkt
- **Farben:** Die Farben sollten in allen Größen klar erkennbar bleiben

## Implementierung

Die Favicon-Links sind bereits in `pages/_document.js` implementiert. Sobald die Dateien im `public/` Verzeichnis vorhanden sind, werden sie automatisch von allen Seiten verwendet.

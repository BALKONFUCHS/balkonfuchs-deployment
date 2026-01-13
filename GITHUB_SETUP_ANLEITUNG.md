# Schritt-für-Schritt: Zwei GitHub-Accounts parallel nutzen

## Übersicht
Diese Anleitung zeigt, wie Sie mit zwei GitHub-Accounts (z.B. Smarter2Job und KongFox/BALKONFUCHS) parallel arbeiten können.

---

## SCHRITT 1: SSH-Keys für beide Accounts erstellen

### 1.1 SSH-Key für Account 1 (z.B. Smarter2Job) erstellen
```bash
ssh-keygen -t ed25519 -C "smarter2job@example.com" -f ~/.ssh/id_ed25519_smarter2job
```
- Wenn nach Passphrase gefragt wird: Enter drücken (oder Passphrase setzen)
- **WICHTIG:** Dateiname ist `id_ed25519_smarter2job`

### 1.2 SSH-Key für Account 2 (z.B. BALKONFUCHS) erstellen
```bash
ssh-keygen -t ed25519 -C "balkonfuchs@example.com" -f ~/.ssh/id_ed25519_balkonfuchs
```
- Wenn nach Passphrase gefragt wird: Enter drücken (oder Passphrase setzen)
- **WICHTIG:** Dateiname ist `id_ed25519_balkonfuchs`

---

## SCHRITT 2: SSH-Keys zu GitHub-Accounts hinzufügen

### 2.1 Public Key für Account 1 kopieren
```bash
cat ~/.ssh/id_ed25519_smarter2job.pub
```
- Den gesamten Output kopieren (beginnt mit `ssh-ed25519`)

### 2.2 Zu GitHub Account 1 hinzufügen
1. Gehen Sie zu: https://github.com/settings/keys
2. Klicken Sie auf "New SSH key"
3. Titel: z.B. "MacBook - Smarter2Job"
4. Key: Den kopierten Public Key einfügen
5. "Add SSH key" klicken

### 2.3 Public Key für Account 2 kopieren
```bash
cat ~/.ssh/id_ed25519_balkonfuchs.pub
```
- Den gesamten Output kopieren

### 2.4 Zu GitHub Account 2 hinzufügen
1. Gehen Sie zu: https://github.com/settings/keys (mit dem anderen Account eingeloggt)
2. Klicken Sie auf "New SSH key"
3. Titel: z.B. "MacBook - BALKONFUCHS"
4. Key: Den kopierten Public Key einfügen
5. "Add SSH key" klicken

---

## SCHRITT 3: SSH-Config-Datei erstellen

### 3.1 SSH-Config-Datei erstellen/bearbeiten
```bash
nano ~/.ssh/config
```
(oder verwenden Sie einen anderen Editor wie `code ~/.ssh/config`)

### 3.2 Folgenden Inhalt einfügen:
```
# Account 1 - Smarter2Job
Host github.com-smarter2job
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_smarter2job
    IdentitiesOnly yes

# Account 2 - BALKONFUCHS
Host github.com-balkonfuchs
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_balkonfuchs
    IdentitiesOnly yes
```

### 3.3 Datei speichern und schließen
- In nano: `Ctrl+X`, dann `Y`, dann `Enter`

---

## SCHRITT 4: SSH-Verbindung testen

### 4.1 Test für Account 1
```bash
ssh -T git@github.com-smarter2job
```
- Erwartete Antwort: "Hi [username]! You've successfully authenticated..."

### 4.2 Test für Account 2
```bash
ssh -T git@github.com-balkonfuchs
```
- Erwartete Antwort: "Hi [username]! You've successfully authenticated..."

---

## SCHRITT 5: Git-Remote-URL für BALKONFUCHS-Repo anpassen

### 5.1 Ins BALKONFUCHS-Repo wechseln
```bash
cd /Users/martinbeyer/Documents/balkonfuchs-deployment
```

### 5.2 Remote-URL auf SSH mit speziellem Host ändern
```bash
git remote set-url origin git@github.com-balkonfuchs:BALKONFUCHS/balkonfuchs-deployment.git
```

### 5.3 Prüfen, ob es funktioniert
```bash
git remote -v
```
- Sollte zeigen: `origin  git@github.com-balkonfuchs:BALKONFUCHS/balkonfuchs-deployment.git`

---

## SCHRITT 6: Git-Config für dieses Repo anpassen

### 6.1 User-Name und Email für dieses Repo setzen
```bash
cd /Users/martinbeyer/Documents/balkonfuchs-deployment
git config user.name "Ihr BALKONFUCHS Name"
git config user.email "ihre-balkonfuchs-email@example.com"
```

### 6.2 Prüfen
```bash
git config user.name
git config user.email
```

---

## SCHRITT 7: Push testen

### 7.1 Jetzt können Sie pushen
```bash
git push origin main
```
- Sollte ohne Passwort-Abfrage funktionieren!

---

## Für andere Repos (Smarter2Job)

Wenn Sie in einem anderen Repo mit dem Smarter2Job-Account arbeiten:

```bash
cd /pfad/zum/anderen/repo
git remote set-url origin git@github.com-smarter2job:USERNAME/REPO-NAME.git
git config user.name "Ihr Smarter2Job Name"
git config user.email "ihre-smarter2job-email@example.com"
```

---

## Troubleshooting

### Problem: "Permission denied (publickey)"
- Prüfen Sie, ob der SSH-Key richtig zu GitHub hinzugefügt wurde
- Testen Sie die SSH-Verbindung erneut: `ssh -T git@github.com-balkonfuchs`

### Problem: "Host key verification failed"
```bash
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
```

### Problem: SSH-Key wird nicht erkannt
```bash
ssh-add ~/.ssh/id_ed25519_balkonfuchs
ssh-add ~/.ssh/id_ed25519_smarter2job
```

---

## Zusammenfassung

✅ Zwei SSH-Keys erstellt (einer pro Account)
✅ Beide Keys zu GitHub hinzugefügt
✅ SSH-Config erstellt (unterschiedliche Hosts)
✅ Remote-URL für BALKONFUCHS-Repo angepasst
✅ Git-Config für dieses Repo gesetzt

Jetzt können Sie mit beiden Accounts parallel arbeiten! 🎉

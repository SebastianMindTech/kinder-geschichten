# kinder-geschichten

**Kinderfreundliche Web-App (PWA) für Dreijährige: fünf Hörgeschichten als große Kacheln, antippen, zuhören, zurück. Mehr nicht.**

**Owner:** Sebastian Rosensteiner · **Stand:** 03.10.2026 · **Status:** in Aufbau

> Die App zeigt nur die Geschichten, die in `src/stories.ts` stehen. Das Kind kann nichts hinzufügen, nichts suchen und YouTube nicht öffnen.
> Es gibt keine Anmeldung, keine Einstellungen, keine Tracker.

---

## Schnellstart

```bash
npm install        # einmalig
npm run dev        # http://localhost:5173
npm run build      # Produktions-Build nach dist/ (inkl. Service Worker)
npm run preview    # den Build lokal ansehen
```

## Wo was liegt

| Datei / Ordner | Zweck | Von Hand ändern? |
|---|---|---|
| `src/stories.ts` | Die Liste der Geschichten (Titel, YouTube-ID, Farbe, Emoji). Reserve-Titel sind auskommentiert. | **Ja – hier kommen neue Geschichten hin** |
| `src/App.tsx` | Mini-Router: `#/` Übersicht, `#/story/<id>` Player | selten |
| `src/components/Overview.tsx`, `StoryTile.tsx` | Kachel-Übersicht | bei Design-Änderungen |
| `src/components/Player.tsx` | YouTube-Player mit Schutz-Overlay, großem Play/Pause- und Zurück-Knopf | vorsichtig (siehe CLAUDE.md §2) |
| `src/components/FullscreenButton.tsx` | Vollbild-Knopf, nur sichtbar wo der Browser es erlaubt (nicht auf dem iPad) | nein |
| `src/lib/youtube.ts` | Lädt die YouTube IFrame API einmalig | nein |
| `src/styles.css` | Alle Styles, Farben als CSS-Variablen in `:root` | bei Design-Änderungen |
| `public/icons/` | App-Icons (aus `icon.svg` erzeugt) | bei neuem Icon |
| `vite.config.ts` | Build + PWA-Manifest + Service Worker (vite-plugin-pwa) | selten |
| `vercel.json` | SPA-Rewrite und Cache-Header für den Service Worker | nein |
| `CLAUDE.md` | Arbeitsanweisung für Claude-Sessions | bei neuen Entscheidungen |

## Geschichte hinzufügen oder tauschen

1. YouTube-Video öffnen, die 11 Zeichen nach `v=` aus der URL kopieren.
2. In `src/stories.ts` eine Zeile ergänzen oder eine Reserve-Zeile einkommentieren.
3. `npm run build` muss durchlaufen, dann auf `main` pushen – Vercel deployt automatisch.

Aktuell enthalten (die fünf meistgesehenen sigikid-Hörgeschichten, Stand 03.10.2026):

| Titel | YouTube-ID |
|---|---|
| Die kleine Schnecke | `h8nmhZP_vc8` |
| Der kleine Frosch, der sich nicht ins Wasser traute | `7-raWhEDUCI` |
| Der kleine Koala kommt in den Kindergarten | `C0ANjJtjH-s` |
| Die kleine Maus baut eine Rakete | `jqXoHdPWNHg` |
| Der kleine Dinosaurier Mats | `zIli688jCM8` |

## Deployment (Vercel)

Einmalig: auf [vercel.com](https://vercel.com) mit GitHub anmelden → „Add New… → Project“ → dieses Repo importieren → Preset „Vite“ wird erkannt → „Deploy“. Keine Umgebungsvariablen nötig. Danach deployt jeder Push auf `main` automatisch.

## Installation auf dem iPad

1. Live-URL in **Safari** öffnen (nicht Chrome – nur Safari darf auf iOS Apps auf den Home-Bildschirm legen).
2. Teilen-Symbol → **„Zum Home-Bildschirm“** → „Hinzufügen“.
3. App vom Home-Bildschirm starten: läuft im Vollbild ohne Safari-Leiste.

Tipp: Mit **Geführtem Zugriff** (Einstellungen → Bedienungshilfen → Geführter Zugriff, dann dreimal Seitentaste drücken) bleibt das Kind in der App.

## Was die App bewusst nicht tut

- Keine Verbindung außer zu YouTube (`youtube-nocookie.com`, Vorschaubilder von `i.ytimg.com`).
- Kein Scrubbing, keine Lautstärke, keine Playlist, kein Autoplay der nächsten Geschichte. Nach dem Ende geht es zurück zur Übersicht.
- Videos werden nicht heruntergeladen; offline funktioniert nur die Übersicht.

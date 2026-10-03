# Arbeitsanweisung für Claude-Sessions – kinder-geschichten

Kinderfreundliche PWA (Zielgruppe: 3 Jahre), die eine feste Liste von Hörgeschichten als große Kacheln zeigt und per YouTube-Einbettung abspielt. Gehostet auf Vercel, Quellcode auf GitHub (SebastianMindTech/kinder-geschichten, öffentlich).

## §1 Die App bleibt klein
Zwei Ansichten: Übersicht (`#/`) und Player (`#/story/<id>`). Keine Suche, kein Login, kein Hinzufügen durch das Kind, keine Einstellungen.
**Begründung:** Entscheidung Sebastian, 03.10.2026 – „Mehr soll es nicht sein.“ Jede weitere Funktion braucht eine ausdrückliche Entscheidung.

## §2 Das Kind darf die App nicht verlassen können
Über dem YouTube-iframe liegt immer das Overlay `.player__shield`. Es darf nicht entfernt oder durchlässig gemacht werden (kein `pointer-events: none`). YouTube-eigene Bedienelemente bleiben aus (`controls: 0`, `rel: 0`, `fs: 0`). Links nach außen gibt es in der App nicht.
**Begründung:** Ein Tipp auf das YouTube-Logo würde die YouTube-App oder -Website öffnen – mit beliebigen Inhalten.

## §3 Geschichten nur in `src/stories.ts`
Neue oder andere Geschichten ausschließlich dort eintragen (ID, Titel, YouTube-ID, Farbe, Emoji). Vorher prüfen, dass das Video einbettbar ist (`playableInEmbed`), sonst zeigt der Player den Fehlerbildschirm.
**Begründung:** Eine Datenquelle, damit Sebastian Inhalte ohne Code-Kenntnis anpassen kann.

## §4 Keine Secrets, keine Tracker
Die App hat keine Backend-Anbindung und braucht keine Umgebungsvariablen. Externe Requests gehen nur an `youtube-nocookie.com`, `youtube.com/iframe_api` und `i.ytimg.com` (Vorschaubilder). Keine Analytics, keine Fonts von Drittservern, keine weiteren Domains ohne Entscheidung.
**Begründung:** Kinder-App, öffentliches Repo. Was nicht drin ist, kann nicht leaken.

## §5 Kein stiller Fehler
Wenn die YouTube-API nicht lädt oder ein Video nicht abspielbar ist, zeigt der Player das Standbild mit Hinweis und dem Zurück-Knopf – nie ein leeres Schwarz und nie das YouTube-Fehlerbild mit Link.

## §6 Vor jedem Push
`npm run lint && npm run build` müssen durchlaufen. Vercel deployt `main` automatisch; ein kaputter Build landet sonst live auf dem iPad.

## §7 Commits
Deutsch, kein Präfix, Betreff im Muster „Thema: was passiert ist“, Body erklärt das Warum. Abschluss mit `Co-Authored-By`-Zeile für Claude. Arbeits-Branches `claude/<thema>`, Merge nach `main` per PR oder direkt, wenn Sebastian es sagt.

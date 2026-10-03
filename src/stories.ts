/**
 * Die Geschichten, die in der App angezeigt werden.
 *
 * Reihenfolge = Reihenfolge in der Übersicht.
 * Neue Geschichte: eine Zeile ergänzen (YouTube-Video-ID aus der URL nach "v=").
 * Das Vorschaubild kommt automatisch von YouTube.
 */
export interface Story {
  /** Kurzer, eindeutiger Schlüssel – wird in der URL verwendet (#/story/<id>) */
  id: string
  /** Titel in großer Schrift unter der Kachel – kurz halten */
  title: string
  /** YouTube-Video-ID (11 Zeichen) */
  youtubeId: string
  /** Hintergrundfarbe der Kachel */
  color: string
  /** Emoji als zusätzliches Erkennungszeichen für Kinder, die noch nicht lesen */
  emoji: string
}

export const stories: Story[] = [
  { id: 'schnecke', title: 'Die kleine Schnecke', youtubeId: 'h8nmhZP_vc8', color: '#FFD166', emoji: '🐌' },
  { id: 'frosch', title: 'Der kleine Frosch', youtubeId: '7-raWhEDUCI', color: '#8BD3A5', emoji: '🐸' },
  { id: 'koala', title: 'Der kleine Koala', youtubeId: 'C0ANjJtjH-s', color: '#B8C5F2', emoji: '🐨' },
  { id: 'maus', title: 'Die Maus und die Rakete', youtubeId: 'jqXoHdPWNHg', color: '#F4A8C0', emoji: '🚀' },
  { id: 'dino', title: 'Der kleine Dino Mats', youtubeId: 'zIli688jCM8', color: '#9BDCE8', emoji: '🦕' },
  // Reserve – zum Aktivieren Kommentarzeichen entfernen:
  // { id: 'fuchs', title: 'Das kleine Fuchsmädchen', youtubeId: 'BMCFVTEegiI', color: '#FFB380', emoji: '🦊' },
  // { id: 'kater', title: 'Die kluge Maus und der Kater', youtubeId: 'WVxSEUEfo6w', color: '#D9C2F0', emoji: '🐭' },
]

export function thumbnailUrl(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
}

export function findStory(id: string | undefined): Story | undefined {
  return stories.find((s) => s.id === id)
}

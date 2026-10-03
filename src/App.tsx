import { useEffect, useState } from 'react'
import { Overview } from './components/Overview'
import { Player } from './components/Player'
import { findStory } from './stories'

/**
 * Minimaler Hash-Router mit genau zwei Routen:
 *   #/              → Übersicht
 *   #/story/<id>    → Player
 * Der Hash sorgt dafür, dass der Geräte-/Browser-Zurück ebenfalls funktioniert.
 */
function parseRoute(hash: string): { storyId?: string } {
  const match = hash.match(/^#\/story\/([\w-]+)/)
  return match ? { storyId: match[1] } : {}
}

function goToOverview() {
  window.location.hash = '#/'
}

function goToStory(id: string) {
  window.location.hash = `#/story/${id}`
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const story = findStory(route.storyId)

  if (route.storyId && !story) {
    // Unbekannte ID (z. B. alte Verknüpfung): still zur Übersicht
    goToOverview()
    return null
  }

  return story ? <Player key={story.id} story={story} onBack={goToOverview} /> : <Overview onSelect={goToStory} />
}

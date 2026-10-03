import { useEffect, useState } from 'react'

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

/**
 * Vollbild-Knopf: nur sichtbar, wenn der Browser die Fullscreen-API anbietet
 * und die App nicht ohnehin schon vom Home-Bildschirm (standalone) läuft.
 * Auf dem iPad in Safari gibt es die API nicht – dort übernimmt die Installation.
 */
export function FullscreenButton() {
  const [active, setActive] = useState(() => Boolean(document.fullscreenElement))
  const available = typeof document.fullscreenEnabled === 'boolean' && document.fullscreenEnabled && !isStandalone()

  useEffect(() => {
    const onChange = () => setActive(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  if (!available) return null

  const toggle = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void document.documentElement.requestFullscreen({ navigationUI: 'hide' })
    }
  }

  return (
    <button type="button" className="icon-button" onClick={toggle} aria-label={active ? 'Vollbild beenden' : 'Vollbild'}>
      {active ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
        </svg>
      )}
    </button>
  )
}

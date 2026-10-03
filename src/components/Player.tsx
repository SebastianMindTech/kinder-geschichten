import { useEffect, useRef, useState } from 'react'
import { loadYouTubeApi, type YTPlayer } from '../lib/youtube'
import { thumbnailUrl, type Story } from '../stories'

interface Props {
  story: Story
  onBack: () => void
}

type Status = 'loading' | 'ready' | 'playing' | 'paused' | 'ended' | 'error'

/**
 * Detailansicht: YouTube-Player ohne eigene Bedienelemente, darüber ein
 * transparentes Overlay, das alle Berührungen abfängt. Gesteuert wird nur
 * über den großen Play/Pause-Knopf und den Zurück-Knopf.
 */
export function Player({ story, onBack }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false
    let player: YTPlayer | null = null
    const mount = mountRef.current

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !mount) return
        // Die API ersetzt das übergebene Element durch das iframe – daher ein eigenes Kind-Element.
        const host = document.createElement('div')
        mount.appendChild(host)
        player = new YT.Player(host, {
          host: 'https://www.youtube-nocookie.com',
          videoId: story.youtubeId,
          width: '100%',
          height: '100%',
          playerVars: {
            controls: 0,
            rel: 0,
            fs: 0,
            playsinline: 1,
            disablekb: 1,
            iv_load_policy: 3,
            modestbranding: 1,
            cc_load_policy: 0,
            hl: 'de',
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (!cancelled) setStatus('ready')
            },
            onStateChange: (e) => {
              if (cancelled) return
              if (e.data === YT.PlayerState.PLAYING) setStatus('playing')
              else if (e.data === YT.PlayerState.PAUSED) setStatus('paused')
              else if (e.data === YT.PlayerState.ENDED) setStatus('ended')
            },
            onError: () => {
              if (!cancelled) setStatus('error')
            },
          },
        })
        playerRef.current = player
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      playerRef.current = null
      try {
        player?.destroy()
      } catch {
        // Player war evtl. noch nicht fertig initialisiert
      }
      if (mount) mount.innerHTML = ''
    }
  }, [story.youtubeId])

  // Nach dem Ende kurz das Bild stehen lassen, dann automatisch zurück.
  useEffect(() => {
    if (status !== 'ended') return
    const t = window.setTimeout(onBack, 1500)
    return () => window.clearTimeout(t)
  }, [status, onBack])

  const togglePlay = () => {
    const player = playerRef.current
    if (!player) return
    if (status === 'playing') player.pauseVideo()
    else player.playVideo()
  }

  const showBigButton = status === 'ready' || status === 'paused' || status === 'playing'
  const isPlaying = status === 'playing'

  return (
    <main className="player" style={{ '--tile-color': story.color } as React.CSSProperties}>
      <div className="player__video">
        <div ref={mountRef} className="player__mount" />
        {/* Schutzschicht: fängt jede Berührung ab, damit das Kind YouTube nicht öffnen kann */}
        <div className="player__shield" onClick={showBigButton ? togglePlay : undefined} aria-hidden="true" />
        {/* Deckt die YouTube-Untertitelzeile am unteren Rand des Videobilds ab (CLAUDE.md §2) */}
        <div className="player__caption-cover" aria-hidden="true" />
        {(status === 'loading' || status === 'ready') && (
          <img className="player__poster" src={thumbnailUrl(story.youtubeId)} alt="" draggable={false} />
        )}
        {status === 'error' && (
          <div className="player__fallback">
            <img src={thumbnailUrl(story.youtubeId)} alt="" draggable={false} />
            <p>Die Geschichte kann gerade nicht abgespielt werden.</p>
          </div>
        )}
        {status === 'loading' && <div className="player__spinner" aria-label="Lädt" />}
      </div>

      <button type="button" className="back-button" onClick={onBack} aria-label="Zurück zur Übersicht">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      {showBigButton && (
        <button
          type="button"
          className={`play-button ${isPlaying ? 'play-button--playing' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Abspielen'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </button>
      )}

      <h2 className="player__title">
        <span aria-hidden="true">{story.emoji}</span> {story.title}
      </h2>
    </main>
  )
}

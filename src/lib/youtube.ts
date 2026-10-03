/**
 * Lädt die YouTube IFrame Player API genau einmal und liefert das globale YT-Objekt.
 * Dokumentation: https://developers.google.com/youtube/iframe_api_reference
 */

export interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  destroy(): void
  getPlayerState(): number
  mute(): void
  unMute(): void
}

export interface YTPlayerEvent {
  target: YTPlayer
  data: number
}

export interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      host?: string
      videoId: string
      width?: string | number
      height?: string | number
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (e: YTPlayerEvent) => void
        onStateChange?: (e: YTPlayerEvent) => void
        onError?: (e: YTPlayerEvent) => void
      }
    },
  ) => YTPlayer
  PlayerState: {
    UNSTARTED: -1
    ENDED: 0
    PLAYING: 1
    PAUSED: 2
    BUFFERING: 3
    CUED: 5
  }
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | null = null

export function loadYouTubeApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT)
      return
    }
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT) resolve(window.YT)
      else reject(new Error('YouTube API nicht verfügbar'))
    }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => {
      apiPromise = null
      reject(new Error('YouTube API konnte nicht geladen werden'))
    }
    document.head.appendChild(script)
  })

  return apiPromise
}

import { thumbnailUrl, type Story } from '../stories'

interface Props {
  story: Story
  onSelect: () => void
}

export function StoryTile({ story, onSelect }: Props) {
  return (
    <button
      type="button"
      className="tile"
      style={{ '--tile-color': story.color } as React.CSSProperties}
      onClick={onSelect}
      aria-label={`${story.title} abspielen`}
    >
      <span className="tile__image-wrap">
        <img className="tile__image" src={thumbnailUrl(story.youtubeId)} alt="" draggable={false} loading="eager" />
        <span className="tile__emoji" aria-hidden="true">
          {story.emoji}
        </span>
      </span>
      <span className="tile__title">{story.title}</span>
    </button>
  )
}

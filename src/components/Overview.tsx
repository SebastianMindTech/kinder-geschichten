import { stories } from '../stories'
import { FullscreenButton } from './FullscreenButton'
import { StoryTile } from './StoryTile'

interface Props {
  onSelect: (id: string) => void
}

export function Overview({ onSelect }: Props) {
  return (
    <main className="overview">
      <header className="overview__header">
        <h1 className="overview__title">Geschichten</h1>
        <FullscreenButton />
      </header>
      <div className="overview__grid">
        {stories.map((story) => (
          <StoryTile key={story.id} story={story} onSelect={() => onSelect(story.id)} />
        ))}
      </div>
    </main>
  )
}
